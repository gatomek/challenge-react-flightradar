import Box from '@mui/material/Box';
import {Stack} from '@mui/material';
import {Link, useLocation} from 'react-router';

export function FileNotFoundView() {
    const location = useLocation();

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Stack
                direction={'column'}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <h3>Path Not Found</h3>
                <div>{location.pathname}</div>
                <Box
                    sx={{
                        padding: '1rem'
                    }}
                >
                    Go <Link to={'/'}>Home</Link>
                </Box>
            </Stack>
        </Box>
    );
}
