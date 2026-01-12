import Box from '@mui/material/Box';
import {AppToolbar} from "./AppToolbar.tsx";
import {Outlet} from "react-router-dom";

export function MainContent() {
    return (
        <Box margin={0} padding={0}
             sx={{
                 width: '100%',
                 height: '100vh',
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center'
             }}
        >
            <AppToolbar/>
            <Outlet />
        </Box>
    )
}
