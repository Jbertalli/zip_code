import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface stateState {
    value: string
}

const initialState: stateState = {
    value: '',
}

export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        incrementState: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
    },
})

export const { incrementState } =  stateSlice.actions;
export const stateValue = (state: RootState) => state.state.value;
export default stateSlice.reducer;
