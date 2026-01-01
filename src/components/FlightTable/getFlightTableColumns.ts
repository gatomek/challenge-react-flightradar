import type {MRT_ColumnDef} from "material-react-table";
import type {Airplane} from "./model/Airplane.ts";

export function getFlightTableColumns(): MRT_ColumnDef<Airplane>[] {
    return [
        {
            accessorKey: 'hex',
            header: 'ICAO',
            size: 50,
        },
        {
            accessorKey: 'flight',
            header: 'Flight',
            size: 50,
        },
        {
            accessorKey: 'type',
            header: 'Type',
            size: 50,
        },
        {
            accessorKey: 'desc',
            header: 'Desc',
            size: 50,
        },
        {
            accessorKey: 'latitude',
            header: 'Latitude',
            size: 50,
        },
        {
            accessorKey: 'longitude',
            header: 'Longitude',
            size: 50,
        },
        {
            accessorKey: 'altitude',
            header: 'Altitude',
            size: 50,
        }
    ]
}