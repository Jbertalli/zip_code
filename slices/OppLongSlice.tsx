import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface OppLongState {
    value: string
}

const initialState: OppLongState = {
    value: '',
}

export const OppLongSlice = createSlice({
    name: 'OppLong',
    initialState,
    reducers: {
        incrementOppLong: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
    },
})

export const { incrementOppLong } =  OppLongSlice.actions;
export const OppLongValue = (state: RootState) => state.OppLong.value;
export default OppLongSlice.reducer;
