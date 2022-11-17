import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface tempRangeDataState {
    value: string
}

const initialState: tempRangeDataState = {
    value: '',
}

export const tempRangeDataSlice = createSlice({
    name: 'tempRangeData',
    initialState,
    reducers: {
        incrementTempRangeData: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
    },
})

export const { incrementTempRangeData } =  tempRangeDataSlice.actions;
export const tempRangeDataValue = (state: RootState) => state.tempRangeData.value;
export default tempRangeDataSlice.reducer;
