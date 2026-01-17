import {useQuery} from "@tanstack/react-query";
import type {AircraftData} from "../components/query/model/AircraftData";

export function useLiveAirplanesApi() {

    const {data, isLoading, isFetching, isError, refetch} = useQuery({
        queryKey: ['api.airplanes.live'],
        queryFn: async (): Promise<AircraftData> => {
            const res = await fetch('https://api.airplanes.live/v2/point/52.162/20.960/250');
            if (!res.ok) {
                throw new Error(`Failed to fetch flight data: ${res.status} ${res.statusText}`);
            }
            const json = await res.json();
            return json as AircraftData;
        },
        refetchInterval: 15 * 1000,
        retry: false,
        refetchIntervalInBackground: true
    });

    return {
        data,
        isLoading,
        isFetching,
        isError,
        refetch
    }
}
