import {MapContainer, TileLayer} from "react-leaflet";
import type {LatLngTuple} from "leaflet";
import type {CustomTileLayer} from "./CustomTileLayer.ts";
import {stadiaMapsTileLayer} from "./tileLayers.ts";
import {useState} from "react";

const DEFAULT_POSITION: [number, number] = [20.142209, 51.961301]
const position: LatLngTuple = [DEFAULT_POSITION[1], DEFAULT_POSITION[0]];

function SetTileLayer(props: Readonly<CustomTileLayer>) {
    return (
        <TileLayer
            url={props.url}
            attribution={props.attribution}
            detectRetina={false}
        />
    );
}

export function FlightMap() {
    const [tileLayer] = useState<CustomTileLayer>(stadiaMapsTileLayer);

    return (
        <MapContainer
            style={{height: "100%", width: "100%"}}
            center={position}
            zoom={9}
            scrollWheelZoom={true}
        >
            <SetTileLayer url={tileLayer.url} attribution={tileLayer.attribution}/>
        </MapContainer>
    )
}
