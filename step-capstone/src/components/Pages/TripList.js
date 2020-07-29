import React from 'react';
import { Dialog, Grid } from '@material-ui/core';
import TripItemComponent from "../Utilities/TripItemComponent";
import AddTrip from '../TripForms/AddTrip';
import { FirebaseContext } from '../Firebase';
import {
  Redirect
} from "react-router-dom";
import { fetchPhoto } from "../../scripts/HelperFunctions"
import TripSettingFormPopover from "../TripForms/TripSettingFormPopover"

class TripList extends React.Component {
  static contextType = FirebaseContext;

  constructor(props) {
    super(props);
    this.state = {
      reference: "/users/" + sessionStorage.getItem("userId") + "/trips/",
      selectedTrip: null,
      trips: [],
      editingTrip: false,
      selectedTripSetting: null,
      selectedTripId: null
    };
    this.map = null;
    this.service = null;
    this.handleOpenTrip = this.handleOpenTrip.bind(this);
    this.handleAddTrip = this.handleAddTrip.bind(this);
    this.handleDeleteTrip = this.handleDeleteTrip.bind(this);
    this.handleEditTripClick = this.handleEditTripClick.bind(this);
    this.handleEditTripSetting = this.handleEditTripSetting.bind(this);
    this.handleCloseTripSetting = this.handleCloseTripSetting.bind(this);
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
        console.error(error)
      })
  }

  componentDidMount() {
    this.loadTrips();

    this.map = new window.google.maps.Map(window.document.getElementById("map"));
    this.service = new window.google.maps.places.PlacesService(this.map);
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
    this.context.deleteTrip(this.state.reference + tripId).then(() => this.loadTrips());
    this.loadTrips();
  }

  handleEditTripClick(tripId) {
    this.context.getTrip(this.state.reference + tripId)
      .then((tripSetting) => {
        tripSetting = tripSetting.data()
        tripSetting.startDate = tripSetting.startDate.toDate()
        tripSetting.endDate = tripSetting.endDate.toDate()
        this.setState({
          selectedTripSetting: tripSetting,
          selectedTripId: tripId,
          editingTrip: true
        });
      })
  }

  handleEditTripSetting(newSetting) {
    this.context.editTripSetting(this.state.reference + this.state.selectedTripId, this.state.selectedTripSetting, newSetting)
      .then(() => { this.loadTrips() })
  }

  handleCloseTripSetting() {
    this.setState({
      editingTrip: false
    })
  }

  render() {
    const trips = this.state.trips;
    return (
      <div>
        <div id="map"></div>
        {this.state.selectedTrip ? <Redirect to={"/trips/" + this.state.selectedTrip} /> : 
          <div>
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
                      onDeleteTrip={this.handleDeleteTrip}
                      onEditTrip={this.handleEditTripClick}
                    />
                  </Grid>
                );
              })}
              <Grid item>
                <AddTrip
                  onAddTrip={this.handleAddTrip} />
              </Grid>
            </Grid> 
            
            <Dialog
              open={this.state.editingTrip}
              onClose={this.handleCloseTripSetting}
              style={{alignItems: "center", justifyContent: "center", display: "flex"}}
            >
              <TripSettingFormPopover
                onClose={this.handleCloseTripSetting}
                tripSetting={this.state.selectedTripSetting}
                onEditTripSetting={this.handleEditTripSetting}
              />
            </Dialog>
          </div>
        }
      </div>
    )
  }
}

export default TripList;