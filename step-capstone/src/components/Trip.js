import React from 'react';
import './styles/App.css';
import TravelObject from './components/TravelObject'
import { Box, Grid, Typography } from '@material-ui/core'

export default class Trip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: []
        }
      }
    
      fetchData() {
        return [
          {
            finalized: true,
            type: "flight",
            departureAirport: "BOS",
            arrivalAirport: "SFO",
            departureDate: "4:00pm EST",
            arrivalDate: "7:00pm PST",
            description: "Additional notes"
          }
        ]
      }
    
      componentDidMount() {
        this.setState({
          data: this.fetchData()
        })
      }
      
      render() {
        if (this.state.data.length === 0) {
          return null;
        }
        return (
          <div className="App">
            <div id="map-component"></div>
            <div id="itinerary-component"></div>
            <div id="unordered-objects-component"></div>
            <TravelObject
              data={this.state.data[0]}
            />
          </div>
        );
      }
}