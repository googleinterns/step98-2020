import React from 'react';
import TravelObject from './TravelObject';
import AddItemButton from './AddItemButton';
import { Grid } from '@material-ui/core';
import '../styles/Trip.css';
import Map from "./Map";
import Finalized from "./Finalized";
import Unfinalized from "./Unfinalized";
// Data just for testing purposes
const testData = [
  {
      id: 54255,
      finalized: true,
      type: "event",
      title: "Visiting Sherlock",
      location: "221b Baker Street, London",
      startDate: new Date("2020-07-24T17:45:00"),
      endDate: new Date("2020-07-24T19:50:00"),
      description: "Additional notes"
  },
  {
      id: 10000000,
      finalized: true,
      type: "hotel",
      title: "Hotel ZED",
      location: "London",
      startDate: new Date("2020-07-26T19:43:00"),
      endDate: new Date("2020-07-26T22:50:00"),
      description: 'description',
  },
  {
      id: 1256666666,
      finalized: true,
      type: "flight",
      departureAirport: "BOS",
      arrivalAirport: "SFO",
      startDate: new Date("2020-07-24T11:00:00"),
      endDate: new Date("2020-07-24T14:00:00"),
      description: "Additional notes"
  },
  {
      id: 231,
      finalized: true,
      type: "flight",
      departureAirport: "BOS",
      arrivalAirport: "SFO",
      startDate: new Date("2020-07-25T16:00:00"),
      endDate: new Date("2020-07-25T17:30:00"),
      description: "Additional notes"
  },
  {
      id: 87,
      finalized: true,
      type: "flight",
      departureAirport: "BOS",
      arrivalAirport: "SFO",
      startDate: new Date("2020-07-26T14:00:00"),
      endDate: new Date("2020-07-26T15:00:00"),
      description: "Additional notes"
  },
  {
      id: 0,
      finalized: true,
      type: "flight",
      departureAirport: "BOS",
      arrivalAirport: "SFO",
      startDate: new Date("2020-07-25T02:00:00"),
      endDate: new Date("2020-07-25T03:30:00"),
      description: "Additional notes"
  }
]
const tripSetting = {
  destinations : ["London, Milan"],
  startDate : new Date("2020-07-24T02:00:00"),
  endDate : new Date("2020-07-26T02:00:00"),
  description: ""
}
export default class Trip extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          items: [],
          tripSetting: {
              destination : [],
              startDate : new Date(),
              endDate : new Date(),
              description : ""
          }
      }
      this.handleRemoveItem = this.handleRemoveItem.bind(this);
      this.handleEditItem = this.handleEditItem.bind(this);
      this.handleAddItem = this.handleAddItem.bind(this);
      this.handleEditTripSetting = this.handleEditTripSetting.bind(this);
  }

  fetchData() {
      // TODO: fetch from datastore
      return testData;
  }

  fetchTripSetting() {
      //TODO: fetch trip setting from datastore
      return tripSetting;
  }

  saveData() {
      //TODO: save the travelobjects to datastore
  }

  saveTripSetting() {
      //TODO: save tripSetting
      //SOMETHING TO THINK ABOUT: allowing users to move all the travelobjects of one day to another day
  }

  componentDidMount() {
      let data = this.fetchData();
      let tripSetting = this.fetchTripSetting();
      this.setState({
          items: data,
          tripSetting: tripSetting
      });
  }
  
  handleRemoveItem(id) {
      this.setState({
          items: this.state.items.filter((item) => item.id !== id)
      });
  }

  handleEditItem(data) {
      this.setState({
          items: this.state.items.map((item) => {
              if (item.id !== data.id) {
                  return item;
              } else {
                  return data;
              }
          })
      });
  }

  handleAddItem(data) {
      if (data === undefined) {
          console.log("please enter information")
      } else {
          // Add to database here
          // current code for testing data format etc.
          // TODO: Add item to datastore
          switch (data.type) {
              case "event":
                  this.setState({
                      items: this.state.items.concat([{
                          id: this.state.items.length,
                          finalized: data.finalized,
                          type: data.type,
                          title: data.title,
                          location: data.location,
                          startDate: data.startDate,
                          endDate: data.endDate,
                          description: data.description,
                      }])
                  })
                  break;
              case "hotel":
                  this.setState({
                      items: this.state.items.concat([{
                          id: this.state.items.length,
                          finalized: data.finalized,
                          type: data.type,
                          title: data.title,
                          location: data.location,
                          startDate: data.startDate,
                          endDate: data.endDate,
                          description: data.description,
                      }])
                  })
                  break;
              case "flight":
                  this.setState({
                      items: this.state.items.concat([{
                          id: this.state.items.length,
                          finalized: data.finalized,
                          type: data.type,
                          departureAirport: data.departureAirport,
                          arrivalAirport: data.arrivalAirport,
                          startDate: data.startDate,
                          endDate: data.endDate,
                          description: data.description
                      }])
                  })
                  break;
              default: throw "Invalid input";
          }
      }
  }

  handleEditTripSetting(newSetting) {
      this.setState({
          tripSetting: newSetting
      });
  }
  
  render() {
      return (
          <div className="trip">
              <Grid id="map-component"><Map zoom={13} center={{ lat: 51.5, lng: 0.087 }} /></Grid>
              <Grid container className="foreground" direction="row" justify="space-between">
                  <Grid item id="finalized-component">
                      <Finalized
                          list={this.state.items.filter((item) => item.finalized)}
                          startDate={this.state.tripSetting.startDate}
                          endDate={this.state.tripSetting.endDate}
                          onRemoveItem={this.handleRemoveItem}
                          onEditItem={this.handleEditItem}
                          onAddItem={this.handleAddItem}
                      />
                  </Grid>
                  <Grid item id="unfinalized-component">
                      <Unfinalized
                          list={this.state.items.filter((item) => !item.finalized)}
                          onRemoveItem={this.handleRemoveItem}
                          onEditItem={this.handleEditItem}
                          onAddItem={this.handleAddItem}
                          tripSetting= {this.state.tripSetting}
                          onEditTripSetting = {this.handleEditTripSetting}
                      />
                  </Grid>
              </Grid>
              <Grid id="add-button-component">
                  <AddItemButton 
                    startDate={this.state.tripSetting.startDate}
                    onAddItem={this.handleAddItem} />
              </Grid>
          </div>
      );
  }
}
 
 
 

