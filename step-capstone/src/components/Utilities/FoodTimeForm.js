import React, { useEffect, useState } from "react"
import {
    Grid,
    Box,
    TextField,
    InputAdornment,
    Input,
    FormControl,
    FormHelperText,
    Slider,
    Typography
} from "@material-ui/core"
const MILLISECONDS_PER_MIN = 60000;

export default function FoodTimeForm(props) {
    const [breakfastDuration, setBreakfastDuration] = useState(props.foodTimeRanges[0] / MILLISECONDS_PER_MIN);
    const [lunchDuration, setLunchDuration] = useState(props.foodTimeRanges[1] / MILLISECONDS_PER_MIN);
    const [dinnerDuration, setDinnerDuration] = useState(props.foodTimeRanges[2] / MILLISECONDS_PER_MIN);

    const handleBreakfastDurationChange = (event, hours) => {
        setBreakfastDuration(hours);
    }

    const handleLunchDurationChange = (event, hours) => {
        setLunchDuration(hours);
    }

    const handleDinnerDurationChange = (event, hours) => {
        setDinnerDuration(hours);
    }

    useEffect(() => {
        props.onChange({
            foodTimeRanges: [
                breakfastDuration * MILLISECONDS_PER_MIN, 
                lunchDuration * MILLISECONDS_PER_MIN,
                dinnerDuration * MILLISECONDS_PER_MIN
            ]
        })
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
                <Box my={3} mr={3}>
                    <Typography id="discrete-slider-custom" gutterBottom>Breakfast Duration</Typography>
                    <Slider
                        value={breakfastDuration}
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={20}
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
                        min={20}
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
                        min={20}
                        max={120}
                        onChange={handleDinnerDurationChange}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}