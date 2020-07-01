import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import '../styles/TimeLine.css';

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
export default function Flight( props ) {
    return(
        <div className="event double flights" style={props.styleConfig}>
            <p>{props.data.timeStart.toLocaleString()} - {props.data.timeEnd.toLocaleString()}: Flight from { props.data.departureAirport } to { props.data.arrivalAirport }</p>
        </div>
    )
}