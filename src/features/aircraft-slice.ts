import {createSlice} from "@reduxjs/toolkit";

interface AircraftState {
    icao: string;
}

const initialState: AircraftState = {
    icao: ''
}

const aircraftSlice = createSlice({
    name: 'Aircraft',
    initialState,
    reducers: {
        setIcao(state, value) {
            state.icao = value.payload;
        },
        resetIcao( state) {
            state.icao = '';
        }
    }
})

export const {setIcao, resetIcao} = aircraftSlice.actions;
export default aircraftSlice.reducer;
