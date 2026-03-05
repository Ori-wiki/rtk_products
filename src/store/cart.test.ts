import { describe, expect, it } from 'vitest';
import cartReducer, {
  addToCart,
  decrementCartItem,
  getCartItemQuantity,
  incrementCartItem,
  removeFromCart,
} from './cart';
import type { IProduct } from './products';
import type { RootState } from './store';

const product: IProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 10,
  category: 'test',
  thumbnail: 'thumb.jpg',
  images: ['thumb.jpg'],
  description: 'desc',
};

describe('cart reducer', () => {
  it('adds product and updates totals', () => {
    const state = cartReducer(undefined, addToCart(product));
    expect(state.entity.products).toHaveLength(1);
    expect(state.entity.total).toBe(100);
    expect(state.entity.totalQuantity).toBe(1);
  });

  it('increments and decrements quantity', () => {
    let state = cartReducer(undefined, addToCart(product));
    state = cartReducer(state, incrementCartItem(product.id));
    expect(state.entity.products[0].quantity).toBe(2);

    state = cartReducer(state, decrementCartItem(product.id));
    expect(state.entity.products[0].quantity).toBe(1);
  });

  it('removes product from cart', () => {
    let state = cartReducer(undefined, addToCart(product));
    state = cartReducer(state, removeFromCart(product.id));
    expect(state.entity.products).toHaveLength(0);
  });

  it('selects cart item quantity', () => {
    const cartState = cartReducer(undefined, addToCart(product));
    const rootState = { cart: cartState } as unknown as RootState;
    expect(getCartItemQuantity(rootState, product.id)).toBe(1);
    expect(getCartItemQuantity(rootState, 999)).toBe(0);
  });
});
