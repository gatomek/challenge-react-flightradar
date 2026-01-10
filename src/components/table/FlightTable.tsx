import {useMemo} from "react";
import {MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable,} from 'material-react-table';
import {getFlightTableColumns} from "./getFlightTableColumns.ts";
import type {Airplane} from "./model/Airplane.ts";
import {makeFlightData} from "./getTestFlightData.ts";
import {useLiveAirplanesApi} from "../../hooks/useLiveAirplanesApi.ts";

export function FlightTable() {
    const {data, isLoading,isFetching} = useLiveAirplanesApi();
    const flightData = useMemo<Airplane[]>(() => makeFlightData(data), [data]);
    const columns = useMemo<MRT_ColumnDef<Airplane>[]>(
        () => getFlightTableColumns(), []
    );

    const table = useMaterialReactTable({
            columns,
            data: flightData,
            enableDensityToggle: false,
            initialState: {density: 'compact'},
            enableRowNumbers: true,
            enableRowSelection: false,
            enableBottomToolbar: false,
            enableGlobalFilterModes: true,
            enablePagination: false,
            enableRowVirtualization: true,
            muiTableContainerProps: {sx: {height: '500px'}},
            rowVirtualizerOptions: {overscan: 1},
            state: {
                isLoading,
                showProgressBars: isFetching,
            }
        }
    );

    return (
        <MaterialReactTable table={table}/>
    )
}
