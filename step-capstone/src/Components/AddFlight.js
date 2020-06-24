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

export default function AddFlight(props) {
    const [departureDate, handleStartChange] = useState(new Date());
    const [arrivalDate, handleEndChange] = useState(new Date());
    const [checked, setChecked] = useState(false);
    const [departureAirport, setDepartureAirport] = useState("");
    const [arrivalAirport, setArrivalAirport] = useState("")
    const [description, setDescription] = useState("");

    const handleChecked = (event) => {
        setChecked(event.target.checked);
    }

    const handleDepartureAirport = (e) => {
        setDepartureAirport(e.target.value);
    }

    const handleArrivalAirport = (e) => {
        setArrivalAirport(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    /*
     * Called once change to hook state is complete. Updates data property in AddForm.
     */
    useEffect(() => {
        console.log("changing data");
        props.onDataChange({
            finalized: checked,
            departureDate: departureDate,
            arrivalDate: arrivalDate,
            departureAirport: departureAirport,
            arrivalAirport: arrivalAirport,
            description: description
        })
    }, [departureDate, arrivalDate, checked, departureAirport, arrivalAirport, description])

    return (
        <Grid container direction="column">
            <Grid item container direction="row">
                <TextField
                    id="departure"
                    label="Add departure airport"
                    onChange={handleDepartureAirport}
                />
                <TextField
                    id="arrival"
                    label="Add arrival airport"
                    onChange={handleArrivalAirport}
                />
            </Grid>
            <Grid item>
                <Checkbox
                    checked={checked}
                    onChange={handleChecked}
                />
            </Grid>
            <Grid item container direction="row" justify="space-between">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={departureDate} onChange={handleStartChange} />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={arrivalDate} onChange={handleEndChange} />
                </MuiPickersUtilsProvider>
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

