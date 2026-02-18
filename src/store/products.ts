import { createSlice, type Dispatch } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface IProduct {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

export interface IProductState {
  entitties: IProduct[];
  isLoading: boolean;
  error: string | null;
  lastFetch: string | null;
}
const initialState: IProductState = {
  entitties: [],
  isLoading: false,
  error: null,
  lastFetch: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    //1 Отправляем запрос на сервер, ставим isLoading в true
    productsRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    //2 Получеам продукты
    productsReceived: (state, action: { payload: IProduct[] }) => {
      state.entitties = action.payload;
      state.isLoading = false;
      state.lastFetch = new Date().toISOString();
    },
    //3 обрабатываем ошибку
    productsRequestFailed: (state, action: { payload: string }) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsReceived, productsRequestFailed } = actions;

export const loadProductsList =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().products;
    const isOutDated = lastFetch
      ? (new Date().getTime() - new Date(lastFetch).getTime()) / 1000 / 60 > 10
      : true;

    if (isOutDated) {
      dispatch(productsRequested());
      try {
        const res = await fetch('https://dummyjson.com/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        dispatch(productsReceived(data.products));
      } catch (error) {
        dispatch(productsRequestFailed((error as Error).message));
      }
    }
  };

export const getProducts = (state: RootState) => state.products.entitties;
export const getProductsLoadingStatus = (state: RootState) =>
  state.products.isLoading;

export default productsReducer;
