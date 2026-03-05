import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { IProduct } from './products';

export interface ICartProduct extends IProduct {
  quantity: number;
  total: number;
  discountedTotal: number;
}

export interface ICart {
  products: ICartProduct[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface ICartState {
  entity: ICart;
}

const createEmptyCart = (): ICart => ({
  products: [],
  total: 0,
  discountedTotal: 0,
  totalProducts: 0,
  totalQuantity: 0,
});

const recalculateCart = (cart: ICart) => {
  cart.total = cart.products.reduce((sum, product) => sum + product.total, 0);
  cart.discountedTotal = cart.products.reduce(
    (sum, product) => sum + product.discountedTotal,
    0,
  );
  cart.totalProducts = cart.products.length;
  cart.totalQuantity = cart.products.reduce((sum, product) => sum + product.quantity, 0);
};

const initialState: ICartState = {
  entity: createEmptyCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart: (state, action: { payload: ICart }) => {
      state.entity = action.payload;
      recalculateCart(state.entity);
    },
    clearCart: (state) => {
      state.entity = createEmptyCart();
    },
    removeFromCart: (state, action: { payload: number }) => {
      state.entity.products = state.entity.products.filter(
        (product) => product.id !== action.payload,
      );
      recalculateCart(state.entity);
    },
    addToCart: (state, action: { payload: IProduct }) => {
      const product = action.payload;
      const existing = state.entity.products.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
        existing.total = existing.price * existing.quantity;
        existing.discountedTotal =
          existing.total * (1 - existing.discountPercentage / 100);
      } else {
        const total = product.price;
        state.entity.products.push({
          ...product,
          quantity: 1,
          total,
          discountedTotal: total * (1 - product.discountPercentage / 100),
        });
      }

      recalculateCart(state.entity);
    },
    incrementCartItem: (state, action: { payload: number }) => {
      const existing = state.entity.products.find((item) => item.id === action.payload);
      if (!existing) return;
      existing.quantity += 1;
      existing.total = existing.price * existing.quantity;
      existing.discountedTotal = existing.total * (1 - existing.discountPercentage / 100);
      recalculateCart(state.entity);
    },
    decrementCartItem: (state, action: { payload: number }) => {
      const existing = state.entity.products.find((item) => item.id === action.payload);
      if (!existing) return;

      if (existing.quantity <= 1) {
        state.entity.products = state.entity.products.filter(
          (product) => product.id !== action.payload,
        );
      } else {
        existing.quantity -= 1;
        existing.total = existing.price * existing.quantity;
        existing.discountedTotal =
          existing.total * (1 - existing.discountPercentage / 100);
      }
      recalculateCart(state.entity);
    },
  },
});

const { reducer: cartReducer, actions } = cartSlice;
export const {
  replaceCart,
  clearCart,
  removeFromCart,
  addToCart,
  incrementCartItem,
  decrementCartItem,
} = actions;

export const getCart = (state: RootState) => state.cart.entity;
export const getCartProducts = (state: RootState) => state.cart.entity.products;
export const getCartItemByProductId = (state: RootState, productId: number) =>
  state.cart.entity.products.find((product) => product.id === productId);
export const getCartItemQuantity = (state: RootState, productId: number) =>
  state.cart.entity.products.find((product) => product.id === productId)?.quantity ?? 0;
export const getCartQuantityById = createSelector([getCartProducts], (products) =>
  products.reduce<Record<number, number>>((acc, product) => {
    acc[product.id] = product.quantity;
    return acc;
  }, {}),
);

export default cartReducer;
