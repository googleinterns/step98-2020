import React, { useState, useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
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
      if (props.slots.prevTravelObject !== null && props.slots.nextTravelObject !== null) {
        coordinates.lat = (props.slots.prevTravelObject.coordinates.lat + props.slots.nextTravelObject.coordinates.lat) / 2;
        coordinates.lng = (props.slots.prevTravelObject.coordinates.lng + props.slots.nextTravelObject.coordinates.lng) / 2
      } else if (props.slots.prevTravelObject !== null) {
        coordinates.lat = props.slots.prevTravelObject.coordinates.lat;
        coordinates.lng = props.slots.prevTravelObject.coordinates.lng;
      } else if (props.slots.nextTravelObject !== null) {
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
    setAnchorEl(null);
  };

  const open = props.anchorEl !== null;
  const id = open ? "simple-popover" : undefined;

  const getSuggestions = () => {
    props.onClickTimeslot([props.slots.freeTimeSlot.startDate, props.slots.freeTimeSlot.endDate], getCoordinates());
    props.onOpenSuggestions();
  }

  const addItemInSlot = () => {
    props.onAddItem({
      
    })
  }

  return (
    <div>
      <Popover
        id={id}
        open={anchorEl !== null}
        anchorEl={props.anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <AddItemButton
          data={props.slots === null ? undefined : {
            coordinates: null,
            description: "",
            endDate: props.slots.freeTimeSlot.endDate,
            finalized: true,
            location: "",
            startDate: props.slots.freeTimeSlot.startDate,
            title: "",
            type: "event",
          }}
          onAddItem={props.onAddItem}
        />
        <GetSuggestionButton
          onClick={getSuggestions}
        />
      </Popover>
    </div>
  );
}
