import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface longitudeState {
  value: number;
}

const initialState: longitudeState = {
  value: 0,
};

export const longitudeSlice = createSlice({
  name: 'longitude',
  initialState,
  reducers: {
    incrementLongitude: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { incrementLongitude } = longitudeSlice.actions;
export const longitudeValue = (state: RootState) => state.longitude.value;
export default longitudeSlice.reducer;
