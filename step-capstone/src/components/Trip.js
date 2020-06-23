import React from 'react';
import TravelObject from './TravelObject'
import { Grid } from '@material-ui/core'
import '../styles/Trip.css'

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

    handleAddItem() {
        console.log("adding object");
    }

    render() {
        return (
            <div className="trip">
                <Grid id="map-component"></Grid>
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
            </div>
        );
    }
}

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