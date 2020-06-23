import React from 'react';
import TravelObject from './TravelObject'
import { Grid } from '@material-ui/core'

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
            <div className="App">
                <Grid id="map-component">hi</Grid>
                <Grid container className="foreground" direction="row" justify="space-between">
                    <Grid item id="itinerary-component">
                        <Itinerary
                            list={this.state.items.filter((item) => item.finalized)}
                            onRemoveItem={this.handleRemoveItem}
                            onEditItem={this.handleEditItem}
                            onAddItem={this.handleAddItem}
                        />
                    </Grid>
                    <Grid item id="unordered-objects-component">
                        <UnorderedItems
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

function Itinerary(props) {
    return (
        <Grid>
            {
                props.list.map((item) => {
                    return <TravelObject
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

function UnorderedItems(props) {
    return (
        <Grid>
            {
                props.list.map((item) => {
                    return <TravelObject
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