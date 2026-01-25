import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function SettingsView() {
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
            <Stack>
                <Typography><Typography component="span" fontWeight="bold">Not Found behaviour:</Typography> Info | Redirection</Typography>
                <Typography><Typography component="span" fontWeight="bold">Units:</Typography> Imperial vs. Metrics</Typography>
                <Typography><Typography component="span" fontWeight="bold">Radar location:</Typography> Custom | Warsaw | Berlin | Paris</Typography>
                <Typography><Typography component="span" fontWeight="bold">Radar range:</Typography> 50 | 100 | 150 | 200 | 250</Typography>
                <Typography><Typography component="span" fontWeight="bold">UI Animation:</Typography> On | Off</Typography>
            </Stack>
        </Box>
    );
}
