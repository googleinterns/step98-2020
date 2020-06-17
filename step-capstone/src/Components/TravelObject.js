import React from 'react'

export default function TravelObject(props) {
    switch(props.type) {
        case 'event':
            return null;
        case 'flight':
            return (
                <div>hi</div>
            )
        case 'hotel':
            return null;
        default:
            console.log("Invalid type");
            break;
    }
}