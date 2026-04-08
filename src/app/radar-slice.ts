import {createSlice} from '@reduxjs/toolkit';

interface RadarState {
    location: string;
}

const initialState: RadarState = {
    location: 'warsaw'
};

const radarSlice = createSlice({
    name: 'radar',
    initialState,
    reducers: {
        setRange(state, action) {
            state.location = action.payload;
        },
        resetRange(state) {
            state.location = 'warsaw';
        }
    }
});

export const {setRange, resetRange} = radarSlice.actions;
export default radarSlice.reducer;
