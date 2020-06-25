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
    let overwriting = props.data !== undefined;
    const [departureDate, handleStartChange] = useState(overwriting ? props.data.departureDate : new Date());
    const [arrivalDate, handleEndChange] = useState(overwriting ? props.data.arrivalDate : new Date());
    const [checked, setChecked] = useState(overwriting ? props.data.finalized : false);
    const [departureAirport, setDepartureAirport] = useState(overwriting ? props.data.departureAirport : "");
    const [arrivalAirport, setArrivalAirport] = useState(overwriting ? props.data.arrivalAirport : "")
    const [description, setDescription] = useState(overwriting ? props.data.description : "");

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
        props.onDataChange({
            finalized: checked,
            id: overwriting ? props.data.id : undefined,
            type: "flight",
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
                    label={departureAirport.length !== 0 ? departureAirport : "Add departure airport"}
                    onChange={handleDepartureAirport}
                />
                <TextField
                    id="arrival"
                    label={arrivalAirport.length !== 0 ? arrivalAirport : "Add arrival airport"}
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
                    label={description.length !== 0 ? description : "Add Description"}
                    fullWidth
                    multiline
                    onChange={handleDescriptionChange}
                />
            </Grid>
        </Grid>
    )
}

