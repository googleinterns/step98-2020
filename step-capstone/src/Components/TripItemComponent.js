import React from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140
    },
})

export default function TripItemComponent(props) {
    const classes = useStyles();
    let dateRange = props.startDate.toString() + " - " + props.endDate.toString();
    return(
        <Card className={classes.root}>
            <CardHeader title={props.title} subheader={dateRange}/>
            <CardMedia
                component="img"
                className={classes.media}
                src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
            />
            <CardContent>{props.description}</CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Open</Button>
            </CardActions>
        </Card>
    )
}