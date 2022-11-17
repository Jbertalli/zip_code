import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface cityState {
    value: string
}

const initialState: cityState = {
    value: '',
}

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        incrementCity: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
    },
})

export const { incrementCity } =  citySlice.actions;
export const cityValue = (state: RootState) => state.city.value;
export default citySlice.reducer;