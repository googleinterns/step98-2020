import React, { useEffect, useState } from "react"
import {
    Grid,
    Box,
    Slider,
    Typography
} from "@material-ui/core"
import moment from "moment"

export default function FoodTimeForm(props) {
    const [breakfastDuration, setBreakfastDuration] = useState(moment.duration(props.foodTimeRanges[0]).asMinutes());
    const [lunchDuration, setLunchDuration] = useState(moment.duration(props.foodTimeRanges[1]).asMinutes());
    const [dinnerDuration, setDinnerDuration] = useState(moment.duration(props.foodTimeRanges[2]).asMinutes());

    const handleBreakfastDurationChange = (event, mins) => {
        setBreakfastDuration(mins);
    }

    const handleLunchDurationChange = (event, mins) => {
        setLunchDuration(mins);
    }

    const handleDinnerDurationChange = (event, mins) => {
        setDinnerDuration(mins);
    }

    useEffect(() => {
        props.onChange([
            moment.duration(breakfastDuration, "minutes").asMilliseconds(),
            moment.duration(lunchDuration, "minutes").asMilliseconds(),
            moment.duration(dinnerDuration, "minutes").asMilliseconds(),
        ])
    }, [breakfastDuration, lunchDuration, dinnerDuration])

    const marks = [
        {
            value: 30,
            label: "30 min"
        },
        {
            value: 60,
            label: "60 min"
        },
        {
            value: 90,
            label: "90 min"
        },
        {
            value: 120,
            label: "120 min"
        }
    ]

    return (
        <Grid container direction="column">
            <Grid item>
                <Box mt={2}>
                    <Typography variant="subtitle2" gutterBottom>Enter a duration for each meal and we'll be sure to leave space in your schedule.</Typography>
                </Box>
            </Grid>
            <Grid item>
                <Box my={3} mr={3}>
                    <Typography id="discrete-slider-custom" gutterBottom>Breakfast Duration</Typography>
                    <Slider
                        value={breakfastDuration}
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={0}
                        max={120}
                        onChange={handleBreakfastDurationChange}
                    />
                </Box>
            </Grid>
            <Grid item>
                <Box my={1} mr={3}>
                    <Typography id="discrete-slider-custom" gutterBottom>Lunch Duration</Typography>
                    <Slider
                        value={lunchDuration}
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={0}
                        max={120}
                        onChange={handleLunchDurationChange}
                    />
                </Box>
            </Grid>
            <Grid item>
                <Box my={1} mr={3}>
                    <Typography id="discrete-slider-custom" gutterBottom>Dinner Duration</Typography>
                    <Slider
                        value={dinnerDuration}
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={0}
                        max={120}
                        onChange={handleDinnerDurationChange}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}