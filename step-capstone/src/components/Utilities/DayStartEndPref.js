import React, { useEffect, useState } from "react"
import { Grid, Box, Typography } from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker
} from "@material-ui/pickers"
import { endOfDay } from "date-fns";

export default function DayStartEndPref(props) {
    const [start, setStart] = useState(props.dayStartEndTimes[0]);
    const [end, setEnd] = useState(props.dayStartEndTimes[1]);

    const handleStartChange = (date) => {
        setStart(date);
    }

    const handleEndChange = (date) => {
        setEnd(date)
    }

    useEffect(() => {
        props.onChange([start, end])
    }, [start, end]);

    return (
        <Grid item container direction="row" justify="space-between">
            <Box mt={2}>
                <Typography variant="subtitle2" gutterBottom>Please enter your preferred start and end times for the day.</Typography>
            </Box>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                    margin="normal"
                    label="Start Time"
                    value={start}
                    onChange={handleStartChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
                <KeyboardTimePicker
                    margin="normal"
                    label="End Time"
                    value={end}
                    onChange={handleEndChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </MuiPickersUtilsProvider>
        </Grid>
    )
}