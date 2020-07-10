import React from 'react';
import {useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import TimeLine from './TimeLine';
 
export default function Finalized(props) {
    /*date2Items maps the date to the list of items of that date */
    const [displayDate, setDisplayDate] = useState(props.startDate);

    const handleDisplayDateChange = (newDisplayDate) => {
        setDisplayDate(newDisplayDate);
    }
    
    useEffect(() => {
        setDisplayDate(props.startDate);
    }, [props.startDate]);

    return (
        <div>
            <TimeLine
                list={props.list}    
                onRemoveItem={props.onRemoveItem}
                onEditItem={props.onEditItem}
                onAddItem={props.onAddItem}
                displayDate={displayDate}
                onChangeDisplayDate={handleDisplayDateChange}
                onClickObject={props.onClickObject}
                setTodaysEvents={props.setTodaysEvents}
            />    
        </div>
        
    )
}
 
 
 

