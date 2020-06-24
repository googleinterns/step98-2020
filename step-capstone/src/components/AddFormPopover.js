import React from 'react';
import { Typography, Popover, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import AddForm from './AddForm'

export default function AddFormPopver(props) {
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
                <AddForm onClose={props.onClose}/>
            </Popover>
        </div>
    )
}