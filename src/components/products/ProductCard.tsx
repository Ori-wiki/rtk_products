import React from 'react';
import {
  Button,
  Card,
  Flex,
  Rate,
  Space,
  Tag,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import type { IProduct } from '../../store/products';

const { Meta } = Card;

interface ProductCardProps {
  product: IProduct;
  cartQuantity: number;
  isFavorite: boolean;
  onAddToCart: (product: IProduct) => void;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onToggleFavorite: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartQuantity,
  isFavorite,
  onAddToCart,
  onIncrement,
  onDecrement,
  onToggleFavorite,
}) => {
  const {
    token: { colorFillAlter },
  } = theme.useToken();

  return (
    <Card
      hoverable
      style={{
        width: 280,
        minWidth: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      styles={{
        body: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      cover={
        <div
          style={{
            height: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: colorFillAlter,
            padding: 8,
          }}
        >
          <img
            draggable={false}
            alt={product.title}
            src={product.thumbnail}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      }
      actions={[
        <Tooltip key='favorite' title='В избранное'>
          <Button
            type='text'
            onClick={() => onToggleFavorite(product.id)}
            icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
          />
        </Tooltip>,
        <Link key='details' to={`${ROUTES.products}/${product.id}`}>
          Подробнее
        </Link>,
      ]}
    >
      <Meta title={product.title} />
      <Flex vertical gap={8} style={{ flex: 1, marginTop: 12 }}>
        <Typography.Text type='secondary'>{product.category}</Typography.Text>
        <Typography.Text>
          {product.description.length > 90
            ? `${product.description.slice(0, 90)}...`
            : product.description}
        </Typography.Text>
        <Space>
          <Rate disabled allowHalf value={product.rating} style={{ fontSize: 14 }} />
          <Tag color='blue'>{product.rating.toFixed(1)}</Tag>
        </Space>
        <Typography.Text strong>{`$${product.price}`}</Typography.Text>

        {cartQuantity > 0 ? (
          <Space style={{ marginTop: 'auto' }}>
            <Button onClick={() => onDecrement(product.id)}>-</Button>
            <Tag color='processing'>{cartQuantity}</Tag>
            <Button onClick={() => onIncrement(product.id)}>+</Button>
          </Space>
        ) : (
          <Button type='primary' style={{ marginTop: 'auto' }} onClick={() => onAddToCart(product)}>
            В корзину
          </Button>
        )}
      </Flex>
    </Card>
  );
};

export default ProductCard;
