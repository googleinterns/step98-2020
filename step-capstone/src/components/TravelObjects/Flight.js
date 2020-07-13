import React from 'react';
import '../../styles/TimeLine.css';
import {Typography} from '@material-ui/core';
 
/*
Takes data in this form:
       {
         finalized: true,
         type: "flight",
         departureAirport: "BOS",
         arrivalAirport: "SFO",
         startDate: "4:00pm EST",
         endDate: "7:00pm PST",
         description: "Additional notes"
       }
 
*/
export default function Flight( props ) {
  let timeString = props.data.startDate.toLocaleString() + ' - ' + props.data.endDate.toLocaleString();
  /*Given 2 Date objects, return true if they have the same date; return false otherwise */
  const sameDate = (timeA, timeB) => {
    return (timeA.getDate() === timeB.getDate() && timeA.getMonth() === timeB.getMonth() && timeA.getFullYear() === timeB.getFullYear());
  }
  
  if (props.data.finalized && sameDate(props.data.startDate, props.data.endDate)) {
    timeString = props.data.startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' - ' + props.data.endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  return(
       <div className="event double flights" style={props.styleConfig}>
          <Typography variant="h6" gutterBottom>Flight from { props.data.departureAirport } to { props.data.arrivalAirport }</Typography>
          <Typography variant="subtitle2" gutterBottom>{ timeString }</Typography>
       </div>
  )
}
 

