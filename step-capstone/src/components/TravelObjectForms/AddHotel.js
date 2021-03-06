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
import { isValid, AutoCapitalize, sameDate } from "../../scripts/HelperFunctions";

export default function AddHotel(props) {
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
  const [title, setTitle] = useState(overwriting ? props.data.title : "");
  const [location, setLocation] = useState(
    overwriting
      ? {
        address: props.data.location,
        coordinates: props.data.coordinates,
        placeId: props.data.placeId,
      }
      : {
        address: "",
        coordinates: "",
        placeId: "",
      }
  );

  const [description, setDescription] = useState(
    overwriting ? props.data.description : ""
  );

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLocationChange = (location) => {
    setLocation(location);
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
      id: overwriting ? props.data.id : undefined,
      title: AutoCapitalize(title),
      type: "hotel",
      startDate: startDate,
      endDate: endDate,
      finalized: checked,
      location: location ? location.address : "",
      coordinates: location ? location.coordinates : "",
      description: description,
    });
    //validating input
    if (title === "") {
      props.onToggleValidation(false);
    } else if (checked && (location===null||location.address===""||location.address === null)) {
      props.onToggleValidation(false);
    } else if (!isValid(startDate) || !isValid(endDate) || sameDate(startDate, endDate)) {
      props.onToggleValidation(false);
    } else {
      props.onToggleValidation(true);
    }
  }, [startDate, endDate, checked, title, location, description]);

  return (
    <Grid container direction="column">
      <Grid item>
        <TextField
          error={title === ""}
          helperText={title === "" ? "Cannot leave field blank" : ""}
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
            label={"Check in"}
            value={startDate}
            onChange={setStartDate}
            error={!isValid(startDate) || !isValid(endDate) || sameDate(startDate, endDate)}
            helperText={!isValid(startDate) || !isValid(endDate) || sameDate(startDate, endDate) ? "Check in and checkout dates cannot be the same." : ""}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            format="yyyy/MM/dd HH:mm"
            label={"Check out"}
            value={endDate}
            onChange={setEndDate}
            error={!isValid(startDate) || !isValid(endDate) || sameDate(startDate, endDate)}
            helperText={!isValid(startDate) || !isValid(endDate) || sameDate(startDate, endDate) ? "Check in and checkout dates cannot be the same." : ""}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item>
        <Box my={1}>
          <LocationAutocompleteInput
            onLocationSelected={handleLocationChange}
            error={checked && (location === null || location.address === "" || location.address === null)}
            text={location ? location.address : ""}
            type="hotel"
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
  );
}
