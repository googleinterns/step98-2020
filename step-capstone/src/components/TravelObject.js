import React from 'react'
import { Box, Grid, Typography, Card, CardContent, IconButton } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import Flight from './Flight'
import Hotel from './Hotel'
import FormPopover from './FormPopover'

export default function TravelObject(props) {
    let content = null;
    switch (props.data.type) {
        case 'event':
            content = <Typography variant="h4" gutterBottom>Event!</Typography>
            break;
        case 'flight':
            content = <Flight {...props.data} />
            break;
        case 'hotel':
            content = <Hotel {...props.data} />
            break;
        default:
            return null;
    }

    return (
        <Card>
            <CardContent>
                <Grid container direction="row">
                    <Grid item xs>
                        <Box mr={10} width="100%" height="100%">
                            {content}
                        </Box>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <EditButton
                                    data={props.data}
                                    onEditItem={props.onEditItem}
                                />
                            </Grid>
                            <Grid item>
                                <IconButton arial-label="delete">
                                    <Delete
                                        onClick={() => props.onRemoveItem(props.data)}
                                    />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
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