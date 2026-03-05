import React from 'react';
import { Button, Col, Empty, Result, Row, Skeleton, Space } from 'antd';
import type { IProduct } from '../../store/products';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: IProduct[];
  isLoading: boolean;
  error: string | null;
  cartQuantityById: Record<number, number>;
  favoriteIds: number[];
  onAddToCart: (product: IProduct) => void;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onToggleFavorite: (productId: number) => void;
  onRetry: () => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  isLoading,
  error,
  cartQuantityById,
  favoriteIds,
  onAddToCart,
  onIncrement,
  onDecrement,
  onToggleFavorite,
  onRetry,
}) => {
  if (isLoading) {
    return (
      <Row gutter={[16, 16]}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Space orientation='vertical' style={{ width: '100%' }}>
              <Skeleton.Image style={{ width: '100%', height: 220 }} active />
              <Skeleton active paragraph={{ rows: 3 }} />
            </Space>
          </Col>
        ))}
      </Row>
    );
  }

  if (error) {
    return (
      <Result
        status='error'
        title='Не удалось загрузить товары'
        subTitle={error}
        extra={
          <Button type='primary' onClick={onRetry}>
            Повторить
          </Button>
        }
      />
    );
  }

  if (!products.length) {
    return <Empty description='Ничего не найдено по выбранным фильтрам' />;
  }

  return (
    <Row gutter={[16, 16]} justify='start'>
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={6}>
          <ProductCard
            product={product}
            cartQuantity={cartQuantityById[product.id] ?? 0}
            isFavorite={favoriteIds.includes(product.id)}
            onAddToCart={onAddToCart}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onToggleFavorite={onToggleFavorite}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProductsGrid;
