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

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';
import 'leaflet-rotate';

import flightSvg from '../../assets/flight.svg';
import groundSvg from '../../assets/ground.svg';
import towerSvg from '../../assets/tower.svg';

import selectedFlightSvg from '../../assets/flight.sel.svg';
import selectedGroundSvg from '../../assets/ground.sel.svg';
import selectedTowerSvg from '../../assets/tower.sel.svg';

const flightIcon = L.icon({
    iconUrl: flightSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

const selectedFlightIcon = L.icon({
    iconUrl: selectedFlightSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

const groundIcon = L.icon({
    iconUrl: groundSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

const selectedGroundIcon = L.icon({
    iconUrl: selectedGroundSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

const towerIcon = L.icon({
    iconUrl: towerSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

const selectedTowerIcon = L.icon({
    iconUrl: selectedTowerSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    shadowAnchor: [13, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [14, -21]
});

L.Marker.prototype.options.icon = DefaultIcon;

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

const paramsToIcon = (colorMarker: undefined | string, marker: undefined | boolean) => {
    if (colorMarker === 'TWR') {
        return marker ? selectedTowerIcon : towerIcon;
    }
    if (colorMarker === 'GND') {
        return marker ? selectedGroundIcon : groundIcon;
    }

    return marker ? selectedFlightIcon : flightIcon;
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
        return L.marker(latLng, {
            icon: paramsToIcon(feature.properties?.colorMarker, feature.properties?.marker),
            rotation: degreeToRadians(feature.properties?.heading)
        })
            .on('click', (evt: LeafletMouseEvent): void => onMarkerClickHandler(evt, feature))
            .bindTooltip(feature.properties?.desc, {permanent: false, direction: 'top', opacity: 0.75});
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
