import type { IProduct } from '../../store/products';

export const DEFAULT_MIN_PRICE = 0;
export const DEFAULT_MAX_PRICE = 2000;
export const DEFAULT_MIN_RATING = 0;

export type ProductSort =
  | 'popularity_desc'
  | 'price_asc'
  | 'price_desc'
  | 'newest';

export interface CatalogFilters {
  search: string;
  category: string;
  sort: ProductSort;
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

export const DEFAULT_CATALOG_FILTERS: CatalogFilters = {
  search: '',
  category: 'all',
  sort: 'popularity_desc',
  minPrice: DEFAULT_MIN_PRICE,
  maxPrice: DEFAULT_MAX_PRICE,
  minRating: DEFAULT_MIN_RATING,
};

const parseNumber = (value: string | null, fallback: number) => {
  if (value === null) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseSort = (value: string | null): ProductSort => {
  if (
    value === 'price_asc' ||
    value === 'price_desc' ||
    value === 'newest' ||
    value === 'popularity_desc'
  ) {
    return value;
  }
  return DEFAULT_CATALOG_FILTERS.sort;
};

export const readCatalogFilters = (
  searchParams: URLSearchParams,
): CatalogFilters => ({
  search: searchParams.get('q') ?? DEFAULT_CATALOG_FILTERS.search,
  category: searchParams.get('category') ?? DEFAULT_CATALOG_FILTERS.category,
  sort: parseSort(searchParams.get('sort')),
  minPrice: parseNumber(searchParams.get('minPrice'), DEFAULT_MIN_PRICE),
  maxPrice: parseNumber(searchParams.get('maxPrice'), DEFAULT_MAX_PRICE),
  minRating: parseNumber(searchParams.get('minRating'), DEFAULT_MIN_RATING),
});

export const setCatalogParam = (
  params: URLSearchParams,
  key: string,
  value: string,
) => {
  const next = new URLSearchParams(params);
  if (!value || value === 'all') {
    next.delete(key);
  } else {
    next.set(key, value);
  }
  return next;
};

export const filterAndSortProducts = (
  products: IProduct[],
  filters: CatalogFilters,
) => {
  const query = filters.search.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const byQuery =
      !query ||
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    const byCategory =
      filters.category === 'all' || product.category === filters.category;
    const byPrice =
      product.price >= filters.minPrice && product.price <= filters.maxPrice;
    const byRating = product.rating >= filters.minRating;
    return byQuery && byCategory && byPrice && byRating;
  });

  return filtered.sort((a, b) => {
    if (filters.sort === 'price_asc') return a.price - b.price;
    if (filters.sort === 'price_desc') return b.price - a.price;
    if (filters.sort === 'newest') return b.id - a.id;
    return b.rating - a.rating;
  });
};
