import {MapContainer, TileLayer} from "react-leaflet";
import type {LatLngTuple} from "leaflet";
import type {CustomTileLayer} from "./CustomTileLayer.ts";
import {stadiaMapsTileLayer} from "./tileLayers.ts";
import {useState} from "react";
import {SetViewCommand} from "./SetViewCommand.tsx";

const skierniewice: number[] = [20.142209, 51.961301]
const position: LatLngTuple = [skierniewice[1], skierniewice[0]];

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
    const [marker] = useState<undefined | number[]>();

    return (
        <>
        <h5>Flight map</h5>
            <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={position}
                zoom={9}
                scrollWheelZoom={true}
            >
                <SetTileLayer url={tileLayer.url} attribution={tileLayer.attribution}/>
                {marker && <SetViewCommand marker={marker}/>}
            </MapContainer>
        </>
    )
}
