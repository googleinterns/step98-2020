import React from 'react';
import TravelObject from './TravelObject'
import AddItemButton from './AddItemButton'
import { Grid } from '@material-ui/core'
import '../styles/Trip.css'
import Map from "./Map"

// Data just for testing purposes
const testData = [
    {
        id: 0,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: "4:00pm EST",
        arrivalDate: "7:00pm PST",
        description: "Additional notes"
    },
    {
        id: 1,
        finalized: false,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: "4:00pm EST",
        arrivalDate: "7:00pm PST",
        description: "Additional notes"
    },
    {
        id: 2,
        finalized: false,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: "4:00pm EST",
        arrivalDate: "7:00pm PST",
        description: "Additional notes"
    },
    {
        id: 3,
        finalized: false,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: "4:00pm EST",
        arrivalDate: "7:00pm PST",
        description: "Additional notes"
    },
    {
        id: 4,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: "4:00pm EST",
        arrivalDate: "7:00pm PST",
        description: "Additional notes"
    },
    {
        id: 4,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: "4:00pm EST",
        arrivalDate: "7:00pm PST",
        description: "Additional notes"
    },
    {
        id: 4,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: "4:00pm EST",
        arrivalDate: "7:00pm PST",
        description: "Additional notes"
    },
    {
        id: 4,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: "4:00pm EST",
        arrivalDate: "7:00pm PST",
        description: "Additional notes"
    },
    {
        id: 100,
        finalized: true,
        type: "hotel",
        name: "Hotel ZED",
        location: "London",
        checkIn: "December 17, 2020 15:30:00",
        checkOut: "December 20, 2020 11:00:00",
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
        return testData;
    }

    componentDidMount() {
        let data = this.fetchData();
        this.setState({
            items: data
        })
    }

    handleRemoveItem(id) {
        console.log("deleting " + id);
    }

    handleEditItem(id) {
        console.log("editing " + id)
    }

    handleAddItem(type, data) {
        if (data === undefined) {
            console.log("please enter information")
        } else {
            // Add to database here
            // current code for testing data format etc.
            switch (type) {
                case "event":
                    console.log("adding event");
                    break;
                case "hotel":
                    this.setState({
                        items: this.state.items.concat([{
                            id: this.state.items.length,
                            finalized: data.finalized,
                            type: "hotel",
                            name: data.title,
                            location: data.location,
                            checkIn: data.startDate,
                            checkOut: data.endDate,
                            description: data.description,

                        }])
                    })
                    break;
                case "flight":
                    this.setState({
                        items: this.state.items.concat([{
                            id: this.state.items.length,
                            finalized: data.finalized,
                            type: type,
                            departureAirport: data.departureAirport,
                            arrivalAirport: data.arrivalAirport,
                            departureDate: data.departureDate.toString(),
                            arrivalDate: data.arrivalDate.toString(),
                            description: data.description
                        }])
                    })
                    break;
                default: console.log("invalid type"); break;
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
                        onRemoveItem={props.handleRemoveItem}
                        onEditItem={props.handleEditItem}
                        onAddItem={props.handleAddItem}
                    />
                })
            }
        </Grid>
    )
}