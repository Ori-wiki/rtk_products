import { createSlice, type Dispatch } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 2,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: { payload: number }) => {
      state.value += action.payload;
    },
    decrement: (state, action: { payload: number }) => {
      state.value -= action.payload;
    },
  },
});
const { reducer: counterReducer, actions } = counterSlice;
const { increment, decrement } = actions;

export const getCount = (state: RootState) => state.counter.value;

export const incrementBy = (value: number) => (dispatch: Dispatch) => {
  dispatch(increment(value));
};
export const decrementBy = (value: number) => (dispatch: Dispatch) => {
  dispatch(decrement(value));
};

export default counterReducer;
