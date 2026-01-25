import type {Feature, FeatureCollection, GeoJsonProperties, Point} from 'geojson';
import type {AircraftData} from '../query/model/AircraftData.ts';
import type {Aircraft} from '../query/model/Aircraft.ts';

const aircraftEmptyCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: []
};

const toColorMarker = (ac: Aircraft): undefined | 'TWR' | 'GND' => {
    if (ac.t === 'TWR') {
        return 'TWR';
    }
    if (ac.alt_baro === 'ground') {
        return 'GND';
    }
    return undefined;
};

export function makeAircraftCollection(data: AircraftData | undefined, icao: string): FeatureCollection {
    if (!data) {
        return aircraftEmptyCollection;
    }

    const aircraftPoints: Feature<Point>[] = data.ac.map((ac): Feature<Point, GeoJsonProperties> => {
        const {hex, lon, lat, alt_baro, t, desc, mag_heading} = ac;
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [lon, lat]
            },
            properties: {
                desc: `ICAO: ${hex}'<br/>ALT: ${alt_baro}<br/>TYPE: ${t}` + (ac.desc ? ` | ${desc}` : ''),
                type: t,
                icao: hex,
                marker: icao !== '' && icao === hex,
                colorMarker: toColorMarker(ac),
                ...(mag_heading && {heading: mag_heading})
            }
        };
    });

    return {
        type: 'FeatureCollection',
        features: aircraftPoints
    };
}
