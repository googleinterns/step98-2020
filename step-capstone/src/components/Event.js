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
            <p>{props.data.timeStart.toLocaleString()} - {props.data.timeEnd.toLocaleString()}: {props.data.title}</p>
            <p>{props.data.location}</p>
        </div>
    )
} 