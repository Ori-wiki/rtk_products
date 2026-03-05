import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products';
import cartReducer, { replaceCart } from './cart';
import favoritesReducer, { setFavorites } from './favorites';
import themeReducer, { setTheme } from './theme';
import { loadPersistedState, savePersistedState } from './localStorage';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
});

const persisted = loadPersistedState();
if (persisted?.cart?.entity) {
  store.dispatch(replaceCart(persisted.cart.entity));
}
if (persisted?.favorites?.ids) {
  store.dispatch(setFavorites(persisted.favorites.ids));
}
if (persisted?.theme?.mode) {
  store.dispatch(setTheme(persisted.theme.mode));
}

store.subscribe(() => {
  const state = store.getState();
  savePersistedState({
    cart: state.cart,
    favorites: state.favorites,
    theme: state.theme,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
