import React, { useState, useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

export default function PreferencePopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (props.anchorEl !== anchorEl) {
      setAnchorEl(props.anchorEl);
    }
  }, [props.anchorEl]);

  useEffect(() => {
    let coordinates = {lat: 0, lng: 0}
    if (props.slots !== null) {
      if (props.slots.prevSlot !== null && props.slots.nextSlot !== null) {
        coordinates.lat = (props.slots.prevSlot.lat + props.slots.nextSlot.lat)/2;
        coordinates.lgn = (props.slots.prevSlot.lgn + props.slots.nextSlot.lgn)/2
      } else if (props.slots.prevSlot !== null) {
        coordinates.lat = props.slots.prevSlot.lat;
        coordinates.lgn = props.slots.prevSlot.lgn;
      } else if (props.slots.nextSlot !== null ) {
        coordinates.lat = props.slots.nextSlot.lat;
        coordinates.lgn = props.slots.nextSlot.lgn;
      } else {
        //TODO: implement when merge code with Emmie's preference form and autocomplete
        //coordinates = props.trip_coordinates;
      }
    }
    

  }, [props.slots]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = props.anchorEl !== null;
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
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
        <Typography>
          {props.slots !== null
            ? props.slots.curSlot.startDate.toString()
            : null}
        </Typography>
      </Popover>
    </div>
  );
}
