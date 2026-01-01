import './App.css'
import Box from '@mui/material/Box';
import {AppToolbar} from "./components/AppToolbar.tsx";


function App() {
    return (
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
                     height: 'calc(100vh - 70px)',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     border: 'solid 1px lightgray'
                 }}
            >
                <Box
                    sx={{
                        width: '25%',
                        height: '100%',
                        border: 'solid 1px lightgray'
                    }}
                >

                </Box>
                <Box
                    sx={{
                        width: '75%',
                        height: '100%',
                        border: 'solid 1px lightgray'
                    }}
                >

                </Box>
            </Box>
        </Box>
    )
}

export default App
