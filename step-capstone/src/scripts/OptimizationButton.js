import React, { useState } from "react";
import CommuteIcon from "@material-ui/icons/Commute";
import { Fab } from "@material-ui/core";
import OptimizationForm from './OptimizationForm'

export default function OptimizationButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    setAnchorEl(window.document.getElementById("optimization-popper"));
  };

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Fab color="primary" aria-label="optimization" onClick={handleClick}>
        <CommuteIcon />
      </Fab>
      {anchorEl ? <OptimizationForm 
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    {...props}
                    /> : null}
                    
    </div>
  );
}
