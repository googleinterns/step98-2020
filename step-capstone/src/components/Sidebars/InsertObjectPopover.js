import React, { useState, useEffect } from "react";
import { Grid, Popover, Box } from "@material-ui/core"
import AddItemButton from "../TravelObjectForms/AddItemButton"
import GetSuggestionButton from "../Suggestions/GetSuggestionButton"

export default function InsertObjectPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (props.anchorEl !== anchorEl) {
      setAnchorEl(props.anchorEl);
    }
  }, [props.anchorEl]);

  const getCoordinates = () => {
    let coordinates = { lat: 0, lng: 0 }
    if (props.slots !== null) {
      let prevNotNullOrFlight = props.slots.prevTravelObject !== null && props.slots.prevTravelObject.type !== 'flight';
      let nextNotNullOrFlight = props.slots.nextTravelObject !== null && props.slots.nextTravelObject.type !== 'flight';

      if (prevNotNullOrFlight && nextNotNullOrFlight) {
        coordinates.lat = (props.slots.prevTravelObject.coordinates.lat + props.slots.nextTravelObject.coordinates.lat) / 2;
        coordinates.lng = (props.slots.prevTravelObject.coordinates.lng + props.slots.nextTravelObject.coordinates.lng) / 2
      } else if (prevNotNullOrFlight) {
        coordinates.lat = props.slots.prevTravelObject.coordinates.lat;
        coordinates.lng = props.slots.prevTravelObject.coordinates.lng;
      } else if (nextNotNullOrFlight) {
        coordinates.lat = props.slots.nextTravelObject.coordinates.lat;
        coordinates.lng = props.slots.nextTravelObject.coordinates.lng;
      } else {
        return null;
      }
    } else {
      return null;
    }

    return coordinates;
  }

  const handleClose = () => {
    props.onClose();
    setAnchorEl(null);
  };

  const open = props.anchorEl !== null;
  const id = open ? "simple-popover" : undefined;

  const getSuggestions = () => {
    props.onClickTimeslot([props.slots.freeTimeSlot.startDate, props.slots.freeTimeSlot.endDate], getCoordinates());
    props.onOpenSuggestions();
    handleClose()
  }

  return (

    <div>
      <Popover
        id={id}
        open={anchorEl !== null}
        anchorEl={props.anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid container direction='row'>
          <Box p={5}>
            <AddItemButton
              data={props.slots === null ? undefined : {
                coordinates: null,
                description: "",
                endDate: props.slots.freeTimeSlot.endDate,
                finalized: true,
                location: null,
                startDate: props.slots.freeTimeSlot.startDate,
                title: "",
                type: "event",
              }}
              startDate={props.startDate}
              onAddItem={props.onAddItem}
              onClose={handleClose}
            />
          </Box>
          <Box p={5}>
            <GetSuggestionButton
              onClick={getSuggestions}
            />
          </Box>
        </Grid>
      </Popover>
    </div>
  );
}
