import React from 'react';
import { Grid } from '@material-ui/core';
import TripItemComponent from "./TripItemComponent";
import AddTrip from './AddTrip';
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
      trips : [],
    };
    this.handleOpenTrip = this.handleOpenTrip.bind(this);
    this.handleAddTrip = this.handleAddTrip.bind(this);
    this.handleDeleteTrip = this.handleDeleteTrip.bind(this);

  }

  loadTrips() {
    let trips = [];
    const reference = "/users/" + this.state.userId + "/trips";
    this.context.getTripList(reference).then(tripList => {
      tripList.forEach(trip => {
        trips.push(trip)
      })
      this.setState({trips : trips})
    })
    .catch(error => {
      console.log("Error Getting Trips")
      console.error(error)
    })
  }

  componentDidMount() {
    this.loadTrips();
    
  }


  handleOpenTrip(tripId) {
    this.setState({selectedTrip : tripId})
    sessionStorage.setItem("tripId",tripId);
  }

  handleAddTrip(newTrip) {
    console.log("Adding new trip to database...");
    const reference = "/users/" + this.state.userId + "/trips";
    this.context.addTrip(reference, newTrip);
    this.loadTrips();
  }

  handleDeleteTrip(tripId) {
    const reference = "/users/" + this.state.userId + "/trips/" + tripId;
    console.log(reference);
    this.context.deleteTrip(reference).then(() => this.loadTrips());
  }

  render () {
    const trips = this.state.trips;
    return (
      <div>
        {this.state.selectedTrip ? <Redirect to = {"/trips/"+this.state.selectedTrip}/> :
          <Grid id="trips" 
            container spacing = {2} 
            style={{position: "absolute", 
                    top: "100px", 
                    left: "100px"}}
          > 
            {trips.map((trip) => {
                return (
                  <Grid item>
                    <TripItemComponent 
                      key = {trip.id} 
                      data = {trip.data()} 
                      tripId = {trip.id} 
                      onOpenTrip ={this.handleOpenTrip}
                      onDeleteTrip = {this.handleDeleteTrip} />
                  </Grid>
                );
              })
            }
                  <Grid item>
                    <AddTrip
                      onAddTrip = {this.handleAddTrip}/>
                  </Grid>
          </Grid>
        }
        
      </div>

   );
  }
}

export default TripList;