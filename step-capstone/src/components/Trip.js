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
        departureDate: new Date(),
        arrivalDate: new Date(),
        description: "Additional notes"
    },
    {
        id: 1,
        finalized: false,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: new Date(),
        arrivalDate: new Date(),
        description: "Additional notes"
    },
    {
        id: 2,
        finalized: false,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: new Date(),
        arrivalDate: new Date(),
        description: "Additional notes"
    },
    {
        id: 3,
        finalized: false,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: new Date(),
        arrivalDate: new Date(),
        description: "Additional notes"
    },
    {
        id: 125,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: new Date(),
        arrivalDate: new Date(),
        description: "Additional notes"
    },
    {
        id: 87,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: new Date(),
        arrivalDate: new Date(),
        description: "Additional notes"
    },
    {
        id: 231,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: new Date(),
        arrivalDate: new Date(),
        description: "Additional notes"
    },
    {
        id: 5425,
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: new Date(),
        arrivalDate: new Date(),
        description: "Additional notes"
    },
    {
        id: 100,
        finalized: true,
        type: "hotel",
        title: "Hotel ZED",
        location: "London",
        startDate: new Date(),
        endDate: new Date(),
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
                        onRemoveItem={props.onRemoveItem}
                        onEditItem={props.onEditItem}
                        onAddItem={props.handleAddItem}
                    />
                })
            }
        </Grid>
    )
}