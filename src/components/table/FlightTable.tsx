import {useMemo} from "react";
import {MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable,} from 'material-react-table';
import {getFlightTableColumns} from "./getFlightTableColumns.ts";
import type {Airplane} from "./model/Airplane.ts";
import {makeFlightData} from "./getTestFlightData.ts";
import {useLiveAirplanesApi} from "../../hooks/useLiveAirplanesApi.ts";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from "@mui/material/IconButton";

export function FlightTable() {
    const {data, isLoading, isFetching, refetch} = useLiveAirplanesApi();
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
            positionToolbarAlertBanner: "none",
            enablePagination: false,
            enableRowVirtualization: true,
            muiTableContainerProps: {sx: {height: '500px'}},
            rowVirtualizerOptions: {overscan: 5},
            renderTopToolbarCustomActions: () => (
                <Tooltip title="Refresh Data">
                    <IconButton onClick={() => refetch()}>
                        <RefreshIcon/>
                    </IconButton>
                </Tooltip>
            ),
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
