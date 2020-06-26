import React from 'react'
import { Grid, Typography } from '@material-ui/core'

/*
Takes data in this form:
        {
          finalized: true,
          type: "flight",
          departureAirport: "BOS",
          arrivalAirport: "SFO",
          timeStart: "4:00pm EST",
          timeEnd: "7:00pm PST",
          description: "Additional notes"
        }

*/
export default function Flight( data ) {
    return(
        <Grid item>
            <Typography variant="h6" gutterBottom>Flight from { data.departureAirport } to { data.arrivalAirport }</Typography>
            <Typography variant="subtitle2" gutterBottom>Departure: { data.timeStart.toString() }</Typography>
            <Typography variant="subtitle2" gutterBottom>Arrival: { data.timeEnd.toString() }</Typography>
            {/* <Typography variant="body2" gutterBottom>{ data.description }</Typography> */}
        </Grid>
    )
}