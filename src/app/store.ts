import {configureStore} from '@reduxjs/toolkit';

import aircraftReducer from './aircraft-slice';
import radarReducer from './radar-slice';

export const store = configureStore({
    reducer: {
        aircraft: aircraftReducer,
        radar: radarReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
