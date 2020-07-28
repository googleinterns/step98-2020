import React, { useState, useEffect } from "react";
import { Grid, Popover, Box } from "@material-ui/core"
import AddItemButton from "../TravelObjectForms/AddItemButton"
import GetSuggestionButton from "../Suggestions/GetSuggestionButton"
import getDistance from "../../scripts/Distance"

export default function InsertObjectPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (props.anchorEl !== anchorEl) {
      setAnchorEl(props.anchorEl);
    }
  }, [props.anchorEl]);

  const getCoordinatesAndRadius = () => {
    let coordinates = { lat: 0, lng: 0 }

    return new Promise(res => {
      if (props.slots !== null) {
        let prevNotNullOrFlight = props.slots.prevTravelObject !== null && props.slots.prevTravelObject.type !== 'flight';
        let nextNotNullOrFlight = props.slots.nextTravelObject !== null && props.slots.nextTravelObject.type !== 'flight';
        if (prevNotNullOrFlight && nextNotNullOrFlight) {
          coordinates.lat = (props.slots.prevTravelObject.coordinates.lat + props.slots.nextTravelObject.coordinates.lat) / 2;
          coordinates.lng = (props.slots.prevTravelObject.coordinates.lng + props.slots.nextTravelObject.coordinates.lng) / 2
          calculateRadius(props.slots.prevTravelObject.coordinates, props.slots.nextTravelObject.coordinates)
            .then(results => {
              res({ coordinates: coordinates, radius: results })
            })
        } else if (prevNotNullOrFlight) {
          coordinates.lat = props.slots.prevTravelObject.coordinates.lat;
          coordinates.lng = props.slots.prevTravelObject.coordinates.lng;
          res({ coordinates: coordinates, radius: null });
        } else if (nextNotNullOrFlight) {
          coordinates.lat = props.slots.nextTravelObject.coordinates.lat;
          coordinates.lng = props.slots.nextTravelObject.coordinates.lng;
          res({ coordinates: coordinates, radius: null });
        } else {
          res(null);
        }
      } else {
        res(null);
      }
    })
  }

  const calculateRadius = (start, end) => {
    return new Promise(res => {
      getDistance(start, end, "DRIVING").then((result) => {
        let distance = result.distance.value;
        // radius is half distance between two points + additional 2 km for encompassing start and endpoints.
        let radius = (distance / 1000) * 0.5
        res(radius.toFixed(1));
      })
    })
  }

  const handleClose = () => {
    props.onClose();
    setAnchorEl(null);
  };

  const open = props.anchorEl !== null;
  const id = open ? "simple-popover" : undefined;

  const getSuggestions = () => {
    getCoordinatesAndRadius().then(results => {
      let coords = results ? results.coordinates : null;
      let radius = results ? results.radius : null;
      props.onClickTimeslot([props.slots.freeTimeSlot.startDate, props.slots.freeTimeSlot.endDate], coords, radius);
      props.onOpenSuggestions();
      handleClose()
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
              travelObjects={props.travelObjects}
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
