import React, { useEffect } from "react";
import { useState } from "react";
import {
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  Box,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import LocationAutocompleteInput from "../Utilities/LocationAutocompleteInput";
import { isValid, hasTimeConflict } from "../../scripts/HelperFunctions";

export default function AddFlight(props) {
  let overwriting = props.data !== undefined;
  // Sets values to previous values if editing, otherwise blank slate
  const [startDate, setStartDate] = useState(
    overwriting ? props.data.startDate : props.startDate
  );
  const [endDate, setEndDate] = useState(
    overwriting ? props.data.endDate : props.startDate
  );
  const [checked, setChecked] = useState(
    overwriting ? props.data.finalized : false
  );
  const [departureAirport, setDepartureAirport] = useState(
    overwriting
      ? {
        address: props.data.departureAirport,
        coordinates: props.data.departureCoordinates,
        placeId: props.data.departurePlaceId,
      }
      : {
        address: "",
        coordinates:"",
        placeId: ""
      }
  );
  const [arrivalAirport, setArrivalAirport] = useState(
    overwriting
      ? {
        address: props.data.arrivalAirport,
        coordinates: props.data.arrivalCoordinates,
        placeId: props.data.arrivalPlaceId,
      }
      : null
  );
  const [description, setDescription] = useState(
    overwriting ? props.data.description : ""
  );

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };
  const handleDepartureAirport = (location) => {
    setDepartureAirport(location);
  };
  const handleArrivalAirport = (location) => {
    setArrivalAirport(location);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

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
      departureAirport: departureAirport ? departureAirport.address : null,
      arrivalAirport: arrivalAirport ? arrivalAirport.address : null,
      departureCoordinates: departureAirport
        ? departureAirport.coordinates
        : null,
      arrivalCoordinates: arrivalAirport ? arrivalAirport.coordinates : null,
      departurePlaceId: departureAirport ? departureAirport.placeId : null,
      arrivalPlaceId: arrivalAirport ? arrivalAirport.placeId : null,
      description: description,
    });
    // notifies form if necessary inputs are present
    props.onToggleValidation(
      !(
        (departureAirport === null || departureAirport.address === "") ||
        (arrivalAirport === null || arrivalAirport.addresss === "") ||
        !isValid(startDate) ||
        !isValid(endDate) ||
        (checked && hasTimeConflict(props.data.id, startDate, endDate, props.travelObjects))
      )
    );
  }, [
    startDate,
    endDate,
    checked,
    departureAirport,
    arrivalAirport,
    description,
  ]);

  return (
    <Grid container direction="column">
      <Grid item container direction="column" justify="space-between">
        <Box my={1}>
          <LocationAutocompleteInput
            onLocationSelected={handleDepartureAirport}
            error={departureAirport === null || departureAirport.address === ""}
            text={departureAirport ? departureAirport.address : ""}
            type="flight"
            departure={true}
          />
        </Box>
        <Box my={1}>
          <LocationAutocompleteInput
            onLocationSelected={handleArrivalAirport}
            error={arrivalAirport === null || arrivalAirport.address === ""}
            text={arrivalAirport ? arrivalAirport.address : ""}
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
          <KeyboardDateTimePicker
            format="yyyy/MM/dd HH:mm"
            label="Departure"
            value={startDate}
            onChange={setStartDate}
            error={checked && hasTimeConflict(props.data.id, startDate, endDate, props.travelObjects)}
            helperText={checked && hasTimeConflict(props.data.id, startDate, endDate, props.travelObjects) ? "You already have something scheduled for that time" : ""}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            format="yyyy/MM/dd HH:mm"
            label="Arrival"
            value={endDate}
            onChange={setEndDate}
            error={checked && hasTimeConflict(props.data.id, startDate, endDate, props.travelObjects)}
            helperText={checked && hasTimeConflict(props.data.id, startDate, endDate, props.travelObjects) ? "You already have something scheduled for that time" : ""}
          />
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
  );
}
