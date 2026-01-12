import Box from '@mui/material/Box';
import {FlightTable} from "../components/table/FlightTable.tsx";
import {FlightMap} from "../components/map/FlightMap.tsx";
import {DetailsView} from "../components/details/DetailsView.tsx";

export function AircraftsView() {
    return (
        <Box
             sx={{
                 width: '100%',
                 height: '100%',
                 display: 'flex',
                 m: '0',
                 p: '0',
                 mt: '56px'
             }}
        >
            <Box
                sx={{
                    width: '50%',
                    height: '100%'
                }}
            >
                <Box height="560px" width="100%">
                    <FlightTable/>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: 'calc(100% - 560px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <DetailsView/>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '50%',
                    height: '100%',
                    overflow: "hidden"
                }}
            >
                <FlightMap/>
            </Box>
        </Box>
    )
}