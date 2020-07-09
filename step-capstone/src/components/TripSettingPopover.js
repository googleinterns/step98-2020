import React from 'react';
import Popover from '@material-ui/core/Popover';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
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
      {(props.button)? <button className="secondary" 
            onClick = {handleClick} 
            style = {{position:"absolute", 
                      left: "165px", 
                      top: "16px"}}
        >Trip setting</button> : null}
      {(!props.button)? <AddIcon 
                style={{position:"relative",
                        fontSize:"100", 
                        justify:"center", 
                        left:"110px", 
                        top:"150px"}}
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
                  tripSetting= {props.tripSetting}
                  onEditTripSetting = {props.onEditTripSetting}
              />
          </Popover>
    </div>
  );
}