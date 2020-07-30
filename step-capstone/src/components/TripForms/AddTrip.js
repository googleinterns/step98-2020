import React from 'react';
import {
    Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TripSettingPopover from './TripSettingPopover';
import moment from "moment"

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
        photoUrl: null,
        description: "",
        userPref: {
            budget: 2,
            radius: 10,
            activityPreferences: [],
            foodPreferences: [],
            foodTimeRanges: [moment.duration(1, 'hour').asMilliseconds(), moment.duration(1, 'hour').asMilliseconds(), moment.duration(1, 'hour').asMilliseconds()],
            dayStartEndTimes: [new Date().setHours(8, 0, 0), new Date().setHours(22, 0, 0)]
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