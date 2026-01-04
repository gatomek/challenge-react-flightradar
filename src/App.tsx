import './App.css'
import Box from '@mui/material/Box';
import {AppToolbar} from "./components/AppToolbar.tsx";
import {FlightTable} from "./components/table/FlightTable.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {FlightMap} from "./components/map/FlightMap.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
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
                            Info
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
            </Box>
        </QueryClientProvider>
    )
}

export default App
