import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface latitudeState {
  value: number;
}

const initialState: latitudeState = {
  value: 0,
};

export const latitudeSlice = createSlice({
  name: 'latitude',
  initialState,
  reducers: {
    incrementLatitude: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { incrementLatitude } = latitudeSlice.actions;
export const latitudeValue = (state: RootState) => state.latitude.value;
export default latitudeSlice.reducer;
