import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import keycloak from "./keycloak.ts";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {StrictMode} from "react";

createRoot(document.getElementById('root')!).render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
            onLoad: "login-required",
            checkLoginIframe: false
        }}
    >
        <StrictMode>
            <App/>
        </StrictMode>
    </ReactKeycloakProvider>
)
