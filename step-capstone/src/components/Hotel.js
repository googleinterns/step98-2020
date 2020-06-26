import React from 'react'
import {Grid, Typography} from '@material-ui/core'

export default function Hotel(data) {

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
    <Grid item>
      <Typography variant="h6" gutterBottom>{data.title} </Typography>
      <Typography variant="subtitle2" gutterBottom>{
          data.timeStart.toString() + ' - ' +
          data.timeEnd.toString()} </Typography>
      <Typography variant="subtitle2" gutterBottom>{data.location}</Typography>
      {/* <Typography variant="body2" gutterBottom>{ data.description }</Typography> */}
    </Grid>
  );
}