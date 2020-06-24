import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core'
import AddForm from './AddForm'

export default function AddItemButton() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton aria-label="add" onClick={handleOpen}>
                <AddCircleIcon fontSize="large" />
            </IconButton>
            <AddForm 
                open={open}
                onClose={handleClose}
            />
        </div>
    )

}