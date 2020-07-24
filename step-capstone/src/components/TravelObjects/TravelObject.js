import React from 'react'
import Flight from './Flight'
import Event from  './Event'
import Hotel from './Hotel'
import FormPopover from '../TravelObjectForms/FormPopover'
import '../../styles/TimeLine.css';

export default function TravelObject(props) {
    let content = null;
    const open = Boolean(props.anchorEl);
    
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
    console.log("anchorEl ", props.anchorEl)
    return (
        <div>
            <div>
                {content}
            </div>
            <FormPopover
                    data={props.data}
                    isNewItem={false}
                    open={open}
                    anchorEl={props.anchorEl}
                    onClose={props.handleClose}
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
                    onRemoveItem={props.onRemoveItem}
                />
        </div>

    )
}