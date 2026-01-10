import * as React from "react";
import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RadarIcon from '@mui/icons-material/Radar';
import {useKeycloak} from '@react-keycloak/web';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const pages = ['Radar', 'Settings'];

export function AppToolbar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const {keycloak} = useKeycloak();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = (): void => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="fixed" sx={{height: '70px'}}>
            <Container disableGutters maxWidth={false}>
                <Toolbar>
                    <RadarIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FlightRadar
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: 'block', md: 'none'}}}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography sx={{textAlign: 'center'}}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <RadarIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>

                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 1,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FlightRadar
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        {keycloak.authenticated ?
                            <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Typography>
                                    {keycloak.tokenParsed?.preferred_username}</Typography>
                                <Tooltip title='Logout'>
                                    <IconButton sx={{m: 1}} onClick={() => keycloak.logout()}>
                                        <PowerSettingsNewIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            :
                            <Tooltip title='Login'>
                                <IconButton onClick={() => keycloak.login()}>
                                    <PersonIcon/>
                                </IconButton>
                            </Tooltip>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    )
}
