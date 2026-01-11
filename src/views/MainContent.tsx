import Box from '@mui/material/Box';
import {AppToolbar} from "./AppToolbar.tsx";

export type MainContentProps = {
    children: React.ReactNode;
}

export function MainContent( props: Readonly<MainContentProps>) {
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
            {
                props.children
            }
        </Box>
    )
}
