import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import '../styles/TimeLine.css';

export default function Hotel(props) {

  /**
   * Takes data in the form: 
   * type : 'check in at hotel'
   * name : ' Hotel ZED ' 
   * location : 'London'
   * timeStart : December 17, 2020 15:30:00
   * timeEnd:  December 20, 2020 11:00:00
   * description: 'description'
   * finalized : true
  **/
  return (
    <div className="event double hotels" style={props.styleConfig}>
      <p>{props.data.timeStart.toLocaleString()} - {props.data.timeEnd.toLocaleString()}: {props.data.title}</p>
      <p>{props.data.location}</p>
    </div>
  );
}