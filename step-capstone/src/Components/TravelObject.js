import React from 'react'
import Flight from './Flight'

export default function TravelObject(props) {
    let content = null;
    switch(props.type) {
        case 'event':
            content = <div>Event!</div>;
            break;
        case 'flight':
            content = <Flight />
            break;
        case 'hotel':
            content = <div>Hotel!</div>
            break;
        default:
            console.log("Invalid type");
            break;
    }
    return (
        <div>
            {content}
            <button onClick={() => console.log("editing")}>Edit</button>
            <button onClick={() => console.log("deleting")}>Delete</button>
        </div>
    )
    
}