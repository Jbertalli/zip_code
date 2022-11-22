import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import zipReducer from './slices/zipSlice';
import cityReducer from './slices/citySlice';
import latCoordReducer from './slices/latCoordSlice';
import longCoordReducer from './slices/longCoordSlice';
import stateReducer from './slices/stateSlice';
import stateAbbreviationReducer from './slices/stateAbbreviationSlice';
import OppLatReducer from './slices/OppLatSlice';
import OppLongReducer from './slices/OppLongSlice';
import weatherDataReducer from './slices/weatherSlice';
import currentTempDataReducer from './slices/currentTempDataSlice';
import tempRangeDataReducer from './slices/tempRangeDataSlice';
import latitudeReducer from './slices/latitudeSlice';
import longitudeReducer from './slices/longitudeSlice';
import updateZipReducer from './slices/updateZipSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        zip: zipReducer,
        city: cityReducer,
        latCoord: latCoordReducer,
        longCoord: longCoordReducer,
        state: stateReducer,
        stateAbbreviation: stateAbbreviationReducer,
        OppLat: OppLatReducer,
        OppLong: OppLongReducer,
        weatherData: weatherDataReducer,
        currentTempData: currentTempDataReducer,
        tempRangeData: tempRangeDataReducer,
        latitude: latitudeReducer,
        longitude: longitudeReducer,
        updateZip: updateZipReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
