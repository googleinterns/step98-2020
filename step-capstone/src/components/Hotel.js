import React from 'react';
import '../styles/TimeLine.css';
import {Typography} from '@material-ui/core';
 
export default function Hotel(props) {
 
 /**
  * Takes data in the form:
  * id: 100,
       finalized: true,
       type: "hotel",
       title: "Hotel ZED",
       location: "London",
       startDate: new Date("2020-03-25T19:43:00Z"),
       endDate: new Date("2020-03-25T22:50:00Z"),
       description: 'description',
 **/
  let timeString = props.data.startDate.toLocaleString() + ' - ' + props.data.endDate.toLocaleString();
  /*Given 2 Date objects, return true if they have the same date; return false otherwise */
  const sameDate = (timeA, timeB) => {
    return (timeA.getDate() === timeB.getDate() && timeA.getMonth() === timeB.getMonth() && timeA.getFullYear() === timeB.getFullYear());
  }
  
  if (props.data.finalized && sameDate(props.data.startDate, props.data.endDate)) {
    timeString = props.data.startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' - ' + props.data.endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
  return(
    <div className="event double hotels" style={props.styleConfig}>
        <Typography variant="h6" gutterBottom>{props.data.title} </Typography>
        <Typography variant="subtitle2" gutterBottom>{timeString} </Typography>
        <Typography variant="subtitle2" gutterBottom>{props.data.location}</Typography>
    </div>
  )
}
 