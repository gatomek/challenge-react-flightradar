export interface Aircraft {
    hex: string;
    flight?: string;
    t: string;
    r?: string;
    desc?: string;
    lat: number;
    lon: number;
    alt_baro: number | string;

    mag_heading?: number;
    true_heading?: number;
    track?: number;

    dbFlags?: number;
    category?: string;
    gs?: number;
    mach?: number;
    squawk?: string;
    emergency?: string;
    nav_modes?: string[];
}
