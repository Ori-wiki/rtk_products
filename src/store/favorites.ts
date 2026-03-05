import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface FavoritesState {
  ids: number[];
}

const initialState: FavoritesState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: { payload: number[] }) => {
      state.ids = action.payload;
    },
    toggleFavorite: (state, action: { payload: number }) => {
      const exists = state.ids.includes(action.payload);
      if (exists) {
        state.ids = state.ids.filter((id) => id !== action.payload);
      } else {
        state.ids.push(action.payload);
      }
    },
    clearFavorites: (state) => {
      state.ids = [];
    },
  },
});

const { reducer: favoritesReducer, actions } = favoritesSlice;
export const { setFavorites, toggleFavorite, clearFavorites } = actions;
export const getFavoriteIds = (state: RootState) => state.favorites.ids;
export const isFavorite = (state: RootState, productId: number) =>
  state.favorites.ids.includes(productId);

export default favoritesReducer;
