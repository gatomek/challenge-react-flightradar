import {MainContent} from '../views/MainContent';
import {AircraftsView} from '../views/AircraftsView';
import {SettingsView} from '../views/SettingsView';
import {ProfileView} from '../views/ProfileView';
import {Navigate} from 'react-router-dom';

export const routerConfig = [
    {
        path: '',
        element: <MainContent />,
        children: [
            {
                path: '/',
                element: <Navigate to="/aircrafts" replace />
            },
            {
                path: '/aircrafts',
                element: <AircraftsView />
            },
            {
                path: '/settings',
                element: <SettingsView />
            },
            {
                path: '/profile',
                element: <ProfileView />
            }
        ]
    }
];
