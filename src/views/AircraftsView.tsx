import Box from '@mui/material/Box';
import {FlightTable} from "../components/table/FlightTable.tsx";
import {FlightMap} from "../components/map/FlightMap.tsx";
import {DetailsView} from "../components/details/DetailsView.tsx";
import {MainContent} from "./MainContent.tsx";

export function AircraftsView() {
    return (
        <MainContent>
            <Box margin={0} padding={0} mt={'70px'} maxWidth="xxl"
                 sx={{
                     width: '100%',
                     height: 'calc(100vh - 72px)',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center'
                 }}
            >
                <Box
                    sx={{
                        width: '50%',
                        height: '100%'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '560px'
                        }}
                    >
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
                        border: 'solid 1px lightgray',
                        overflow: "hidden"
                    }}
                >
                    <FlightMap/>
                </Box>
            </Box>
        </MainContent>
    )
}