import React from 'react';
import { Grid } from '@material-ui/core'
import TripItemComponent from "./TripItemComponent"
import {FirebaseContext} from './Firebase';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";


class TripList extends React.Component{
  static contextType = FirebaseContext;

  constructor(props){
    super(props);
    this.state = {
      userId : sessionStorage.getItem("userId"),
      selectedTrip : null,
      trips : []};
    this.handleOpenTrip = this.handleOpenTrip.bind(this);
  }

  componentDidMount() {
    let trips = [];
    const reference = "/users/" + this.state.userId + "/trips";
    this.context.getTripList(reference).then(tripList => {
      tripList.forEach(trip => {
        trips.push(trip)
      })
      this.setState({trips : trips})
    })
    .catch(error => {console.log("Error Getting Trips")});
  }

  handleOpenTrip(tripId) {
    this.setState({selectedTrip : tripId})
    sessionStorage.setItem("tripId",tripId);
  }

  render () {
    const trips = this.state.trips;
    return (
      <div>
        {this.state.selectedTrip ? <Redirect to = {"/trips/"+this.state.selectedTrip}/> :
          <Grid id="trips" container spacing = {2}> {
            trips.map((trip) => {
              return (
                <Grid item>
                  <TripItemComponent key={trip.id} data={trip.data()} tripId={trip.id} onOpenTrip={this.handleOpenTrip} />
                </Grid>
              );
            })
          }
          </Grid>
        }
      </div>

   );
  }
}

export default TripList;