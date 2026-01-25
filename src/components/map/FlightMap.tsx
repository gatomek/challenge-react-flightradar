import type {CustomTileLayer} from './CustomTileLayer.ts';
import {stadiaMapsTileLayer} from './tileLayers.ts';
import {useCallback, useMemo, useState} from 'react';
import {useLiveAirplanesApi} from '../../hooks/useLiveAirplanesApi.ts';
import hash from 'object-hash';
import type {Feature, FeatureCollection} from 'geojson';
import L, {LatLng, type LatLngTuple, Layer, type LeafletMouseEvent} from 'leaflet';
import {GeoJSON, MapContainer, Marker, TileLayer, useMapEvent} from 'react-leaflet';
import {makeAircraftCollection} from './makeAircraftCollection.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks.ts';
import {resetIcao, setIcao} from '../../app/aircraft-slice.ts';
import 'leaflet/dist/leaflet.css';
import 'leaflet-rotate';
import {paramsToFlightIcon} from './icon/flightIconUtils.ts';
import {paramsToGroundIcon} from './icon/groundIconUtils.ts';
import {paramsToTowerIcon} from './icon/towerIconUtils.ts';
import {defaultIconConfig} from "./icon/defaultIconConf.ts";

defaultIconConfig();

const DEFAULT_POSITION: LatLngTuple = [52.162, 20.96];

interface ShowGeoJsonObjectProps {
    geoJsonCollection: FeatureCollection;
    pointToLayer: ((geoJsonPoint: Feature, latLng: LatLng) => Layer) | undefined;
}

function ShowGeoJsonObject(props: Readonly<ShowGeoJsonObjectProps>) {
    return (
        <GeoJSON key={hash(props.geoJsonCollection)} data={props.geoJsonCollection} pointToLayer={props.pointToLayer} />
    );
}

function TileLayerSetter(props: Readonly<CustomTileLayer>) {
    return <TileLayer url={props.url} attribution={props.attribution} detectRetina={false} />;
}

interface MapClickHandlerProps {
    onMapClick: () => void;
}

const MapClickHandler = (props: Readonly<MapClickHandlerProps>) => {
    useMapEvent('click', props.onMapClick); // Attach a click event to the map
    return null;
};

const paramsToIcon = (colorMarker: undefined | string, marker: undefined | boolean, heading: undefined | number) => {
    if (colorMarker === 'TWR') {
        return paramsToTowerIcon(marker);
    }
    if (colorMarker === 'GND') {
        return paramsToGroundIcon(marker, heading);
    }

    return paramsToFlightIcon(marker, heading);
};

export function FlightMap() {
    const [tileLayer] = useState<CustomTileLayer>(stadiaMapsTileLayer);
    const {data} = useLiveAirplanesApi();
    const icao: string = useAppSelector((state) => state.aircraft.icao);
    const dispatch = useAppDispatch();

    const aircraftCollection: FeatureCollection = useMemo(() => makeAircraftCollection(data, icao), [data, icao]);

    const onMapClickHandler = useCallback(() => dispatch(resetIcao()), [dispatch]);

    const onMarkerClickHandler = useCallback(
        (evt: LeafletMouseEvent, feature: Feature): void => {
            dispatch(setIcao(feature.properties?.icao ?? ''));
            L.DomEvent.stopPropagation(evt);
        },
        [dispatch]
    );

    const degreeToRadians = (degree: number): number => (degree * Math.PI) / 180;

    const aircraftPointToLayer = (feature: Feature, latLng: LatLng) => {
        const props = feature.properties;
        return L.marker(latLng, {
            icon: paramsToIcon(props?.colorMarker, props?.marker, props?.heading),
            ...(props?.heading && {rotation: degreeToRadians(props.heading)})
        })
            .on('click', (evt: LeafletMouseEvent): void => onMarkerClickHandler(evt, feature))
            .bindTooltip(props?.desc, {permanent: false, direction: 'top', opacity: 0.75});
    };

    return (
        <MapContainer
            style={{height: '100%', width: '100%'}}
            center={DEFAULT_POSITION}
            zoom={9}
            scrollWheelZoom={true}
            doubleClickZoom={false}
        >
            <TileLayerSetter url={tileLayer.url} attribution={tileLayer.attribution} />
            <ShowGeoJsonObject geoJsonCollection={aircraftCollection} pointToLayer={aircraftPointToLayer} />
            <Marker position={DEFAULT_POSITION} />
            <MapClickHandler onMapClick={onMapClickHandler} />
        </MapContainer>
    );
}
