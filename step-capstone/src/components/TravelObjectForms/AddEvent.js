import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    TextField,
    Grid,
    Checkbox,
    FormControlLabel,
    Box
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import LocationAutocompleteInput from "../Utilities/LocationAutocompleteInput"

export default function AddEvent(props) {
    let overwriting = props.data !== undefined;
    // Sets values to previous values if editing, otherwise blank slate
    const [startDate, setStartDate] = useState(overwriting ? props.data.startDate : props.startDate);
    const [endDate, setEndDate] = useState(overwriting ? props.data.endDate : props.startDate);
    const [checked, setChecked] = useState(overwriting ? props.data.finalized : false);
    const [title, setTitle] = useState(overwriting ? props.data.title : "");
    console.log(overwriting? props.data.location :"")
    console.log(overwriting? props.data.coordinates: "")
    const [location, setLocation] = useState(overwriting ? { address: props.data.location, coordinates: props.data.coordinates } : { address: null, coordinates: null });
    const [description, setDescription] = useState(overwriting ? props.data.description : "");

    const handleChecked = (e) => {
        setChecked(e.target.checked);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleLocationChange = (location) => {
        setLocation(location);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    useEffect(() => {
        if (props.data !== undefined && props.data.startDate !== startDate) {
            setStartDate(props.data.startDate);
        }

        if (props.data !== undefined && props.data.endDate !== endDate) {
            setEndDate(props.data.endDate);
        }
    }, [props.data]);

    /*
    * Called once change to hook state is complete. Updates data property in AddForm.
    */
    useEffect(() => {
        props.onDataChange({
            id: overwriting ? props.data.id : undefined,
            title: title,
            type: "event",
            startDate: startDate,
            endDate: endDate,
            finalized: checked,
            location: location.address,
            coordinates: location.coordinates,
            description: description
        })
        //validating input
        if (title === "") {
            props.onToggleValidation(false);
        } else if (checked && location === "") {
            props.onToggleValidation(false);
        } else {
            props.onToggleValidation(true);
        }
    }, [startDate, endDate, checked, title, location, description])

    return (
        <Grid container direction="column">
            <Grid item>
                <Box mt={1}>
                    <TextField
                        error={(title === "")}
                        helperText={(title === "") ? "Cannot leave field blank" : ""}
                        id="title"
                        label={"Add Title"}
                        defaultValue={title}
                        fullWidth
                        onChange={handleTitleChange}
                    />
                </Box>
            </Grid>
            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={handleChecked}
                            color="primary"
                        />
                    }
                    label="Finalized"
                />
            </Grid>
            <Grid item container direction="row" justify="space-between">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label={"Start"}
                        value={startDate}
                        onChange={setStartDate} />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label={"End"}
                        value={endDate}
                        onChange={setEndDate} />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
                <Box my={1}>
                    <LocationAutocompleteInput
                        onLocationSelected={handleLocationChange}
                        error={(checked && location.address === null)}
                        text={location.address}
                        type="event"
                    />
                </Box>
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




