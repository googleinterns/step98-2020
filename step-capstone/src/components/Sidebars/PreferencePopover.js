import React, { useState, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

export default function PreferencePopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (props.anchorEl !== anchorEl) {
      setAnchorEl(props.anchorEl)
    }}, [props.anchorEl])
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = (props.anchorEl !== null);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={props.anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography>{(props.slots !== null)? props.slots.curSlot.startDate.toString() : null}</Typography>
      </Popover>
    </div>
  );
}