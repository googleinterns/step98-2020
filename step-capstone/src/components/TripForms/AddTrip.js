import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TripSettingPopover from './TripSettingPopover';

const useStyles = makeStyles({
    root: {
        minWidth: 345,
        maxWidth: 345,

        minHeight: 400
    },
    media: {
        height: 140
    },
})


export default function AddTrip(props) {
    const classes = useStyles();
    const newTrip = {
        title: "",
        startDate: new Date(),
        endDate: new Date(),
        destination: null,
        description: "",
        userPref: {
            budget: 2,
            radius: 10,
            activityPreferences: [],
            foodPreferences: []
        }
    }
    const handleEditTrip = (newTrip) => {
        newTrip.travelObjects = [];
        props.onAddTrip(newTrip);
    }

    return (
        <Card className={classes.root}>
            <TripSettingPopover
                button={false}
                tripSetting={newTrip}
                onEditTripSetting={handleEditTrip}
            />
        </Card>
    )
}