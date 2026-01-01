import {useMemo} from "react";
import {MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable,} from 'material-react-table';
import {getFlightTableColumns} from "./getFlightTableColumns.ts";
import type {Airplane} from "./model/Airplane.ts";
import {getFlightData} from "./getTestFlightData.ts";
import {useQuery, } from "@tanstack/react-query";
import type {AircraftData} from "../Query/model/AircraftData.ts";

export function FlightTable() {

    const {data} = useQuery({
                queryKey: ['airplanes.21.51.100'],
                queryFn: (): Promise<AircraftData> =>
                    fetch('https://api.airplanes.live/v2/point/51.00/21.00/100')
                        .then((res) => {
                                return res.json() as unknown as AircraftData;
                            }
                        )
            }
        )
    ;

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