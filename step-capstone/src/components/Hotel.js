import React from 'react';
import '../styles/TimeLine.css';

export default function Hotel(props) {

  /**
   * Takes data in the form: 
   * id: 100,
        finalized: true,
        type: "hotel",
        title: "Hotel ZED",
        location: "London",
        timeStart: new Date("2020-03-25T19:43:00Z"),
        timeEnd: new Date("2020-03-25T22:50:00Z"),
        description: 'description',
  **/
  return (
    <div className="event double hotels" style={props.styleConfig}>
      <p>{props.data.timeStart.toLocaleString()} - {props.data.timeEnd.toLocaleString()}: {props.data.title}</p>
      <p>{props.data.location}</p>
    </div>
  );
}