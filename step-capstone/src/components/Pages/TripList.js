import React from 'react';
import { Grid } from '@material-ui/core';
import TripItemComponent from "../Utilities/TripItemComponent";
import AddTrip from '../TripForms/AddTrip';
import {FirebaseContext} from '../Firebase';
import {
  Redirect
} from "react-router-dom";


class TripList extends React.Component {
  static contextType = FirebaseContext;

  constructor(props) {
    super(props);
    this.state = {
      reference : "/users/" + sessionStorage.getItem("userId") + "/trips/",
      selectedTrip : null,
      trips : [],
    };
    this.handleOpenTrip = this.handleOpenTrip.bind(this);
    this.handleAddTrip = this.handleAddTrip.bind(this);
    this.handleDeleteTrip = this.handleDeleteTrip.bind(this);

  }

  loadTrips() {
    let trips = [];
    this.context.getTripList(this.state.reference).then(tripList => {
      tripList.forEach(trip => {
        trips.push(trip)
      })
      this.setState({ trips: trips })
    })
      .catch(error => {
        console.log("Error Getting Trips")
        console.log(error)
        console.error(error)
      })
  }

  componentDidMount() {
    this.loadTrips();

  }

  handleOpenTrip(tripId) {
    this.setState({ selectedTrip: tripId })
    sessionStorage.setItem("tripId", tripId);
  }

  handleAddTrip(newTrip) {
    this.context.addTrip(this.state.reference, newTrip);
    this.loadTrips();
  }

  handleDeleteTrip(tripId) {
    this.context.deleteTrip(this.state.reference+tripId).then(() => this.loadTrips());
    this.loadTrips();
  }

  render() {
    const trips = this.state.trips;
    return (
      <div>
        {this.state.selectedTrip ? <Redirect to={"/trips/" + this.state.selectedTrip} /> :
          <Grid id="trips"
            container spacing={2}
            style={{
              position: "absolute",
              top: "10%",
              left: "10%"
            }}
          >
            {trips.map((trip) => {
              return (
                <Grid item id="tripItem" key={trip.id}>
                  <TripItemComponent
                    key={trip.id}
                    data={trip.data()}
                    tripId={trip.id}
                    onOpenTrip={this.handleOpenTrip}
                    onDeleteTrip={this.handleDeleteTrip} />
                </Grid>
              );
            })}

            <Grid item>
              <AddTrip
                onAddTrip={this.handleAddTrip} />
            </Grid>

          </Grid>
        }
      </div>
    );
  }
}

export default TripList;