import Box from "@mui/material/Box";
import {MainContent} from "./MainContent.tsx";

export function RadarView() {
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
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <h3>Radars</h3>
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
                </Box>
            </Box>
        </MainContent>
    )
}