import type {CustomTileLayer} from "./CustomTileLayer.ts";
import {stadiaMapsTileLayer} from "./tileLayers.ts";
import {useCallback, useMemo, useState} from "react";
import {useLiveAirplanesApi} from "../../hooks/useLiveAirplanesApi.ts";
import hash from 'object-hash';
import type {Feature, FeatureCollection} from 'geojson';
import L, {LatLng, type LatLngTuple, Layer, type LeafletMouseEvent} from "leaflet";
import {GeoJSON, MapContainer, Marker, TileLayer, useMapEvent} from 'react-leaflet'
import {makeAircraftCollection} from "./makeAircraftCollection.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks.ts";
import {resetIcao, setIcao} from "../../app/aircraft-slice.ts";

const DEFAULT_POSITION: LatLngTuple = [52.162, 20.96];

type ShowGeoJsonObjectProps = {
    geoJsonCollection: FeatureCollection,
    pointToLayer: ((geoJsonPoint: Feature, latLng: LatLng) => Layer) | undefined,
}

function ShowGeoJsonObject(props: Readonly<ShowGeoJsonObjectProps>) {
    return (
        <GeoJSON
            key={hash(props.geoJsonCollection)}
            data={props.geoJsonCollection}
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

type MapClickHandlerProps = {
    onMapClick: () => void;
}

const MapClickHandler = (props: Readonly<MapClickHandlerProps>) => {
    useMapEvent('click', props.onMapClick); // Attach a click event to the map
    return null;
};

const colorMarkerToColor = (colorMarker: undefined | string) => {
    if (colorMarker === 'TWR') {
        return 'brown';
    }
    if (colorMarker === 'GND') {
        return 'darkgreen';
    }

    return 'blue';
}

export function FlightMap() {
    const [tileLayer] = useState<CustomTileLayer>(stadiaMapsTileLayer);
    const {data} = useLiveAirplanesApi();
    const icao: string = useAppSelector((state) => state.aircraft.icao);
    const dispatch = useAppDispatch();

    const aircraftCollection: FeatureCollection = useMemo(() =>
        makeAircraftCollection(data, icao), [data, icao]);

    const onMapClickHandler
        = useCallback(() => dispatch(resetIcao()), [dispatch]);

    const onMarkerClickHandler = useCallback(
        (evt: LeafletMouseEvent, feature: Feature): void => {
            dispatch(setIcao(feature.properties?.icao ?? ''));
            L.DomEvent.stopPropagation(evt);
        }, [dispatch]);

    const aircraftPointToLayer = useCallback((feature: Feature, latLng: LatLng) => {
        const color = colorMarkerToColor(feature.properties?.colorMarker);
        const radius = feature.properties?.marker === true ? 10 : 5;
        return L.circleMarker(latLng, {color: color, radius, weight: 1})
            .on("click", (evt: LeafletMouseEvent): void => onMarkerClickHandler(evt, feature))
            .bindTooltip(feature.properties?.desc, {permanent: false, direction: 'top', opacity: 0.75});
    }, [onMarkerClickHandler]);

    return (
        <MapContainer
            style={{height: "100%", width: "100%"}}
            center={DEFAULT_POSITION}
            zoom={9}
            scrollWheelZoom={true}
            doubleClickZoom={false}
        >
            <TileLayerSetter url={tileLayer.url} attribution={tileLayer.attribution}/>
            <ShowGeoJsonObject geoJsonCollection={aircraftCollection}
                               pointToLayer={aircraftPointToLayer}/>
            <Marker position={DEFAULT_POSITION}/>
            <MapClickHandler onMapClick={onMapClickHandler}/>
        </MapContainer>
    )
}
