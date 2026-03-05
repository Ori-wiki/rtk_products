import React, { useEffect } from 'react';
import { message } from 'antd';
import PageContent from '../components/layout/PageContent';
import ProductsFilters from '../components/products/ProductsFilters';
import ProductsGrid from '../components/products/ProductsGrid';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { useAppDispatch, useAppSelector } from '../hooks/reduxhook';
import {
  addToCart,
  decrementCartItem,
  getCartQuantityById,
  incrementCartItem,
} from '../store/cart';
import { getFavoriteIds, toggleFavorite } from '../store/favorites';
import {
  getProductCategories,
  getProducts,
  getProductsError,
  getProductsLoadingStatus,
  type IProduct,
  loadProductsList,
} from '../store/products';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const categories = useAppSelector(getProductCategories);
  const isLoading = useAppSelector(getProductsLoadingStatus);
  const error = useAppSelector(getProductsError);
  const favoriteIds = useAppSelector(getFavoriteIds);
  const cartQuantityById = useAppSelector(getCartQuantityById);
  const {
    filters,
    visibleProducts,
    setSearch,
    setCategory,
    setSort,
    setMinRating,
    setPriceRange,
    reset,
  } = useCatalogFilters(products);

  useEffect(() => {
    dispatch(loadProductsList());
  }, [dispatch]);

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart(product));
    message.success('Товар добавлен в корзину');
  };

  const handleToggleFavorite = (productId: number) => {
    const isCurrentlyFavorite = favoriteIds.includes(productId);
    dispatch(toggleFavorite(productId));
    message.success(
      isCurrentlyFavorite ? 'Удалено из избранного' : 'Добавлено в избранное',
    );
  };

  return (
    <PageContent>
      <ProductsFilters
        search={filters.search}
        category={filters.category}
        sort={filters.sort}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        minRating={filters.minRating}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onPriceChange={([min, max]) => setPriceRange(min, max)}
        onMinRatingChange={setMinRating}
        onReset={reset}
      />

      <ProductsGrid
        products={visibleProducts}
        isLoading={isLoading}
        error={error}
        cartQuantityById={cartQuantityById}
        favoriteIds={favoriteIds}
        onAddToCart={handleAddToCart}
        onIncrement={(id) => dispatch(incrementCartItem(id))}
        onDecrement={(id) => dispatch(decrementCartItem(id))}
        onToggleFavorite={handleToggleFavorite}
        onRetry={() => dispatch(loadProductsList(true))}
      />
    </PageContent>
  );
};

export default Products;
