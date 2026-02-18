import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import productsReducer from './products';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
