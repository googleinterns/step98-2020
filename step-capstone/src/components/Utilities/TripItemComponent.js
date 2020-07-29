import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: 400,
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

/*
 * Trip component should receive some trip
 */
export default function TripItemComponent(props) {
  const classes = useStyles();
  let dateRange =
    props.data.startDate.toDate().toDateString() +
    " - " +
    props.data.endDate.toDate().toDateString();
  let photoUrl =
    props.data.photoUrl !== undefined && props.data.photoUrl !== null
      ? props.data.photoUrl.toString()
      : "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg";
  
  return (
    <Card className={classes.root}>
      <CardHeader title={props.data.title} subheader={dateRange} />
      <CardMedia
        component="img"
        className={classes.media}
        src={photoUrl}
      />
      <CardContent>
        <Typography variant="body2" gutterBottom>
          {props.data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.onEditTrip(props.tripId)}>
          Edit
        </Button>
        <Button size="small" onClick={() => props.onOpenTrip(props.tripId)}>
          Open
        </Button>
        <Button size="small" onClick={() => props.onDeleteTrip(props.tripId)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
