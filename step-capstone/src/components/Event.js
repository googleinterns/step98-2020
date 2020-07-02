import React from 'react';
import '../styles/TimeLine.css';
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
export default function Flight( props ) {
   return(
       <div className="event double events" style={props.styleConfig}>
           <p>{props.data.startDate.toLocaleString()} - {props.data.endDate.toLocaleString()}: {props.data.title}</p>
           <p>{props.data.location}</p>
       </div>
   )
}
 

