import {createSlice} from "@reduxjs/toolkit";

interface AircraftState {
    icao: string;
}

const initialState: AircraftState = {
    icao: ''
}

const aircraftSlice = createSlice({
    name: 'aircraft',
    initialState,
    reducers: {
        setIcao(state, action) {
            state.icao = action.payload;
        },
        resetIcao(state) {
            state.icao = '';
        }
    }
})

export const {setIcao, resetIcao} = aircraftSlice.actions;
export default aircraftSlice.reducer;
