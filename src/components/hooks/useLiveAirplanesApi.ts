import {useQuery} from "@tanstack/react-query";
import type {AircraftData} from "../query/model/AircraftData.ts";

export function useLiveAirplanesApi() {

    const {data} = useQuery({
        queryKey: ['airplanes.21.51.100'],
        queryFn: async (): Promise<AircraftData> => {
            const res = await fetch('https://api.airplanes.live/v2/point/51.00/21.00/100');
            if (!res.ok) {
                throw new Error(`Failed to fetch flight data: ${res.status} ${res.statusText}`);
            }
            const json = await res.json();
            return json as AircraftData;
        },
        refetchInterval: 15 * 1000
    });

    return {
        data
    }
}