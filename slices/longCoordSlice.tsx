import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface longCoordState {
  value: string;
}

const initialState: longCoordState = {
  value: '',
};

export const longCoordSlice = createSlice({
  name: 'longCoord',
  initialState,
  reducers: {
    incrementLongCoord: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { incrementLongCoord } = longCoordSlice.actions;
export const longCoordValue = (state: RootState) => state.longCoord.value;
export default longCoordSlice.reducer;
