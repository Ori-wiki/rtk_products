import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: { payload: ThemeMode }) => {
      state.mode = action.payload;
    },
  },
});

const { reducer: themeReducer, actions } = themeSlice;
export const { toggleTheme, setTheme } = actions;
export const getThemeMode = (state: RootState) => state.theme.mode;
export default themeReducer;
