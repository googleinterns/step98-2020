import React from 'react'
import { Grid, Typography } from '@material-ui/core'

/*
Takes data in this form:
        {
          finalized: true,
          type: "flight",
          departureAirport: "BOS",
          arrivalAirport: "SFO",
          departureDate: "4:00pm EST",
          arrivalDate: "7:00pm PST",
          description: "Additional notes"
        }

*/
export default function Flight({ data }) {
    return(
        <Grid item>
            <Typography variant="h6" gutterBottom>Flight from { data.departureAirport } to { data.arrivalAirport }</Typography>
            <Typography variant="subtitle2" gutterBottom>Departure: { data.departureDate }</Typography>
            <Typography variant="subtitle2" gutterBottom>Arrival: { data.arrivalDate }</Typography>
            <Typography variant="body2" gutterBottom>{ data.description }</Typography>
        </Grid>
    )
}