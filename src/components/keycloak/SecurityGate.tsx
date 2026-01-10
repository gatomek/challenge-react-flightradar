import {useKeycloak} from "@react-keycloak/web";
import type {ReactNode} from "react";

type SecurityGateProps = {
    children: ReactNode;
};

export function SecurityGate(props: Readonly<SecurityGateProps>) {
    const {keycloak} = useKeycloak();

    return keycloak.authenticated ? props.children : <></>;
}
