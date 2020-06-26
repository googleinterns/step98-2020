import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'

/*
Takes data in this form:
        {
          finalized: true,
          type: "event",
          title: "Visiting Sherlock",
          location: "221b Baker Street, London",
          timeStart: "8:30",
          timeEnd: "10:30",
          description: "Additional notes"
        }
*/
export default function Flight( data ) {
    return(
        <Grid item>
            <Typography variant="h6" gutterBottom>Title { data.title } to { data.title }</Typography>
            <Typography variant="subtitle2" gutterBottom>Location: { data.location }</Typography>
            <Typography variant="subtitle2" gutterBottom>Time start: { data.timeStart.toString() }</Typography>
            <Typography variant="subtitle2" gutterBottom>Time end: { data.timeEnd.toString() }</Typography>
            {/* <Typography variant="body2" gutterBottom>{ data.description }</Typography> */}
        </Grid>
    )
} 