import {useQuery} from '@tanstack/react-query';
import type {AircraftData} from '../components/query/model/AircraftData';
import {errata} from '../data/errata.ts';
import type {Aircraft} from '../components/query/model/Aircraft.ts';

const normalizeAndApplyErrata = (data: AircraftData): AircraftData => {
    const corrected = data.ac.map((ac) => {
        const hex: string = ac.hex.toUpperCase();
        const correction: Partial<Aircraft> = errata[hex];
        return correction ? {...ac, hex, ...correction} : {...ac, hex};
    });

    return {total: data.total, ac: corrected};
};

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
        refetchInterval: 15_000,
        retry: 3,
        retryDelay: 5_000,
        refetchIntervalInBackground: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        select: (data: AircraftData): AircraftData => normalizeAndApplyErrata(data)
    });

    return {
        data,
        isLoading,
        isFetching,
        isError,
        refetch
    };
}
