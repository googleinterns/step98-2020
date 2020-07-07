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
    
    /* Mimic Google Calendar's behavior: when user edits the newStartDate to be bigger than the current endDate,
    this function will automatically reset the endDate to be bigger than the newStartDate by the same duration as before editting.
    This behavior happends during editting, so the user can never submit an invalid time range.
    */
   const handleStartDateChange = (newStartDate) => {
        if (newStartDate >= endDate) {
            var newEndDate = new Date(newStartDate);
            newEndDate.setTime(newStartDate.getTime() + endDate.getTime() - startDate.getTime());
            setEndDate(newEndDate);
        }
        setStartDate(newStartDate);

    }
    
    /* Mimic Google Calendar's behavior: when user edits the newEndDate to be smaller than the current startDate,
    this function will automatically reset the startDate to be smaller than the newEndDate by the same duration as before editting.
    This behavior happends during editting, so the user can never submit an invalid time range. 
    */
    const handleEndDateChange = (newEndDate) => {
        if (startDate >= newEndDate) {
            var newStartDate = new Date(newEndDate);
            newStartDate.setTime(newEndDate.getTime() - endDate.getTime() + startDate.getTime());
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
    

    return (
        <Grid container direction="column">
            <Grid item container direction="row" justify="space-between">
                <TextField
                    error={(departureAirport === "")}
                    helperText={(departureAirport === "")? "Cannot leave field blank": ""}
                    id="departure"
                    label={"Departure IATA code"}
                    defaultValue={departureAirport}
                    onChange={handleDepartureAirport}
                />

                <TextField
                    error={(arrivalAirport === "")}
                    helperText={(arrivalAirport === "")? "Cannot leave field blank": ""}
                    id="arrival"
                    label={"Arrival IATA code"}
                    defaultValue={arrivalAirport}
                    onChange={handleArrivalAirport}
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
 
 
 

