import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Button, Container, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import Divider from '@mui/material/Divider';
import {useAppDispatch, useAppSelector} from '../hooks/hooks.ts';
import {setRange} from '../app/radar-slice.ts';
import {useQueryClient} from '@tanstack/react-query';

interface FormInputs {
    radar: string;
}

export function SettingsView() {
    const location: string = useAppSelector((state) => state.radar.location);
    const dispatch = useAppDispatch();
    const {handleSubmit, control} = useForm<FormInputs>();
    const queryClient = useQueryClient();

    const onSubmit = (data: FormInputs) => {
        dispatch(setRange(data.radar));
        queryClient.invalidateQueries({queryKey: ['liveAirplanesLogs']});
    };

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
                <form>
                    <FormControl fullWidth onSubmit={handleSubmit(onSubmit)}>
                        <InputLabel id="radar-label">Radar</InputLabel>
                        <Controller
                            control={control}
                            name="radar"
                            defaultValue={location}
                            render={({field}) => (
                                <Select {...field} labelId="radar-label" label="Radar">
                                    <MenuItem value="warsaw">Warsaw</MenuItem>
                                    <MenuItem value="europe">Europe</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                    <Container style={{textAlign: 'end'}}>
                        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                    </Container>
                </form>
                <Divider orientation="horizontal" />
                <Box style={{margin: '20px'}}>
                    <Typography>
                        <Typography component="span" fontWeight="bold">
                            Not Found behaviour:
                        </Typography>{' '}
                        Info | Redirection
                    </Typography>
                    <Typography>
                        <Typography component="span" fontWeight="bold">
                            Units:
                        </Typography>{' '}
                        Imperial vs. Metrics
                    </Typography>
                    <Typography>
                        <Typography component="span" fontWeight="bold">
                            Radar range:
                        </Typography>{' '}
                        50 | 100 | 150 | 200 | 250
                    </Typography>
                    <Typography>
                        <Typography component="span" fontWeight="bold">
                            UI Animation:
                        </Typography>{' '}
                        On | Off
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
}
