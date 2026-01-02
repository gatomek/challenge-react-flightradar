import './App.css'
import Box from '@mui/material/Box';
import {AppToolbar} from "./components/AppToolbar.tsx";
import {FlightTable} from "./components/FlightTable/FlightTable.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

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
                         alignItems: 'center',
                         border: 'solid 1px lightgray'
                     }}
                >
                    <Box
                        sx={{
                            width: '50%',
                            height: '100%',
                            border: 'solid 1px lightgray'
                        }}
                    >
                        <FlightTable/>
                    </Box>
                    <Box
                        sx={{
                            width: '50%',
                            height: '100%',
                            border: 'solid 1px lightgray'
                        }}
                    >

                    </Box>
                </Box>
            </Box>
        </QueryClientProvider>
    )
}

export default App
