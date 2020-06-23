import React from 'react';
import TravelObject from './TravelObject'
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
                <Grid id="map-component">hi</Grid>
                <Grid container className="foreground" direction="row" justify="space-between">
                    <Grid item id="itinerary-component">
                        <TravelObject
                            data={this.state.data[0]}
                        />
                    </Grid>
                    <Grid item id="unordered-objects-component">
                        <TravelObject
                            data={this.state.data[0]}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}