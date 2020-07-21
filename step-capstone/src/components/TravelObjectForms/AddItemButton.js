import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Fab } from '@material-ui/core'
import FormPopover from './FormPopover'

export default function AddItemButton(props) {
    // anchor reference point
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        props.onClose()
    };

    const open = Boolean(anchorEl);
    return (
        <div>
            <Fab color="primary" aria-label="add" onClick={handleClick}>
                <AddIcon />
            </Fab>
            <FormPopover
                data={props.data}
                isNewItem = {true}
                startDate={props.startDate}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                onAddItem={props.onAddItem}
                onEditItem={props.onEditItem}
            />
        </div>
    )
}