import React from 'react';
import TravelObject from './TravelObject'
import AddItemButton from './AddItemButton'
import { Grid } from '@material-ui/core'
import '../styles/Trip.css'
import MapComponent from "./Map"

// Data just for testing purposes
const testData = [
    {
        id: 0,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        departureCoordinates: {
            lat: 42.365360,
            lng: -71.008187
        },
        arrivalAirport: "SFO",
        arrivalCoordinates: {
            lat: 51.514212,
            lng: 0.057513
        },
        departureDate: new Date(),
        arrivalDate: new Date(),
        description: "Additional notes"
    },
    {
        id: 100,
        finalized: true,
        type: "hotel",
        title: "The Goring",
        location: "15 Beeston Pl, Westminster, London SW1W 0JW, United Kingdom",
        coordinates: {
            lat: 51.497735,
            lng: -0.145621
        },
        startDate: new Date(),
        endDate: new Date(),
        description: 'description',
    },
    {
        id: 327,
        finalized: false,
        type: "hotel",
        title: "Some museum",
        location: "15 Beeston Pl, Westminster, London SW1W 0JW, United Kingdom",
        coordinates: {
            lat: 51.511645,
            lng: -0.131944
        },
        startDate: new Date(),
        endDate: new Date(),
        description: 'description',
    },
    {
        id: 239857,
        finalized: true,
        type: "hotel",
        title: "Chinatown Gate",
        location: "15 Beeston Pl, Westminster, London SW1W 0JW, United Kingdom",
        coordinates: {
            lat: 51.509963,
            lng: -0.129336
        },
        startDate: new Date(),
        endDate: new Date(),
        description: 'description',
    },
    {
        id: 4781,
        finalized: false,
        type: "hotel",
        title: "The Shard",
        location: "15 Beeston Pl, Westminster, London SW1W 0JW, United Kingdom",
        coordinates: {
            lat: 51.505278,
            lng: -0.085690
        },
        startDate: new Date(),
        endDate: new Date(),
        description: 'description',
    }
]


export default class Trip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loaded: false
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
            items: data,
            loaded: true
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
        if (this.props.items === undefined) {
            // TODO: redirect to Home page
        }
        if (!this.state.loaded) {
            return null;
        }
        return (
            <div className="trip">
                <Grid id="map-component">
                    <MapComponent
                        zoom={13}
                        center={{ lat: 51.5, lng: 0.087 }}
                        finalized={this.state.items.filter((item) => item.finalized)}
                        unfinalized={this.state.items.filter((item) =>!item.finalized && item.coordinates !== null)}
                    />
                </Grid>
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

/*
 Classes for testing UI purposes
*/
function Finalized(props) {
    return (
        <Grid>
            {
                props.list.map((item) => {
                    return <TravelObject
                        key={item.id}
                        data={item}
                        onRemoveItem={props.onRemoveItem}
                        onEditItem={props.onEditItem}
                        onAddItem={props.onAddItem}
                    />
                })
            }
        </Grid>
    )
}

function Unfinalized(props) {
    return (
        <Grid>
            {
                props.list.map((item) => {
                    return <TravelObject
                        key={item.id}
                        data={item}
                        onRemoveItem={props.onRemoveItem}
                        onEditItem={props.onEditItem}
                        onAddItem={props.handleAddItem}
                    />
                })
            }
        </Grid>
    )
}
