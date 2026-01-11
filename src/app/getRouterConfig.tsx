import {AircraftsView} from "../views/AircraftsView";
import {RadarView} from "../views/RadarView";
import {SettingsView} from "../views/SettingsView";
import {ProfileView} from "../views/ProfileView";

const router = [
    {
        path: '/',
        element: <AircraftsView/>
    },
    {
        path: '/aircrafts',
        element: <AircraftsView/>
    },
    {
        path: '/radars',
        element: <RadarView/>
    },
    {
        path: '/settings',
        element: <SettingsView/>
    },
    {
        path: '/profile',
        element: <ProfileView/>
    }
];

export function getRouterConfig() {
    return router;
}
