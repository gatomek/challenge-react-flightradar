import type {Airplane} from "./model/Airplane.ts";

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

export function getFlightData() {
    return flights;
}