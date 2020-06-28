import React from 'react'
import { Box, Grid, Typography, Card, CardContent, IconButton } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import Flight from './Flight'
import Event from  './Event'
import Hotel from './Hotel'
import FormPopover from './FormPopover'
import '../styles/TimeLine.css';

export default function TravelObject(props) {
    let content = null;
    switch (props.data.type) {
        case 'event':
            content = <Event data={props.data} styleConfig={props.styleConfig} />
            break;
        case 'flight':
            content = <Flight data={props.data} styleConfig={props.styleConfig} />
            break;
        case 'hotel':
            content = <Hotel data={props.data} styleConfig={props.styleConfig} />
            break;
        default:
            return null;
    }

    return (
        
        <div>
            {content}
        </div>

    )
}

/*
 * Edit Button triggers FormPopover and populates it with previously set data. Any changes will override existing item
 */
function EditButton(props) {
    // reference point
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (
        <div>
            <IconButton aria-label="edit">
                <Edit
                    onClick={handleClick}
                />
            </IconButton>
            <FormPopover
                data={props.data}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onAddItem={props.onAddItem}
                onEditItem={props.onEditItem}
            />
        </div>
    )
}