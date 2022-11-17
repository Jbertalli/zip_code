import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface latCoordState {
    value: string
}

const initialState: latCoordState = {
    value: '',
}

export const latCoordSlice = createSlice({
    name: 'latCoord',
    initialState,
    reducers: {
        incrementLatCoord: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
    },
})

export const { incrementLatCoord } =  latCoordSlice.actions;
export const latCoordValue = (state: RootState) => state.latCoord.value;
export default latCoordSlice.reducer;
