import React from 'react';
import '../styles/TimeLine.css';
 
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
  console.log(props.data);
   return(
       <div className="event double flights" style={props.styleConfig}>
           <p>{props.data.startDate.toLocaleString()} - {props.data.endDate.toLocaleString()}: Flight from { props.data.departureAirport } to { props.data.arrivalAirport }</p>
       </div>
   )
}
 

