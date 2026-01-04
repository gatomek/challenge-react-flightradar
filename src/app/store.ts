import {configureStore} from "@reduxjs/toolkit";

import aircraftReducer from '../features/aircraft-slice'

export const store = configureStore({
    reducer: {
        aircraft: aircraftReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
