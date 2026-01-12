import './styles/index.css'

import {createRoot} from 'react-dom/client'
import keycloak from "./keycloak.ts";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {StrictMode} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Provider} from 'react-redux'
import {store} from './app/store'
import {routerConfig} from "./app/routerConfig.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter(routerConfig);

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
