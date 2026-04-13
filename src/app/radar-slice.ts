import {createSlice} from '@reduxjs/toolkit';

interface RadarState {
    location: string;
}

const initialState: RadarState = {
    location: 'poland'
};

const radarSlice = createSlice({
    name: 'radar',
    initialState,
    reducers: {
        setRange(state, action) {
            state.location = action.payload;
        },
        resetRange(state) {
            state.location = 'poland';
        }
    }
});

export const {setRange, resetRange} = radarSlice.actions;
export default radarSlice.reducer;
