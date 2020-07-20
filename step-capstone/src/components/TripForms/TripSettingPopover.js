import React from 'react';
import { Backdrop, Button, makeStyles, Popover } from '@material-ui/core';
import TripSettingFormPopover from './TripSettingFormPopover';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function TripSettingPopover(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenBackDrop(!openBackDrop);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenBackDrop(false);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      {(props.button) ? <Button variant='outlined' onClick={handleClick} >Trip setting</Button> : null}
      {(!props.button) ? <AddIcon
        style={{
          position: "relative",
          fontSize: "100",
          justify: "center",
          left: "110px",
          top: "150px"
        }}
        onClick={handleClick}
      /> : null}

      <Backdrop className={classes.backdrop} open={openBackDrop}></Backdrop>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 450 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <TripSettingFormPopover
          onClose={handleClose}
          tripSetting={props.tripSetting}
          onEditTripSetting={props.onEditTripSetting}
        />
      </Popover>
    </div>
  );
}