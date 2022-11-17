import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface OppLatState {
    value: string
}

const initialState: OppLatState = {
    value: '',
}

export const OppLatSlice = createSlice({
    name: 'OppLat',
    initialState,
    reducers: {
        incrementOppLat: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
    },
})

export const { incrementOppLat } =  OppLatSlice.actions;
export const OppLatValue = (state: RootState) => state.OppLat.value;
export default OppLatSlice.reducer;
