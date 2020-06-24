import React from 'react';
import { Typography, Popover } from '@material-ui/core';

export default function AddForm(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Popover
                id={props.id}
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.onClose}
                anchorOrigin={props.anchorOrigin}
                transformOrigin={props.transformOrigin}
            >
                <Typography>The content of the Popover.</Typography>
            </Popover>
        </div>
    )

}