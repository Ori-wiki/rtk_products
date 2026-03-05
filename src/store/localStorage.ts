import type { ICartState } from './cart';
import type { ThemeMode } from './theme';

export interface PersistedState {
  cart?: ICartState;
  favorites?: { ids: number[] };
  theme?: { mode: ThemeMode };
}

const STORAGE_KEY = 'ts_redux_rtk_query_state';

export const loadPersistedState = (): PersistedState | undefined => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return undefined;
  }
};

export const savePersistedState = (state: PersistedState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore write failures
  }
};
