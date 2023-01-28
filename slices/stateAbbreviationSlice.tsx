import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface stateAbbreviationState {
  value: string;
}

const initialState: stateAbbreviationState = {
  value: '',
};

export const stateAbbreviationSlice = createSlice({
  name: 'stateAbbreviation',
  initialState,
  reducers: {
    incrementStateAbbreviation: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { incrementStateAbbreviation } = stateAbbreviationSlice.actions;
export const stateAbbreviationValue = (state: RootState) => state.stateAbbreviation.value;
export default stateAbbreviationSlice.reducer;
