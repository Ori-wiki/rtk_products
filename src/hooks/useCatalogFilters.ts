import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  filterAndSortProducts,
  readCatalogFilters,
  setCatalogParam,
  type CatalogFilters,
  type ProductSort,
} from '../features/products/catalog';
import type { IProduct } from '../store/products';

export const useCatalogFilters = (products: IProduct[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => readCatalogFilters(searchParams), [searchParams]);
  const visibleProducts = useMemo(
    () => filterAndSortProducts([...products], filters),
    [products, filters],
  );

  const setSearch = (value: string) =>
    setSearchParams(setCatalogParam(searchParams, 'q', value), { replace: true });

  const setCategory = (value: string) =>
    setSearchParams(setCatalogParam(searchParams, 'category', value), {
      replace: true,
    });

  const setSort = (value: ProductSort) =>
    setSearchParams(setCatalogParam(searchParams, 'sort', value), { replace: true });

  const setMinRating = (value: number) =>
    setSearchParams(setCatalogParam(searchParams, 'minRating', String(value)), {
      replace: true,
    });

  const setPriceRange = (minPrice: number, maxPrice: number) => {
    const withMin = setCatalogParam(searchParams, 'minPrice', String(minPrice));
    const withMax = setCatalogParam(withMin, 'maxPrice', String(maxPrice));
    setSearchParams(withMax, { replace: true });
  };

  const reset = () => setSearchParams({}, { replace: true });

  return {
    filters,
    visibleProducts,
    setSearch,
    setCategory,
    setSort,
    setMinRating,
    setPriceRange,
    reset,
  };
};

export type { CatalogFilters };
