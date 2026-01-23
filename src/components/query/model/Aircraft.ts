export interface Aircraft {
    hex: string;
    flight?: string;
    t: string;
    r?: string;
    desc?: string;
    lat: number;
    lon: number;
    alt_baro: number | string;
    heading?: number;
    dbFlags?: number;
}
