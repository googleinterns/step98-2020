import React from 'react';
import { Grid } from '@material-ui/core'
import TripItemComponent from "./TripItemComponent"
import Trip from "./Trip"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class TripList extends React.Component{

  constructor(props){
    super(props);
    this.state = {selectedTrip : null};
    this.handleOpenTrip = this.handleOpenTrip.bind(this);
  }

  getTrips(userId) {
    //Test Data
    //TODO: Replace test data with call to firestore method
    const tripTestOne = {
      id : 1,
      title : "London trip", 
      startDate : new Date (2020, 8, 10),
      endDate : new Date (2020, 8, 15),
      description : "lorem ipsum ", 
    }
    const tripTestTwo = {
      id : 2,
      title : "Spain trip", 
      startDate : new Date (2020, 12, 10),
      endDate : new Date (2020, 12, 15),
      description : "lorem ipsum ", 
    }
    return [tripTestOne, tripTestTwo];
  }

  handleOpenTrip(tripID) {
    this.setState({ selectedTrip: tripID })
  }

  render () {
    const trips = this.getTrips();
    return (
      <div>
        <Switch>
          <Route path = "/trips/:tripId">
            <Trip tripId = {this.state.selectedTrip}/>
          </Route>
        </Switch>
        {this.state.selectedTrip ? <Redirect to = {"/trips/"+this.state.selectedTrip}/> :
          <Grid id="trips" container spacing = {2}> {
            trips.map((trip) => {
              return (
                <Grid item>
                  <TripItemComponent key={trip.id} data={trip} onOpenTrip={this.handleOpenTrip} />
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