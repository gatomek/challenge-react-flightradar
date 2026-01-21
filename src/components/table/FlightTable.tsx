import {useMemo} from 'react';
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import {getFlightTableColumns} from './getFlightTableColumns.ts';
import type {Airplane} from './model/Airplane.ts';
import {makeFlightData} from './getFlightData.ts';
import {useLiveAirplanesApi} from '../../hooks/useLiveAirplanesApi.ts';
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks.ts';
import {setIcao} from '../../app/aircraft-slice.ts';
import {ThemeProvider} from '@mui/material/styles';
import {getFlightTableTheme} from './getFlightTableTheme.ts';

const flightTableTheme = getFlightTableTheme();
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
        enableBottomToolbar: false,
        enableGlobalFilterModes: true,
        enablePagination: false,
        positionToolbarAlertBanner: 'none',
        enableRowVirtualization: true,
        muiTableContainerProps: {sx: {height: '500px'}},
        rowVirtualizerOptions: {overscan: 5},
        renderTopToolbarCustomActions: () => (
            <Tooltip title="Refresh Data">
                <IconButton onClick={() => refetch()}>
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
        ),
        muiTableBodyRowProps: ({row}) => ({
            onClick: () => dispatch(setIcao(row.original.hex)),
            sx: {
                cursor: 'pointer',
                backgroundColor: row.original.selected ? 'lemonchiffon' : 'inherit'
            }
        }),
        state: {
            isLoading,
            showProgressBars: isFetching
        }
    });

    return (
        <ThemeProvider theme={flightTableTheme}>
            <MaterialReactTable table={table} />
        </ThemeProvider>
    );
}
