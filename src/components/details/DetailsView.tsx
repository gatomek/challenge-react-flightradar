import {useAppSelector} from "../../hooks/hooks.ts";

export function DetailsView() {

    const icao: string = useAppSelector((state) => state.aircraft.icao);

    return (
        <h3>Info {icao}</h3>
    )
}
