import {useMemo} from "react";
import {MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable,} from 'material-react-table';
import {getFlightTableRows} from "./getFlightTableRows.ts";
import type {Airplane} from "./model/Airplane.ts";
import {getFlightData} from "./getFlightData.ts";


export function FlightTable() {

    const data = useMemo<Airplane[]>(() => getFlightData(), []);

    const columns = useMemo<MRT_ColumnDef<Airplane>[]>(
        () => getFlightTableRows(), []
    );

    const table = useMaterialReactTable({
            columns,
            data,
            enableDensityToggle: false,
            initialState: {density: 'compact'},
            enableRowNumbers: true
        }
    );

    return (
        <MaterialReactTable table={table}/>
    )
}