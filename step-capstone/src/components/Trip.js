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
        id: 0,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart: new Date("2015-03-25T02:00:00Z"),
        timeEnd: new Date("2015-03-25T03:30:00Z"),
        description: "Additional notes"
    },
    {
        id: 1,
        finalized: false,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart: new Date("2015-03-25T05:00:00Z"),
        timeEnd: new Date("2015-03-25T06:00:00Z"),
        description: "Additional notes"
    },
    {
        id: 2,
        finalized: false,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart: new Date("2015-03-25T07:00:00Z"),
        timeEnd: new Date("2015-03-25T07:30:00Z"),
        description: "Additional notes"
    },
    {
        id: 3,
        finalized: false,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart: new Date("2015-03-25T09:00:00Z"),
        timeEnd: new Date("2015-03-25T10:30:00Z"),
        description: "Additional notes"
    },
    {
        id: 125,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart: new Date("2015-03-25T11:00:00Z"),
        timeEnd: new Date("2015-03-25T14:00:00Z"),
        description: "Additional notes"
    },
    {
        id: 87,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart: new Date("2015-03-25T14:00:00Z"),
        timeEnd: new Date("2015-03-25T15:00:00Z"),
        description: "Additional notes"
    },
    {
        id: 231,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart: new Date("2015-03-25T16:00:00Z"),
        timeEnd: new Date("2015-03-25T17:30:00Z"),
        description: "Additional notes"
    },
    {
        id: 5425,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart:new Date("2015-03-25T17:45:00Z"),
        timeEnd: new Date("2015-03-25T19:50:00Z"),
        description: "Additional notes"
    },
    {
        id: 100,
        finalized: true,
        type: "hotel",
        title: "Hotel ZED",
        location: "London",
        timeStart: new Date("2015-03-25T19:43:00Z"),
        timeEnd: new Date("2015-03-25T22:50:00Z"),
        description: 'description',
    }
]

export default class Trip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }

        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
    }

    fetchData() {
        // TODO: fetch from datastore
        return testData;
    }

    componentDidMount() {
        let data = this.fetchData();
        this.setState({
            items: data
        })
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
                    return data
                }
            })
        })
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
                    console.log("adding event");
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
                            departureDate: data.departureDate,
                            arrivalDate: data.arrivalDate,
                            description: data.description
                        }])
                    })
                    break;
                default: throw "Invalid input";
            }
        }
    }

    render() {
        return (
            <div className="trip">
                <Grid id="map-component"><Map zoom={13} center={{ lat: 51.5, lng: 0.087 }} /></Grid>
                <Grid container className="foreground" direction="row" justify="space-between">
                    <Grid item id="finalized-component">
                        <Finalized
                            list={this.state.items.filter((item) => item.finalized)}
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
                        />
                    </Grid>
                </Grid>
                <Grid id="add-button-component">
                    <AddItemButton onAddItem={this.handleAddItem} />
                </Grid>
            </div>
        );
    }
}
