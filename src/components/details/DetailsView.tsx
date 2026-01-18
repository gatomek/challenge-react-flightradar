import {useAppSelector} from "../../hooks/hooks.ts";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";

export function DetailsView() {

    const icao: string = useAppSelector((state): string => state.aircraft.icao);
    const [image, setImage] = useState<undefined | string>();

    useEffect(() => {
        if (icao === '') {
            setImage(undefined);
            return;
        }

        let cancel: boolean = false;

        fetch('https://api.planespotters.net/pub/photos/hex/' + icao)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch flight photos: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then(res => {
                if (cancel) {
                    return;
                }

                const photos = res.photos;
                if (Array.isArray(photos) && photos.length > 0)
                    setImage(res.photos?.[0].thumbnail_large?.src);
                else
                    setImage(undefined);
            })
            .catch(error => {
                if (cancel) {
                    return;
                }
                console.error('Failed to load aircraft image:', error);
                setImage(undefined);
            });

        return () => {
            cancel = true;
        }
    }, [icao])

    return (
        <Stack direction={"row"} gap={'1rem'} sx={{width: '100%', height: '100%', justifyContent: 'space-between'}}>
            <Box
                sx={{
                    width: '25%',
                    m: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {icao && <Typography variant={"h6"}>ICAO {icao}</Typography>}
            </Box>
            <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: '1rem',
                borderLeft: 'solid 1px lightgray',
                width: '75%'
            }}>
                {image &&
                    <img src={image}
                         alt={`Aircraft with ICAO code {icao}`}
                         style={{
                             objectFit: 'contain',
                             maxWidth: '100%',
                             height: 'auto'
                         }}
                    />
                }
            </Stack>
        </Stack>
    )
}
