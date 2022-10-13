import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { generateArr } from "../../utils";
import { ElementStates } from "../../types/element-states";

export type TSortingElement = {
  id: number,
  value: number,
  state: ElementStates,
};

export interface ISortingState {
  inProcess: boolean;
  array: TSortingElement[];
};

const initialState: ISortingState = {
  inProcess: false,
  array: [],
};

export const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<boolean>) => {
      state.inProcess = action.payload;
    },
    generateArray: (state) => {
      state.array = generateArr();
    },
    setSortingArr: (state, action: PayloadAction<TSortingElement[]>) => {
      state.array = action.payload;
    },
    setStatusElement: (state, action: PayloadAction<{index: number; status: ElementStates}>) => {
      state.array[action.payload.index].state = action.payload.status;
    },
  },
});

export const { start, generateArray, setSortingArr, setStatusElement } = sortingSlice.actions;

export const getSortingArr = (store: RootState) => store.sorting.array;
export const getStatus = (store: RootState) => store.sorting.inProcess;

export default sortingSlice.reducer;
