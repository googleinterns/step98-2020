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
                    onRemoveItem={props.onRemoveItem}
                    data={props.data}
                    isNewItem={props.isNewItem}
                    startDate={props.startDate}
                    travelObjects={props.travelObjects}
                    isFromSuggestions={props.isFromSuggestions}
                />
            </Popover>
        </div>
    )
}