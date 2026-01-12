import Box from "@mui/material/Box";

export function RadarView() {
    return (
        <Box
             sx={{
                 width: '100%',
                 height: '100%',
                 display: 'flex',
             }}
        >
            <Box
                sx={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <h3>Radars</h3>
            </Box>
            <Box
                sx={{
                    width: '50%',
                    height: '100%',
                    overflow: "hidden"
                }}
            >
            </Box>
        </Box>
    )
}