import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface updateZipState {
    value: boolean
}

const initialState: updateZipState = {
    value: false,
}

export const updateZipSlice = createSlice({
    name: 'updateZip',
    initialState,
    reducers: {
        incrementUpdateZip: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
    },
})

export const { incrementUpdateZip } =  updateZipSlice.actions;
export const updateZipValue = (state: RootState) => state.updateZip.value;
export default updateZipSlice.reducer;
