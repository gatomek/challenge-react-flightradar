import './styles/globals.css';
import './styles/theme.css';
import './styles/index.css'

import {createRoot} from 'react-dom/client'
import keycloak from "./keycloak.ts";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {StrictMode} from "react";
import {createBrowserRouter} from "react-router";
import {RouterProvider} from "react-router/dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Provider} from 'react-redux'
import {store} from './app/store'
import {AircraftsView} from "./views/AircraftsView.tsx";
import {RadarView} from "./views/RadarView.tsx";
import {SettingsView} from "./views/SettingsView.tsx";
import {ProfileView} from "./views/ProfileView.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
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
]);

createRoot(document.getElementById('root')!).render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
            onLoad: "login-required",
            checkLoginIframe: false
        }}
        LoadingComponent={<></>}
    >
        <StrictMode>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router}/>
                </QueryClientProvider>
            </Provider>
        </StrictMode>
    </ReactKeycloakProvider>
)
