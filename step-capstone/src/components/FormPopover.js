import React from 'react';
import {Popover} from '@material-ui/core';
import ItemForm from './ItemForm'

export default function FormPopver(props) {
    return (
        <div>
            <Popover
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.onClose}
                anchorOrigin={props.anchorOrigin}
                transformOrigin={props.transformOrigin}
            >
                <ItemForm
                    onClose={props.onClose}
                    onAddItem={props.onAddItem}
                    onEditItem={props.onEditItem}
                    data={props.data}
                />
            </Popover>
        </div>
    )
}