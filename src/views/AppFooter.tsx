import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function AppFooter() {
    return (
        <AppBar
            color={"info"}
            position="sticky"
            sx={{
                bottom: 0,
                top: 'auto'
            }}
        >
            <Toolbar variant={"dense"}>
                <Typography
                    noWrap
                    sx={{
                        color: 'inherit',
                    }}
                >
                    ©2025 FlightRadar
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
