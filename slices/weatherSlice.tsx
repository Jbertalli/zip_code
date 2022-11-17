import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface weatherDataState {
    value: string
}

const initialState: weatherDataState = {
    value: '',
}

export const weatherDataSlice = createSlice({
    name: 'weatherData',
    initialState,
    reducers: {
        incrementWeatherData: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        },
    },
})

export const { incrementWeatherData } =  weatherDataSlice.actions;
export const weatherDataValue = (state: RootState) => state.weatherData.value;
export default weatherDataSlice.reducer;
