import React from 'react'
import Flight from './Flight'
import Event from  './Event'
import Hotel from './Hotel'
import FormPopover from '../TravelObjectForms/FormPopover'
import '../../styles/TimeLine.css';

export default function TravelObject(props) {
    let content = null;
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        // if has a placeId, zoom to marker on map
        if (props.data.placeId) {
            props.onClickObject(props.data.id);
        }
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    
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
            <div onClick={handleClick}>
                {content}
            </div>
            <FormPopover
                    data={props.data}
                    isNewItem={false}
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
                    onRemoveItem={props.onRemoveItem}
                />
        </div>

    )
}