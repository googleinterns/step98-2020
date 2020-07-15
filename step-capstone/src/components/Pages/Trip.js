import React from 'react';
import Finalized from '../Sidebars/Finalized';
import Unfinalized from '../Sidebars/Unfinalized';
import AddItemButton from '../TravelObjectForms/AddItemButton'
import { Grid } from '@material-ui/core'
import '../../styles/Trip.css'
import { FirebaseContext } from '../Firebase';
import MapComponent from "../Utilities/Map"
import handleSuggestions from "../../scripts/Suggestions"


export default class Trip extends React.Component {
    static contextType = FirebaseContext;
    constructor(props) {
        super(props);

        this.state = {
            reference: "/users/" + sessionStorage.getItem("userId") + "/trips/" + sessionStorage.getItem("tripId"),
            items: [],
            tripSetting: {
                title: "",
                startDate: new Date(),
                endDate: new Date(),
                destinations: "",
                description: ""
            },
            loaded: false,
            selectedObject: null,
            today: {
                events: [],
                date: null
            },
            map: null,
            service: null,
            queryResults: null
        }

        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleEditTripSetting = this.handleEditTripSetting.bind(this);
        this.handleSelectedObject = this.handleSelectedObject.bind(this);
        this.handleChangeDisplayDate = this.handleChangeDisplayDate.bind(this);
        this.setMap = this.setMap.bind(this);
    }

    componentDidMount() {
        let travelObjectList = [];
        this.context.getTrip(this.state.reference)
            .then(data => {
                let trip = data.data();
                this.setState({
                    tripSetting: {
                        title: trip.title,
                        startDate: trip.startDate.toDate(),
                        endDate: trip.startDate.toDate(),
                        destinations: trip.destinations,
                        description: trip.description
                    }
                })

                trip.travelObjects.forEach(travelObject => {
                    travelObject.startDate = travelObject.startDate.toDate();
                    travelObject.endDate = travelObject.endDate.toDate();
                    travelObjectList.push(travelObject)
                });
                this.setState({ items: travelObjectList, loaded: true });
            })
            .catch(error => {
                console.log("Error retrieving trip data");
                console.error(error);
            });
    }

    handleRemoveItem(data) {
        this.context.deleteTravelObject(this.state.reference, data)
            .then(() => {
                this.setState({
                    items: this.state.items.filter((item) => item.id !== data.id)
                });
            })
            .catch(error => {
                console.log("Error Removing Item")
                console.error(error)
            });
    }

    handleEditItem(data) {
        let newItems = [];
        let itemToChange;
        this.state.items.forEach((item) => {
            if (item.id === data.id) {
                itemToChange = item;
                newItems.push(data);
            } else {
                newItems.push(item);
            }
        });
        this.context.editTravelObject(this.state.reference, itemToChange, data)
            .then(() => {
                this.setState({
                    items: newItems,
                    loaded: true
                });
            })
            .catch((error) => {
                console.log("Error Editing Item");
                console.log(error);
            });
        this.setState({ items: newItems });
    }

    handleAddItem(data) {
        // Add to database here
        data.id = Date.now();
        this.context.addTravelObject(this.state.reference, data)
            .then(() => {
                this.setState({ items: this.state.items.concat(data) });
            })
            .catch(error => {
                console.log("Error Adding Item")
                console.error(error)
            });
    }

    async handleEditTripSetting(newSetting) {
        await this.context.editTripSetting(this.state.reference, this.state.tripSetting, newSetting);
        this.setState({
            tripSetting: newSetting
        });
    }

    handleSelectedObject(id) {
        this.setState({ selectedObject: id })
    }

    handleChangeDisplayDate(travelObjects, date) {
        if (this.state.today.date !== date) {
            this.setState({
                today: {
                    events: travelObjects,
                    date: date
                }
            })
        }
    }

    getSuggestions(config) {
        /**
         * param: 
         * config: an object with three fields: 
         *  1. userCat: a  String array of categories 
         *  2. userBudget: an integer for budget
         *  3. radius: a string integer radius object 
         *  4. timeRange: free time range [startDate, endDate]
         *  5. coordinates: an object for coordinates
         * return the suggestions : an array of PlaceObject already sorted based on score
         */
        if (this.state.map) {
            return handleSuggestions(this.state.service, config);
        }
            
    }

    setMap(map) {
        this.setState({
            map: map,
            service: new window.google.maps.places.PlacesService(map)
        })
    }

    render() {
        // if data hasn't been loaded yet, don't render the trip
        // prevents map from loading empty data
        if (!this.state.loaded) {
            return null;
        }
        return (
            <div className="trip">
                {this.getQueries()}
                <Grid id="map-component">
                    <MapComponent
                        zoom={15}
                        finalized={this.state.items.filter((item) => item.finalized)}
                        unfinalized={this.state.items.filter((item) => !item.finalized && item.coordinates !== null)}
                        selected={this.state.selectedObject}
                        displayDate={this.state.today}
                        setMap={this.setMap}
                    />
                </Grid>
                <Grid container className="foreground" direction="row" justify="space-between">
                    <Grid item id="finalized-component">
                        <Finalized
                            list={this.state.items.filter((item) => item.finalized)}
                            startDate={this.state.tripSetting.startDate}
                            endDate={this.state.tripSetting.endDate}
                            onRemoveItem={this.handleRemoveItem}
                            onEditItem={this.handleEditItem}
                            onAddItem={this.handleAddItem}
                            onClickObject={this.handleSelectedObject}
                            setTodaysEvents={this.handleChangeDisplayDate}

                        />
                    </Grid>
                    <Grid item id="unfinalized-component">
                        <Unfinalized
                            list={this.state.items.filter((item) => !item.finalized)}
                            onRemoveItem={this.handleRemoveItem}
                            onEditItem={this.handleEditItem}
                            onAddItem={this.handleAddItem}
                            tripSetting={this.state.tripSetting}
                            onEditTripSetting={this.handleEditTripSetting}
                            onClickObject={this.handleSelectedObject}
                        />
                    </Grid>
                </Grid>
                <Grid id="add-button-component">
                    <AddItemButton
                        startDate={this.state.tripSetting.startDate}
                        onAddItem={this.handleAddItem}
                    />
                </Grid>
            </div>
        );
    }
}