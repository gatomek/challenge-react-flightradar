import {useKeycloak} from "@react-keycloak/web";
import type {ReactNode} from "react";

type SecurityGateProps = {
    children: ReactNode;
};

export function SecurityGate(props: Readonly<SecurityGateProps>) {
    const {keycloak} = useKeycloak();

    const isLoggedIn: boolean = keycloak.authenticated;

    return isLoggedIn ? props.children : <></>;
}
