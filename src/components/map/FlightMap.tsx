import type {CustomTileLayer} from "./CustomTileLayer.ts";
import {stadiaMapsTileLayer} from "./tileLayers.ts";
import {useState} from "react";
import {useLiveAirplanesApi} from "../hooks/useLiveAirplanesApi.ts";
import hash from 'object-hash';
import type {Feature, FeatureCollection, MultiPoint} from 'geojson';
import L, {LatLng, type LatLngTuple, Layer} from "leaflet";
import {GeoJSON, MapContainer, Marker, TileLayer} from 'react-leaflet'

const DEFAULT_POSITION: [number, number] = [20.142209, 51.961301]
const position: LatLngTuple = [DEFAULT_POSITION[1], DEFAULT_POSITION[0]];
const radarPosition: LatLngTuple = [51, 21];

type ShowGeoJsonObjectProps = {
    geoJsonCollection: FeatureCollection,
    pointToLayer: ((geoJsonPoint: Feature, latLng: LatLng) => Layer) | undefined,
    style?: Record<string, string | number>;
}

const aircraft_48af07: [number, number] = [20.224085, 51.998855];

const aircraftMultiPoint: Feature<MultiPoint> = {
    type: "Feature",
    geometry: {
        type: "MultiPoint",
        coordinates: [
            aircraft_48af07
        ]
    },
    properties: {
        desc: "Boeing 737 MAX 8"
    }
}

const aircraftCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: [
        aircraftMultiPoint
    ]
}

function ShowGeoJsonObject(props: Readonly<ShowGeoJsonObjectProps>) {
    return (
        <GeoJSON
            key={hash(props.geoJsonCollection)}
            data={props.geoJsonCollection}
            style={props.style}
            pointToLayer={props.pointToLayer}
        />
    );
}

function SetTileLayer(props: Readonly<CustomTileLayer>) {
    return (
        <TileLayer
            url={props.url}
            attribution={props.attribution}
            detectRetina={false}
        />
    );
}

const aircraftStyle: Record<string, string | number> = {
    color: "blue",
    weight: 2,
    fillColor: "blue",
    radius: 5,
    opacity: 0.5,
    fillOpacity: 0.4
};

function aircraftPointToLayer(feature: Feature, latLng: LatLng) {
    return L.circleMarker(latLng)
        .bindTooltip(feature.properties?.desc, {permanent: false, direction: 'top', opacity: 0.75});
}

export function FlightMap() {
    const [tileLayer] = useState<CustomTileLayer>(stadiaMapsTileLayer);
    const {data} = useLiveAirplanesApi();

    return (
        <MapContainer
            style={{height: "100%", width: "100%"}}
            center={position}
            zoom={9}
            scrollWheelZoom={true}
        >
            <SetTileLayer url={tileLayer.url} attribution={tileLayer.attribution}/>
            <ShowGeoJsonObject geoJsonCollection={aircraftCollection}
                               pointToLayer={aircraftPointToLayer}
                               style={aircraftStyle}/>
            <Marker position={radarPosition}/>
        </MapContainer>
    )
}
