import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function AppFooter() {
    return (
        <AppBar
            position="sticky"
            sx={{
                bottom: 0,
                top: 'auto'
            }}
        >
            <Toolbar
                variant={'dense'}
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Typography noWrap>©2025 FlightRadar</Typography>
            </Toolbar>
        </AppBar>
    );
}
