import {useMemo} from "react";
import {MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable,} from 'material-react-table';
import {getFlightTableColumns} from "./getFlightTableColumns.ts";
import type {Airplane} from "./model/Airplane.ts";
import {getFlightData} from "./getTestFlightData.ts";
import {useAirplanesLiveApi} from "../hooks/useAirplanesLiveApi.ts";

export function FlightTable() {

    const {data} = useAirplanesLiveApi();
    const flightData = useMemo<Airplane[]>(() => getFlightData(data), [data]);
    const columns = useMemo<MRT_ColumnDef<Airplane>[]>(
        () => getFlightTableColumns(), []
    );

    const table = useMaterialReactTable({
            columns,
            data: flightData,
            enableDensityToggle: false,
            initialState: {density: 'compact'},
            enableRowNumbers: true
        }
    );

    return (
        <MaterialReactTable table={table}/>
    )
}