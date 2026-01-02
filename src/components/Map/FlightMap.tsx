import {MapContainer, TileLayer} from "react-leaflet";
import type {LatLngTuple} from "leaflet";
import type {CustomTileLayer} from "./CustomTileLayer.ts";
import {stadiaMapsTileLayer} from "./tileLayers.ts";
import {useState} from "react";
import {SetViewCommand} from "./SetViewCommand.tsx";

const DEFAULT_POSITION: [number, number] = [51.961301, 20.142209]
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
    const [marker] = useState<[number, number, number?]>(position);

    return (
        <MapContainer
            style={{height: "100%", width: "100%"}}
            center={position}
            zoom={9}
            scrollWheelZoom={true}
        >
            <SetTileLayer url={tileLayer.url} attribution={tileLayer.attribution}/>
            <SetViewCommand marker={marker}/>
        </MapContainer>
    )
}
