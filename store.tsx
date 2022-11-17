import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import zipReducer from './slices/zipSlice';
import cityReducer from './slices/citySlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        zip: zipReducer,
        city: cityReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
