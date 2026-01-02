import type {Airplane} from "./model/Airplane.ts";
import type {AircraftData} from "../query/model/AircraftData.ts";
import type {Aircraft} from "../query/model/Aircraft.ts";

const flights: Airplane[] = [
    {
        hex: "4baa90",
        flight: "THY6YX",
        type: "A321",
        desc: "AIRBUS A-321",
        latitude: 51.302719,
        longitude: 18.760269,
        altitude: 35050,
        heading: 152.12,
        registration: 'LX-N90453',
        military: false
    }
]

export function getTestFlightData() {
    return flights;
}

export function makeFlightData(data: undefined | AircraftData): Airplane[] {

    if (!data)
        return [];

    return data.ac.map((ac: Aircraft) => ({
        hex: ac.hex,
        type: ac.t,
        desc: ac.desc,
        registration: ac.r,
        flight: ac.flight,
        latitude: ac.lat,
        longitude: ac.lon,
        altitude: ac.alt_baro,
        military: !!(ac.dbFlags && (ac.dbFlags & 1) === 1)
    }));
}

