import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface zipState {
  value: string;
}

const initialState: zipState = {
  value: '',
};

export const zipSlice = createSlice({
  name: 'zip',
  initialState,
  reducers: {
    incrementZip: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { incrementZip } = zipSlice.actions;
export const zipValue = (state: RootState) => state.zip.value;
export default zipSlice.reducer;
