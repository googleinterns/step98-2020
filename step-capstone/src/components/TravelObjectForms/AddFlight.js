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
import DateFnsUtils from '@date-io/date-fns';
import LocationAutocompleteInput from "../Utilities/LocationAutocompleteInput"

export default function AddFlight(props) {
    let overwriting = props.data !== undefined;
    // Sets values to previous values if editing, otherwise blank slate
    const [startDate, setStartDate] = useState(overwriting ? props.data.startDate : props.startDate);
    const [endDate, setEndDate] = useState(overwriting ? props.data.endDate : props.startDate);
    const [checked, setChecked] = useState(overwriting ? props.data.finalized : false);
    const [departureAirport, setDepartureAirport] = useState(overwriting ? { address: props.data.departureAirport, coordinates: props.data.departureCoordinates } : { address: null, coordinates: null });
    const [arrivalAirport, setArrivalAirport] = useState(overwriting ? { address: props.data.arrivalAirport, coordinates: props.data.arrivalCoordinates } : { address: null, coordinates: null });
    const [description, setDescription] = useState(overwriting ? props.data.description : "");

    const handleChecked = (e) => {
        setChecked(e.target.checked);
    }
    const handleDepartureAirport = (location) => {
        setDepartureAirport(location);
    }
    const handleArrivalAirport = (location) => {
        setArrivalAirport(location);
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
            departureAirport: departureAirport.address,
            arrivalAirport: arrivalAirport.address,
            departureCoordinates: departureAirport.coordinates,
            arrivalCoordinates: arrivalAirport.coordinates,
            description: description
        })
        // notifies form if necessary inputs are present
        props.onToggleValidation(!(departureAirport === "" || arrivalAirport === ""))
    }, [startDate, endDate, checked, departureAirport, arrivalAirport, description])

    return (
        <Grid container direction="column">
            <Grid item container direction="column" justify="space-between">
                <Box my={1}>
                    <LocationAutocompleteInput
                        onLocationSelected={handleDepartureAirport}
                        error={departureAirport.address === null}
                        text={departureAirport.address}
                        type="flight"
                        departure={true}
                    />
                </Box>
                <Box my={1}>
                    <LocationAutocompleteInput
                        onLocationSelected={handleArrivalAirport}
                        error={arrivalAirport.address === null}
                        text={arrivalAirport.address}
                        type="flight"
                        departure={false}
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
                    <DateTimePicker label="Departure" value={startDate} onChange={setStartDate} />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker label="Arrival" value={endDate} onChange={setEndDate} />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
                <Box my={1}>
                    <TextField
                        id="description"
                        label={"Add Description"}
                        defaultValue={description}
                        fullWidth
                        multiline
                        onChange={handleDescriptionChange}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}




