import type {Aircraft} from "../components/query/model/Aircraft.ts";

export const errata : Record<string, Partial<Aircraft>> = {
    '505FC2':{
        t: 'TWR',
        r: 'TWR'
    }
};
