import React from 'react';
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Flex,
  Rate,
  Result,
  Row,
  Skeleton,
  Tag,
  Typography,
  message,
} from 'antd';
import { useParams } from 'react-router-dom';
import PageContent from '../components/layout/PageContent';
import { useProductDetails } from '../hooks/useProductDetails';
import { useAppDispatch, useAppSelector } from '../hooks/reduxhook';
import {
  addToCart,
  decrementCartItem,
  getCartItemQuantity,
  incrementCartItem,
} from '../store/cart';
import { getProductById } from '../store/products';

const { Title, Text, Paragraph } = Typography;

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useAppDispatch();
  const productFromStore = useAppSelector((state) => getProductById(state, productId));
  const quantity = useAppSelector((state) => getCartItemQuantity(state, productId));
  const { product, loading, error } = useProductDetails(productId, productFromStore);

  if (!Number.isFinite(productId)) {
    return <Result status='404' title='Некорректный ID товара' />;
  }

  if (loading) {
    return (
      <PageContent>
        <Skeleton active paragraph={{ rows: 8 }} />
      </PageContent>
    );
  }

  if (error || !product) {
    return (
      <Result
        status='error'
        title='Ошибка загрузки товара'
        subTitle={error ?? 'Товар не найден'}
      />
    );
  }

  return (
    <PageContent>
      <Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Carousel arrows draggable>
              {product.images.map((image) => (
                <div key={image}>
                  <img
                    src={image}
                    alt={product.title}
                    style={{ width: '100%', height: 360, objectFit: 'cover' }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>
          <Col xs={24} md={12}>
            <Flex vertical gap={12}>
              <Title level={3}>{product.title}</Title>
              <Text type='secondary'>{product.category}</Text>
              <Flex gap={8} align='center'>
                <Rate disabled allowHalf value={product.rating} />
                <Tag color='blue'>{product.rating.toFixed(1)}</Tag>
              </Flex>
              <Paragraph>{product.description}</Paragraph>
              <Title level={4}>{`$${product.price}`}</Title>
              <Flex gap={8}>
                {quantity > 0 ? (
                  <>
                    <Button onClick={() => dispatch(decrementCartItem(product.id))}>-</Button>
                    <Tag color='processing'>{quantity}</Tag>
                    <Button onClick={() => dispatch(incrementCartItem(product.id))}>+</Button>
                  </>
                ) : (
                  <Button
                    type='primary'
                    onClick={() => {
                      dispatch(addToCart(product));
                      message.success('Товар добавлен в корзину');
                    }}
                  >
                    Добавить в корзину
                  </Button>
                )}
              </Flex>
            </Flex>
          </Col>
        </Row>

        <Divider />
        <Title level={4}>Отзывы</Title>
        <Flex vertical gap={12}>
          {(product.reviews ?? []).length ? (
            (product.reviews ?? []).map((review, index) => (
              <Card key={`${review.reviewerName}-${index}`} size='small'>
                <Flex justify='space-between' align='center'>
                  <Text strong>{review.reviewerName}</Text>
                  <Rate disabled value={review.rating} />
                </Flex>
                <Paragraph style={{ marginBottom: 0, marginTop: 8 }}>
                  {review.comment}
                </Paragraph>
              </Card>
            ))
          ) : (
            <Text type='secondary'>Пока нет отзывов</Text>
          )}
        </Flex>
      </Card>
    </PageContent>
  );
};

export default ProductDetails;
