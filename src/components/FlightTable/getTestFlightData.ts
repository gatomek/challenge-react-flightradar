import type {Airplane} from "./model/Airplane.ts";
import type {AircraftData} from "../Query/model/AircraftData.ts";
import type {Aircraft} from "../Query/model/Aircraft.ts";

const flights: Airplane[] = [
    {
        hex: "4baa90",
        flight: "THY6YX",
        type: "A321",
        desc: "AIRBUS A-321",
        latitude: 51.302719,
        longitude: 18.760269,
        altitude: 35050,
        heading: 152.12
    }
]

export function getTestFlightData() {
    return flights;
}

export function getFlightData(data: undefined | AircraftData): Airplane[]  {

    if( !data)
        return [];

    return data.ac.map( (ac:Aircraft) => ({
        hex: ac.hex,
        type: ac.t,
        desc: ac.desc,
        flight: ac.flight,
        latitude: ac.lat,
        longitude: ac.lon,
        altitude: ac.alt_baro
    }));
}

