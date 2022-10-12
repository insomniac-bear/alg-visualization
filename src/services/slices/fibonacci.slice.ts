import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TFibonacci = {
  id: number,
  value: number,
}

interface IFibonacciState {
  inProcess: boolean;
  rangeOfFibonacci: TFibonacci[];
}

const initialState: IFibonacciState = {
  inProcess: false,
  rangeOfFibonacci: [],
}

export const fibonacciSlice = createSlice({
  name: 'fibonacci',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<boolean>) => {
      state.inProcess = action.payload;
    },
    setRange: (state, action: PayloadAction<TFibonacci[]>) => {
      state.rangeOfFibonacci = action.payload;
    },
  },
});

export const { start, setRange } = fibonacciSlice.actions;

export const getFibonacciRange = (store: RootState) => store.fibonacci.rangeOfFibonacci;
export const getStatus = (store: RootState) => store.fibonacci.inProcess;

export default fibonacciSlice.reducer;
