import {useMap} from "react-leaflet";
import {useEffect} from "react";

export type SetViewProps = {
    marker: [number,number,number?];
}

export function SetViewCommand(props: Readonly<SetViewProps>): null {
    const map = useMap();

    useEffect(() => {
        map.setView([props.marker[1], props.marker[0]]);
    }, [props.marker, map]);

    return null;
}