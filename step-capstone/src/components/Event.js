import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import '../styles/TimeLine.css';
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
export default function Flight( props ) {
    return(
        <div className="event double events" style={props.styleConfig}>
            <h1 >Title { props.data.title } to { props.data.title }</h1>
            <p >Location: { props.data.location }</p>
            <p >Time start: { props.data.timeStart.toString() }</p>
            <p >Time end: { props.data.timeEnd.toString() }</p>
            {/* <Typography variant="body2" gutterBottom>{ data.description }</Typography> */}
        </div>
    )
} 