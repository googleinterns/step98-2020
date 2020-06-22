import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'

export default function Flight(props) {
    return(
        <Typography variant="h5" gutterBottom>{ props.data.departureAirport } to { props.data.arrivalAirport }</Typography>
    )
}