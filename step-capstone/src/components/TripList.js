import React from 'react';
import { Grid } from '@material-ui/core'
import TripItemComponent from "./TripItemComponent"
import {FirebaseContext} from './Firebase';
import AddItemButton from './AddItemButton';
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
      selectedTrip : null,
      reference : "/users/" + sessionStorage.getItem("userId") + "/trips",
      trips : []};
    this.handleOpenTrip = this.handleOpenTrip.bind(this);
    this.handleAddTrip = this.handleAddTrip.bind(this);
  }

  componentDidMount() {
    let trips = [];
    this.context.getTripList(this.state.reference).then(tripList => {
      tripList.forEach(trip => {
        trips.push(trip)
      })
      this.setState({trips : trips})
    })
    .catch(error => {
      console.log("Error Getting Trips")
      console.error(error)
    });
  }

  handleOpenTrip(tripId) {
    this.setState({selectedTrip : tripId})
    sessionStorage.setItem("tripId",tripId);
  }

  handleAddTrip(trip) {
    this.context.addTrip(this.state.reference, trip)
    .then(() => {
      this.setState({trips : this.state.trips.concat(trip)})
    })
    .catch(error => {
      console.log("Error Adding Item")
      console.error(error)
    });
  }

  render () {
    const trips = this.state.trips;
    return (
      <div>
        {this.state.selectedTrip ? <Redirect to = {"/trips/"+this.state.selectedTrip}/> :
          <div>
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
            <Grid id="add-trip-button">
              <p>Get started on your next advenure</p>
              <AddItemButton onAddItem={this.handleAddTrip} />
            </Grid>
          </div>
        }
      </div>

   );
  }
}

export default TripList;