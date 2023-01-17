import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface currentTempDataState {
  value: string;
}

const initialState: currentTempDataState = {
  value: '',
};

export const currentTempDataSlice = createSlice({
  name: 'currentTempData',
  initialState,
  reducers: {
    incrementCurrentTempData: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { incrementCurrentTempData } = currentTempDataSlice.actions;
export const currentTempDataValue = (state: RootState) => state.currentTempData.value;
export default currentTempDataSlice.reducer;
