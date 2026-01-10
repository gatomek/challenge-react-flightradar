import {useMemo} from "react";
import {getMRT_RowSelectionHandler, MaterialReactTable, useMaterialReactTable,} from 'material-react-table';
import {getFlightTableColumns} from "./getFlightTableColumns.ts";
import type {Airplane} from "./model/Airplane.ts";
import {makeFlightData} from "./getTestFlightData.ts";
import {useLiveAirplanesApi} from "../../hooks/useLiveAirplanesApi.ts";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from "@mui/material/IconButton";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks.ts";
import {setIcao} from "../../features/aircraft-slice.ts";

const flightTableColumns = getFlightTableColumns();


export function FlightTable() {
    const {data, isLoading, isFetching, refetch} = useLiveAirplanesApi();
    const dispatch = useAppDispatch();
    const icao: string = useAppSelector((state) => state.aircraft.icao);
    const flightData = useMemo<Airplane[]>(() => makeFlightData(data, icao), [data, icao]);

    const table = useMaterialReactTable({
            columns: flightTableColumns,
            data: flightData,
            enableDensityToggle: false,
            initialState: {density: 'compact'},
            enableRowNumbers: true,
            enableRowSelection: false,
            enableBatchRowSelection: false,
            enableBottomToolbar: false,
            enableGlobalFilterModes: true,
            enablePagination: false,
            enableSelectAll: false,
            positionToolbarAlertBanner: "none",
            enableMultiRowSelection: false,
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
            muiTableBodyRowProps: ({row, staticRowIndex, table}) => ({
                onClick: (event) => {
                    dispatch(setIcao(row.original.hex));
                    getMRT_RowSelectionHandler({row, staticRowIndex, table})(event)
                },
                sx: {
                    cursor: 'pointer',
                    backgroundColor: row.original.selected ? 'lemonchiffon' : 'inherit'
                }
            }),
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
