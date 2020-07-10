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
                    <DateTimePicker label="Departure" value={startDate} onChange={setStartDate} />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker label="Arrival" value={endDate} onChange={setEndDate} />
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
 
 
 

