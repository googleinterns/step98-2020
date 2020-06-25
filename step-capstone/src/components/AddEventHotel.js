import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    TextField,
    Grid,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

export default function AddEventHotel(props) {
    let overwriting = props.data !== undefined;

    const [startDate, handleStartChange] = useState(overwriting ? props.data.startDate : new Date());
    const [endDate, handleEndChange] = useState(overwriting ? props.data.endDate : new Date());
    const [checked, setChecked] = useState(overwriting ? props.data.finalized : false);
    const [title, setTitle] = useState(overwriting ? props.data.title : "");
    const [location, setLocation] = useState(overwriting ? props.data.location : "");
    const [description, setDescription] = useState(overwriting ? props.data.description : "");

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
        console.log(title)
        props.onDataChange({
            id: overwriting ? props.data.id : undefined,
            title: title,
            type: props.type,
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
                <TextField
                    id="title"
                    label={"Add Title"}
                    defaultValue={title}
                    fullWidth
                    onChange={handleTitleChange}
                />
            </Grid>
            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={handleChecked}
                        />
                    }
                    label="Finalized"
                />
            </Grid>
            <Grid item container direction="row" justify="space-between">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label={props.type === "event" ? "Start" : "Check in"}
                        value={startDate}
                        onChange={handleStartChange} />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label={props.type === "event" ? "End" : "Check out"}
                        value={endDate}
                        onChange={handleEndChange} />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
                <TextField
                    id="location"
                    label={location.length !== 0 ? location : "Add Location"}
                    fullWidth
                    onChange={handleLocationChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="description"
                    label={"Add Description"}
                    defaultValue={description}
                    fullWidth
                    multiline
                    onChange={handleDescriptionChange}
                />
            </Grid>
        </Grid>
    )
}
