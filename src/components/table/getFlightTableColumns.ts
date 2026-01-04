import type {MRT_ColumnDef} from "material-react-table";
import type {Airplane} from "./model/Airplane.ts";

export function getFlightTableColumns(): MRT_ColumnDef<Airplane>[] {
    return [
        {
            accessorFn: (row) => row.hex.toUpperCase(),
            header: 'ICAO',
            size: 50
        },
        {
            accessorKey: 'flight',
            header: 'Flight',
            size: 50
        },
        {
            accessorKey: 'registration',
            header: 'Register',
            size: 50
        },
        {
            accessorKey: 'type',
            header: 'Type',
            size: 50
        },
        {
            accessorKey: 'altitude',
            header: 'Altitude',
            size: 50
        },
        {
            accessorFn: (row: Airplane): "MIL" | undefined => row.military ? "MIL" : undefined,
            header: 'Info',
            size: 50
        },
    ]
}