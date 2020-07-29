import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  Box
} from '@material-ui/core'
import FormPopover from "../TravelObjectForms/FormPopover"
import "../../styles/Suggestions.css"
import logo from "../../images/logo.png"

export default function SuggestionItem(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const printDollarSigns = (budget) => {
    if (budget === undefined) {
      return "";
    } else if (budget === 0) {
      return "Free";
    } else {
      let cost = "";
      for (let i = 0; i < budget; i++) {
        cost += "$";
      }
      return cost;
    }
  }

  const suggestionToData = () => {
    return {
      title: (props.suggestion.place.name === undefined) ? "" : props.suggestion.place.name,
      placeId: props.suggestion.place.place_id,
      finalized: props.context.finalized,
      startDate: props.context.startDate,
      endDate: props.context.endDate,
      location: props.suggestion.place.vicinity,
      coordinates: {
        lat: props.suggestion.place.geometry.location.lat(),
        lng: props.suggestion.place.geometry.location.lng()
      },
      description: "",
      type: "event"
    }
  }

  const open = Boolean(anchorEl);

  return (
    <Card className="suggestion-item" >
      <CardHeader titleTypographyProps={{noWrap:true}}
        title={
          <Typography noWrap variant="h6" gutterBottom>{(props.suggestion.place.name === undefined) ? "" : props.suggestion.place.name}</Typography>
        }
      />

      <CardMedia
        className="suggestion-photo"
        component="img"
        image={(props.suggestion.place.photos === undefined) ? logo : props.suggestion.place.photos[0].getUrl()}
        title="suggestion photo"
      />
      <CardContent>
        <Grid container justify="space-between">
          <Typography className="suggestion-body" variant="subtitle2" inline gutterBottom align="left">
            Price: {printDollarSigns(props.suggestion.place.price_level)}
          </Typography>
          <Typography className="suggestion-body" variant="subtitle2" inline gutterBottom align="right">
            Rating: {(props.suggestion.place.rating === undefined) ? "" : props.suggestion.place.rating + "/5"}
          </Typography>
        </Grid>
      </CardContent>

      <CardActions>
        <Button variant="contained" onClick={handleClick}>
          Add
          </Button>
      </CardActions>


      <FormPopover
        data={suggestionToData()}
        isNewItem={true}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onAddItem={props.onAddItem}
        travelObjects={props.travelObjects}
        isFromSuggestions={true}
      />
    </Card>
  )
}