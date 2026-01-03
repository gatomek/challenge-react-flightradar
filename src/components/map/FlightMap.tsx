import type {CustomTileLayer} from "./CustomTileLayer.ts";
import {stadiaMapsTileLayer} from "./tileLayers.ts";
import {useState} from "react";
import {useLiveAirplanesApi} from "../hooks/useLiveAirplanesApi.ts";
import hash from 'object-hash';
import type {Feature, FeatureCollection} from 'geojson';
import L, {LatLng, type LatLngTuple, Layer} from "leaflet";
import {GeoJSON, MapContainer, Marker, TileLayer} from 'react-leaflet'
import {makeAircraftCollection} from "./makeAircraftCollection.ts";

const DEFAULT_POSITION: LatLngTuple = [52.162, 20.96];

type ShowGeoJsonObjectProps = {
    geoJsonCollection: FeatureCollection,
    pointToLayer: ((geoJsonPoint: Feature, latLng: LatLng) => Layer) | undefined,
    style?: Record<string, string | number>;
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

function TileLayerSetter(props: Readonly<CustomTileLayer>) {
    return (
        <TileLayer
            url={props.url}
            attribution={props.attribution}
            detectRetina={false}
        />
    );
}

const aircraftStyle: Record<string, string | number> = {
    weight: 1,
    radius: 5,
};

function aircraftPointToLayer(feature: Feature, latLng: LatLng) {
    const color = feature.properties?.type === 'TWR' ? 'brown' : 'blue';
    return L.circleMarker(latLng).setStyle( {color: color} )
        .bindTooltip(feature.properties?.desc, {permanent: false, direction: 'top', opacity: 0.75});
}

export function FlightMap() {
    const [tileLayer] = useState<CustomTileLayer>(stadiaMapsTileLayer);
    const {data} = useLiveAirplanesApi();
    const aircraftCollection: FeatureCollection = makeAircraftCollection(data);

    return (
        <MapContainer
            style={{height: "100%", width: "100%"}}
            center={DEFAULT_POSITION}
            zoom={9}
            scrollWheelZoom={true}
        >
            <TileLayerSetter url={tileLayer.url} attribution={tileLayer.attribution}/>
            <ShowGeoJsonObject geoJsonCollection={aircraftCollection}
                               pointToLayer={aircraftPointToLayer}
                               style={aircraftStyle}/>
            <Marker position={DEFAULT_POSITION}/>
        </MapContainer>
    )
}
