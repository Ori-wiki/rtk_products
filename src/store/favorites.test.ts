import { describe, expect, it } from 'vitest';
import favoritesReducer, { isFavorite, toggleFavorite } from './favorites';
import type { RootState } from './store';

describe('favorites reducer', () => {
  it('toggles favorite on and off', () => {
    let state = favoritesReducer(undefined, toggleFavorite(10));
    expect(state.ids).toEqual([10]);

    state = favoritesReducer(state, toggleFavorite(10));
    expect(state.ids).toEqual([]);
  });

  it('checks isFavorite selector', () => {
    const favoritesState = favoritesReducer(undefined, toggleFavorite(3));
    const rootState = { favorites: favoritesState } as unknown as RootState;
    expect(isFavorite(rootState, 3)).toBe(true);
    expect(isFavorite(rootState, 99)).toBe(false);
  });
});
