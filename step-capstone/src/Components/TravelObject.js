import React from 'react'
import { Grid, Button, Typography} from '@material-ui/core'
import { Edit, Delete} from '@material-ui/icons'

export default function TravelObject(props) {
    let content = null;
    switch(props.type) {
        case 'event':
            content = <div>Event!</div>
            break;
        case 'flight':
            content = <Typography variant="h4" gutterBottom>Flight!</Typography>
            break;
        case 'hotel':
            content = <div>Hotel!</div>
            break;
        default:
            console.log("Invalid type");
            break;
    }
    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
                {content}
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Edit 
                        onClick={() => console.log("editing")}
                    />
                    <Delete 
                        onClick={() => console.log("deleting")}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
    
}