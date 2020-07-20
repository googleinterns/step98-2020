import React from 'react';
import '../../styles/TimeLine.css';
import {Typography} from '@material-ui/core';
/*
Takes data in this form:
       {
         finalized: true,
         type: "event",
         title: "Visiting Sherlock",
         location: "221b Baker Street, London",
         startDate: "8:30",
         endDate: "10:30",
         description: "Additional notes"
       }
*/
export default function Event( props ) {
  let timeString = props.data.startDate.toLocaleString() + ' - ' + props.data.endDate.toLocaleString();
  /*Given 2 Date objects, return true if they have the same date; return false otherwise */
  const sameDate = (timeA, timeB) => {
    return (timeA.getDate() === timeB.getDate() && timeA.getMonth() === timeB.getMonth() && timeA.getFullYear() === timeB.getFullYear());
  }
  
  if (props.data.finalized && sameDate(props.data.startDate, props.data.endDate)) {
    timeString = props.data.startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' - ' + props.data.endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  return(
       <div className="event double events" style={props.styleConfig}>
          <Typography variant="h6" gutterBottom>{props.data.title} </Typography>
          <Typography variant="subtitle2" gutterBottom>{timeString} </Typography>
          <Typography variant="subtitle2" gutterBottom>{props.data.location}</Typography>
       </div>
   )
}
 

