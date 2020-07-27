import React from "react";
import CommuteIcon from "@material-ui/icons/Commute";
import { Fab } from "@material-ui/core";
import OptimizationForm from "./OptimizationForm";

export default function OptimizationButton(props) {
  // anchor reference point
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (props.onClose !== undefined) {
      props.onClose();
    }
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <Fab color="primary" aria-label="optimization" onClick={handleClick}>
        <CommuteIcon />
      </Fab>
      <OptimizationForm
        data={props.data}
        isNewItem={true}
        startDate={props.startDate}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        style={{width: "500px", height:"500px"}}
      />
      
    </div>
  );
}
