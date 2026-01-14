import type {Feature, FeatureCollection, Point} from "geojson";
import type {AircraftData} from "../query/model/AircraftData.ts";
import type {Aircraft} from "../query/model/Aircraft.ts";

const aircraftEmptyCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: []
}

const toColorMarker = (ac: Aircraft): undefined | 'TWR' | 'GND' => {
    if (ac.t === 'TWR') {
        return 'TWR';
    }
    if (ac.alt_baro === 'ground') {
        return 'GND';
    }
    return undefined;
}

export function makeAircraftCollection(data: AircraftData | undefined, icao: string): FeatureCollection {
    if (!data) {
        return aircraftEmptyCollection;
    }

    const aircraftPoints: Feature<Point>[] = data.ac.map(ac => {
        const point: Feature<Point> = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [ac.lon, ac.lat]
            },
            properties: {
                desc: "ICAO: " + ac.hex.toUpperCase() + '<br/>ALT: ' + ac.alt_baro + '<br/>TYPE: ' + ac.t + (ac.desc ? " | " + ac.desc : ''),
                type: ac.t,
                icao: ac.hex,
                marker: icao !== '' && icao === ac.hex,
                colorMarker: toColorMarker(ac)
            }
        }
        return point;
    });

    return {
        type: "FeatureCollection",
        features: aircraftPoints
    }
}