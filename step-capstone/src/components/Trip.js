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
        timeStart: new Date("2020-03-25T02:00:00Z"),
        timeEnd: new Date("2020-03-25T03:30:00Z"),
        description: "Additional notes"
    },
    {
        id: 100,
        finalized: false,
        type: "hotel",
        title: "Hotel ZED",
        location: "London",
        timeStart: new Date("2020-03-25T19:43:00Z"),
        timeEnd: new Date("2020-03-25T22:50:00Z"),
        description: 'description',
    },
    {
        id: 2,
        finalized: false,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart: new Date("2020-03-25T07:00:00Z"),
        timeEnd: new Date("2020-03-25T07:30:00Z"),
        description: "Additional notes"
    },
    {
        id: 54253,
        finalized: false,
        type: "event",
        title: "Visiting Sherlock",
        location: "221b Baker Street, London",
        timeStart: new Date("2020-03-25T17:45:00Z"),
        timeEnd: new Date("2020-03-25T19:50:00Z"),
        description: "Additional notes"
    },
    {
        id: 125,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart: new Date("2020-03-25T11:00:00Z"),
        timeEnd: new Date("2020-03-25T14:00:00Z"),
        description: "Additional notes"
    },
    {
        id: 87,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart: new Date("2020-03-25T14:00:00Z"),
        timeEnd: new Date("2020-03-25T15:00:00Z"),
        description: "Additional notes"
    },
    {
        id: 231,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        timeStart: new Date("2020-03-25T16:00:00Z"),
        timeEnd: new Date("2020-03-25T17:30:00Z"),
        description: "Additional notes"
    },
    {
        id: 5425,
        finalized: true,
        type: "event",
        title: "Visiting Sherlock",
        location: "221b Baker Street, London",
        timeStart: new Date("2020-03-25T17:45:00Z"),
        timeEnd: new Date("2020-03-25T19:50:00Z"),
        description: "Additional notes"
    },
    {
        id: 100,
        finalized: true,
        type: "hotel",
        title: "Hotel ZED",
        location: "London",
        timeStart: new Date("2020-03-25T19:43:00Z"),
        timeEnd: new Date("2020-03-25T22:50:00Z"),
        description: 'description',
    }
]

const tripSetting = {
    destinations : ["London, England"],
    timeStart : new Date(),
    timeEnd : new Date(),
    description: ""
}
export default class Trip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            tripSetting: {
                destination : [],
                timeStart : new Date(),
                timeEnd : new Date(),
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
                            timeStart: data.startDate,
                            timeEnd: data.endDate,
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
                            timeStart: data.startDate,
                            timeEnd: data.endDate,
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
                            timeStart: data.departureDate,
                            timeEnd: data.arrivalDate,
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
                    <AddItemButton onAddItem={this.handleAddItem} />
                </Grid>
            </div>
        );
    }
}
