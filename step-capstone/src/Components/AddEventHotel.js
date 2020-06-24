import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    TextField,
    Grid,
    Checkbox
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

export default function AddEventHotel(props) {
    const [startDate, handleStartChange] = useState(new Date());
    const [endDate, handleEndChange] = useState(new Date());
    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const handleChecked = (e) => {
        setChecked(e.target.checked);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    /*
     * Called once change to hook state is complete. Updates data property in AddForm.
     */
    useEffect(() => {
        props.onDataChange({
            title: title,
            startDate: startDate,
            endDate: endDate,
            finalized: checked,
            location: location,
            description: description
        })
    }, [startDate, endDate, checked, title, location, description])

    return (
        <Grid container direction="column">
            <Grid item>
                <TextField id="title" label="Add Title" fullWidth onChange={handleTitleChange} />
            </Grid>
            <Grid item>
                <Checkbox
                    checked={checked}
                    onChange={handleChecked}
                />
            </Grid>
            <Grid item container direction="row" justify="space-between">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={startDate} onChange={handleStartChange} />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={endDate} onChange={handleEndChange} />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
                <TextField
                    id="location"
                    label="Add Location"
                    fullWidth onChange={handleLocationChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="description"
                    label="Add Description"
                    fullWidth
                    multiline
                    onChange={handleDescriptionChange}
                />
            </Grid>
        </Grid>
    )
}
