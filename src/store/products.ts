import { createSelector, createSlice, type Dispatch } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface IReview {
  reviewerName: string;
  rating: number;
  comment: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
}

export interface IProductState {
  entities: IProduct[];
  isLoading: boolean;
  error: string | null;
  lastFetch: string | null;
}

const initialState: IProductState = {
  entities: [],
  isLoading: false,
  error: null,
  lastFetch: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    productsReceived: (state, action: { payload: IProduct[] }) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.lastFetch = new Date().toISOString();
    },
    productsRequestFailed: (state, action: { payload: string }) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsReceived, productsRequestFailed } = actions;

export const loadProductsList =
  (force = false) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().products;
    const isOutdated = lastFetch
      ? (Date.now() - new Date(lastFetch).getTime()) / 1000 / 60 > 10
      : true;

    if (!force && !isOutdated) return;

    dispatch(productsRequested());
    try {
      const res = await fetch('https://dummyjson.com/products?limit=100');
      if (!res.ok) {
        throw new Error('Не удалось загрузить товары');
      }
      const data = await res.json();
      dispatch(productsReceived(data.products));
    } catch (error) {
      dispatch(productsRequestFailed((error as Error).message));
    }
  };

export const getProducts = (state: RootState) => state.products.entities;
export const getProductsLoadingStatus = (state: RootState) => state.products.isLoading;
export const getProductsError = (state: RootState) => state.products.error;
export const getProductById = (state: RootState, id: number) =>
  state.products.entities.find((product) => product.id === id);
export const getProductCategories = createSelector([getProducts], (products) =>
  Array.from(new Set(products.map((product) => product.category))).sort(),
);

export default productsReducer;
