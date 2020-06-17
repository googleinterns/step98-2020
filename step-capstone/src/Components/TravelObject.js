import React from 'react'
import { Container, Grid, Button} from '@material-ui/core'

export default function TravelObject(props) {
    let content = null;
    switch(props.type) {
        case 'event':
            content = <div>Event!</div>;
            break;
        case 'flight':
            content = <h1>Flight!</h1>
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
            <Button onClick={() => console.log("editing")}>Edit</Button>
            <Button onClick={() => console.log("deleting")}>Delete</Button>
        </div>
    )
    
}