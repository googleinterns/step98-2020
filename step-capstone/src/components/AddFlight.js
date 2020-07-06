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
import DateFnsUtils from '@date-io/date-fns';
export default function AddFlight(props) {
    let overwriting = props.data !== undefined;
    // Sets values to previous values if editing, otherwise blank slate
    const [startDate, setStartDate] = useState(overwriting ? props.data.startDate : props.startDate);
    const [endDate, setEndDate] = useState(overwriting ? props.data.endDate : props.startDate);
    const [checked, setChecked] = useState(overwriting ? props.data.finalized : false);
    const [departureAirport, setDepartureAirport] = useState(overwriting ? props.data.departureAirport : "");
    const [arrivalAirport, setArrivalAirport] = useState(overwriting ? props.data.arrivalAirport : "")
    const [description, setDescription] = useState(overwriting ? props.data.description : "");
    
    const handleChecked = (e) => {
        setChecked(e.target.checked);
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
    
    const handleStartDateChange = (newStartDate) => {
        if (newStartDate >= endDate) {
            var newEndDate = new Date(newStartDate);
            newEndDate.setTime(newStartDate.getTime() + 5*60000);
            setEndDate(newEndDate);
        }
        setStartDate(newStartDate);

    }
    const handleEndDateChange = (newEndDate) => {
        if (startDate >= newEndDate) {
            var newStartDate = new Date(newEndDate);
            newStartDate.setTime(newEndDate.getTime() - 5*60000);
            setStartDate(newStartDate);
        }
        setEndDate(newEndDate);
    }

    /*
    * Called once change to hook state is complete. Updates data property in AddForm.
    */
    useEffect(() => {
        
        props.onDataChange({
            finalized: checked,
            id: overwriting ? props.data.id : undefined,
            type: "flight",
            startDate: startDate,
            endDate: endDate,
            departureAirport: departureAirport,
            arrivalAirport: arrivalAirport,
            description: description
        })
        // notifies form if necessary inputs are present
        props.onToggleValidation(!(departureAirport === "" || arrivalAirport === ""))
    }, [startDate, endDate, checked, departureAirport, arrivalAirport, description])
    
    // Users must input departure and arrival airports --> renders error input if not
    let renderDepartureAirportField = () => {
        if (departureAirport === "") {
            return (
                <TextField
                    error
                    helperText="Cannot leave field blank"
                    id="departure"
                    label={"Departire IATA code"}
                    defaultValue={departureAirport}
                    onChange={handleDepartureAirport}
                />
            )
        } else {
            return (
                <TextField
                    id="departure"
                    label={"Departire IATA code"}
                    defaultValue={departureAirport}
                    onChange={handleDepartureAirport}
                />
            )
        }
    }
    
    // Users must input departure and arrival airports --> renders error input if not
    let renderArrivalAirportField = () => {
        if (arrivalAirport === "") {
            return (
                <TextField
                    error
                    helperText="Cannot leave field blank"
                    id="arrival"
                    label={"Arrival IATA code"}
                    defaultValue={arrivalAirport}
                    onChange={handleArrivalAirport}
                />
            )
        } else {
            return (
                <TextField
                    id="arrival"
                    label={"Arrival IATA code"}
                    defaultValue={arrivalAirport}
                    onChange={handleArrivalAirport}
                />
            )
        }
    }
    return (
        <Grid container direction="column">
            <Grid item container direction="row" justify="space-between">
                {renderDepartureAirportField()}
                {renderArrivalAirportField()}
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
                    <DateTimePicker label="Departure" value={startDate} onChange={handleStartDateChange} />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker label="Arrival" value={endDate} onChange={handleEndDateChange} />
                </MuiPickersUtilsProvider>
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
 
 
 

