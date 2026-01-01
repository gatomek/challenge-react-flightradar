import {useMemo} from "react";
import {MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable,} from 'material-react-table';
import {getFlightTableRows} from "./getFlightTableRows.ts";

type Airplane = {
    hex?: string;
    flight?: string;
    type?: string;
    desc?: string;
    latitude?: string;
    longitude?: string;
    heading?: string;
    altitude?: string;
}

const data: Airplane[] = [
    {
        hex: "4baa90",
        flight: "THY6YX",
        type: "A321",
        desc: "AIRBUS A-321",
        latitude: "51.302719",
        longitude: "18.760269",
        heading: "152.12",
        altitude: "35050"
    }
]

export function FlightTable() {

    const columns = useMemo<MRT_ColumnDef<Airplane>[]>(
        () => getFlightTableRows(), []
    );

    const table = useMaterialReactTable({
            columns,
            data
        }
    );

    return (
        <MaterialReactTable table={table}/>
    )
}