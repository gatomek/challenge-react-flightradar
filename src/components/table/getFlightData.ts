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
        info: 'MIL',
        selected: false
    }
]

export function getFlightData() {
    return flights;
}

function makeAircraftInfo(military: boolean, interesting: boolean, selected: boolean) {
    const flags: string[] = [];
    if (military) {
        flags.push('MIL');
    }
    if (interesting) {
        flags.push('INT');
    }
    if (selected) {
        flags.push('SEL');
    }
    return flags.join(',');

}

function isMilitary(ac: Aircraft) {
    return !!(ac.dbFlags && (ac.dbFlags & 1) === 1);
}

function isInteresting(ac: Aircraft) {
    return !!(ac.dbFlags && (ac.dbFlags & 2) === 2);
}

export function makeFlightData(data: undefined | AircraftData, icao: string): Airplane[] {
    if (!data)
        return [];

    return data.ac
        .toSorted((a: Aircraft, b: Aircraft) => a.hex.localeCompare(b.hex))
        .map((ac: Aircraft) => {
            const military: boolean = isMilitary(ac);
            const interesting: boolean = isInteresting(ac);

            const selected: boolean = ac.hex === icao;
            return (
                {
                    hex: ac.hex,
                    type: ac.t,
                    desc: ac.desc,
                    registration: ac.r,
                    flight: ac.flight,
                    latitude: ac.lat,
                    longitude: ac.lon,
                    altitude: ac.alt_baro,
                    info: makeAircraftInfo(military, interesting, selected),
                    selected
                })
        });
}

