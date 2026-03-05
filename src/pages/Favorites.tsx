import React, { useMemo } from 'react';
import { message, Typography } from 'antd';
import PageContent from '../components/layout/PageContent';
import ProductsGrid from '../components/products/ProductsGrid';
import { useAppDispatch, useAppSelector } from '../hooks/reduxhook';
import {
  addToCart,
  decrementCartItem,
  getCartQuantityById,
  incrementCartItem,
} from '../store/cart';
import { getFavoriteIds, toggleFavorite } from '../store/favorites';
import { getProducts, type IProduct } from '../store/products';

const { Title } = Typography;

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const favoriteIds = useAppSelector(getFavoriteIds);
  const cartQuantityById = useAppSelector(getCartQuantityById);

  const favoriteProducts = useMemo(
    () => products.filter((product) => favoriteIds.includes(product.id)),
    [products, favoriteIds],
  );

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart(product));
    message.success('Товар добавлен в корзину');
  };

  return (
    <PageContent>
      <Title level={3}>Избранное</Title>
      <ProductsGrid
        products={favoriteProducts}
        isLoading={false}
        error={null}
        cartQuantityById={cartQuantityById}
        favoriteIds={favoriteIds}
        onAddToCart={handleAddToCart}
        onIncrement={(id) => dispatch(incrementCartItem(id))}
        onDecrement={(id) => dispatch(decrementCartItem(id))}
        onToggleFavorite={(id) => {
          dispatch(toggleFavorite(id));
          message.info('Товар убран из избранного');
        }}
        onRetry={() => {}}
      />
    </PageContent>
  );
};

export default Favorites;
