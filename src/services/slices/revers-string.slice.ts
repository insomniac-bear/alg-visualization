import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TStatus = 'Changing' | 'Modified' | 'Default';

export type TArrOfSymbols = {
  id: number;
  value: string;
  status: TStatus;
}

interface IReverseStringState {
  inProcess: boolean,
  arrOfSymbols: TArrOfSymbols[],
}

const initialState: IReverseStringState = {
  inProcess: false,
  arrOfSymbols: [],
};

export const reverseStringSlice = createSlice({
  name: 'reverse',
  initialState,
  reducers: {
    startReverse: (state, action: PayloadAction<boolean>) => {
      state.inProcess = action.payload;
    },
    setSymbols: (state, action: PayloadAction<TArrOfSymbols[]>) => {
      state.arrOfSymbols = action.payload;
    },
    setActive: (state, action: PayloadAction<{ start: number; end: number }>) => {
      state.arrOfSymbols[action.payload.start].status = 'Changing';
      state.arrOfSymbols[action.payload.end].status = 'Changing';
    },
    setSorted: (state, action: PayloadAction<{ start: number; end: number }>) => {
      state.arrOfSymbols[action.payload.start].status = 'Modified';
      state.arrOfSymbols[action.payload.end].status = 'Modified';
    },
  },
});

export const { setSymbols, startReverse,setActive, setSorted } = reverseStringSlice.actions;

export const getArrOfSymbols = (store: RootState) => store.reverse.arrOfSymbols;
export const getStatus = (store: RootState) => store.reverse.inProcess;

export default reverseStringSlice.reducer;
