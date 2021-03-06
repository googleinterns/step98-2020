import React from 'react';
import Finalized from '../Sidebars/Finalized';
import Unfinalized from '../Sidebars/Unfinalized';
import AddItemButton from '../TravelObjectForms/AddItemButton'
import { Grid, Box } from '@material-ui/core'
import '../../styles/Trip.css'
import { FirebaseContext } from '../Firebase';
import MapComponent from "../Utilities/Map"
import GetSuggestionButton from '../Suggestions/GetSuggestionButton';
import SuggestionPopup from "../Suggestions/SuggestionPopup"
import OptimizationButton from '../Optimization/OptimizationButton';
import _ from "lodash"
import { sameDate, sameTravelObjectList } from "../../scripts/HelperFunctions"

export default class Trip extends React.Component {
    static contextType = FirebaseContext;
    constructor(props) {
        super(props);

        this.state = {
            reference: "/users/" + sessionStorage.getItem("userId") + "/trips/" + sessionStorage.getItem("tripId"),
            items: null,
            tripSetting: null,
            selectedObject: null,
            today: {
                events: [],
                date: null
            },
            map: null,
            service: null,
            queryResults: null,
            placeIds: new Set(),
            showSuggestions: false,
            selectedTimeslot: null,
            date2HotelMap: new Map(),
        }

        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleEditTripSetting = this.handleEditTripSetting.bind(this);
        this.handleSelectedObject = this.handleSelectedObject.bind(this);
        this.handleChangeDisplayDate = this.handleChangeDisplayDate.bind(this);
        this.setMap = this.setMap.bind(this);
        this.toggleSuggestionBar = this.toggleSuggestionBar.bind(this);
        this.handleSelectTimeslot = this.handleSelectTimeslot.bind(this);
        this.editMultipleItems = this.editMultipleItems.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem("tripId") === "") {
            return;
        }
        let travelObjectList = [];
        let placeIds = new Set();
        this.context.getTrip(this.state.reference)
            .then(data => {
                let trip = data.data();
                trip.userPref.dayStartEndTimes = [trip.userPref.dayStartEndTimes[0].toDate(), trip.userPref.dayStartEndTimes[1].toDate()];
                this.setState({
                    tripSetting: {
                        title: trip.title,
                        startDate: trip.startDate.toDate(),
                        endDate: trip.endDate.toDate(),
                        destination: trip.destination,
                        description: trip.description,
                        userPref: trip.userPref,
                    }
                })
                trip.travelObjects.forEach(travelObject => {
                    travelObject.startDate = travelObject.startDate.toDate();
                    travelObject.endDate = travelObject.endDate.toDate();
                    travelObjectList.push(travelObject);
                    placeIds.add(travelObject.placeId);
                });
                this.setState({ items: travelObjectList, placeIds: placeIds, date2HotelMap: this.getHotelMap(trip.travelObjects) });
            })
            .catch(error => {
                console.log("Error retrieving trip data");
                console.error(error);
            });
    }

    getHotelMap(items) {
        var hotelMap = new Map(); // Map date to morning and night hotel
        items.forEach(travelObject => {
            if (travelObject.type === "hotel" && travelObject.finalized) {
                hotelMap.set(travelObject.startDate.toDateString(), { nightHotel: travelObject })
                var curDate = new Date(travelObject.startDate);
                curDate.setDate(curDate.getDate() + 1);
                while (!sameDate(curDate, travelObject.endDate)) {
                    hotelMap.set(curDate.toDateString(), { morningHotel: travelObject, nightHotel: travelObject });
                    curDate.setDate(curDate.getDate() + 1);

                }
                hotelMap.set(travelObject.endDate.toDateString(), { morningHotel: travelObject })
            }
        })
        return hotelMap;
    }

    handleRemoveItem(data) {
        this.context.deleteTravelObject(this.state.reference, data)
            .then(() => {
                var placeIdCopy = new Set(this.state.placeIds);
                if (data.type !== "flight") {
                    placeIdCopy.delete(data.placeId);
                }
                let items = this.state.items.filter((item) => item.id !== data.id)
                let hotelMap = data.type === "hotel" ? this.getHotelMap(items) : this.state.date2HotelMap;
                this.setState({
                    items: items,
                    placeIds: placeIdCopy,
                    date2HotelMap: hotelMap
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
        let newPlaceIds = new Set(this.state.placeIds);
        this.state.items.forEach((item) => {
            if (item.id === data.id) {
                if (data.type !== "flight") {
                    newPlaceIds.delete(item.placeId);
                    newPlaceIds.add(data.placeId);
                }
                itemToChange = item;
                newItems.push(data);
            } else {
                newItems.push(item);
            }
        });
        this.context.editTravelObject(this.state.reference, itemToChange, _.cloneDeep(data))
            .then(() => {
                let hotelMap = itemToChange.type === "hotel" ? this.getHotelMap(newItems) : this.state.date2HotelMap;
                this.setState({
                    items: newItems,
                    placeIds: newPlaceIds,
                    date2HotelMap: hotelMap
                });
            })
            .catch((error) => {
                console.log("Error Editing Item");
                console.log(error);
            });
    }

    editMultipleItems(editedTravelObjects) {
        let editedIds = editedTravelObjects.reduce((objectMap, object) => {
            objectMap.set(object.id, { edited: object });
            return objectMap;
        }, new Map());
        let newItems = this.state.items.map((item) => {
            if (editedIds.has(item.id)) {
                // add old object into map
                editedIds.set(item.id, { edited: editedIds.get(item.id).edited, previous: item });
                return editedIds.get(item.id).edited;
            } else {
                return item;
            }
        })
        let editingPromises = editedTravelObjects.map(item => {
            return this.context.editTravelObject(this.state.reference, editedIds.get(item.id).previous, editedIds.get(item.id).edited);
        });
        Promise.all(editingPromises).then(() => {
            this.setState({ items: newItems })
        })
    }

    handleAddItem(data) {
        // Add to database here
        var newPlaceIds = new Set(this.state.placeIds);
        if (data.type !== "flight") {
            newPlaceIds.add(data.placeId);
        }
        data.id = Date.now();
        this.context.addTravelObject(this.state.reference, data)
            .then(() => {
                let items = this.state.items.concat(data);
                let hotelMap = data.type === "hotel" ? this.getHotelMap(items) : this.state.date2HotelMap;
                this.setState({ items: items, placeIds: newPlaceIds, date2HotelMap: hotelMap });
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
        if (!sameTravelObjectList(travelObjects, this.state.today.events) || this.state.today.date !== date) {
            this.setState({
                today: {
                    events: travelObjects,
                    date: date
                }
            })
        }
    }

    toggleSuggestionBar() {
        if (this.state.showSuggestions) {
            this.setState({ showSuggestions: !this.state.showSuggestions, handleSelectTimeslot: null })
        }
        this.setState({ showSuggestions: !this.state.showSuggestions })
    }

    setMap(map) {
        this.setState({
            map: map,
            service: new window.google.maps.places.PlacesService(map)
        })
    }

    // Triggered when a time slot is selected in timeline
    handleSelectTimeslot(timeRange, coordinates, radius) {
        this.setState({
            selectedTimeslot: {
                timeRange: timeRange,
                coordinates: coordinates,
                radius: radius
            }
        })
    }

    // only allows rendering of suggestion bar once map is set
    renderSuggestionBar() {
        const todayStartTime = new Date(this.state.today.date);
        todayStartTime.setHours(0, 0, 0);

        const todayEndTime = new Date(this.state.today.date);
        todayEndTime.setHours(23, 59, 59);

        if (this.state.map) {
            return (
                <Grid item>
                    <SuggestionPopup
                        show={this.state.showSuggestions}
                        service={this.state.service}
                        userPref={this.state.tripSetting.userPref}
                        coordinates={(this.state.selectedTimeslot && this.state.selectedTimeslot.coordinates) ?
                            this.state.selectedTimeslot.coordinates : this.state.tripSetting.destination.coordinates}
                        items={this.state.placeIds}
                        timeRange={this.state.selectedTimeslot ? this.state.selectedTimeslot.timeRange : [todayStartTime, todayEndTime]}
                        radius={this.state.selectedTimeslot && this.state.selectedTimeslot.radius ? this.state.selectedTimeslot.radius : this.state.tripSetting.userPref.radius}
                        onClose={this.toggleSuggestionBar}
                        finalized={this.state.selectedTimeslot !== null}
                        onAddItem={this.handleAddItem}
                        travelObjects={this.state.items}
                    />
                </Grid>
            )
        }
        return null;
    }

    renderMap() {
        if (this.state.today.date !== null) {
            return (
                <MapComponent
                    defaultCenter={this.state.tripSetting.destination.coordinates}
                    finalized={this.state.items.filter((item) => item.finalized)}
                    unfinalized={this.state.items.filter((item) => !item.finalized && item.coordinates !== "")}
                    selected={this.state.selectedObject}
                    displayDate={this.state.today}
                    setMap={this.setMap}
                    date2HotelMap={this.state.date2HotelMap}
                    onRemoveItem={this.handleRemoveItem}
                    onEditItem={this.handleEditItem}
                    onAddItem={this.handleAddItem}
                    travelObjects={this.state.items}
                />
            )
        } else {
            return null;
        }
    }

    render() {
        // if data hasn't been loaded yet, don't render the trip
        // prevents map from loading empty data
        if (!this.state.items || !this.state.tripSetting) {
            return null;
        }
        return (
            <div className="trip">
                <Grid id="map-component">
                    <div id="optimization-popper"
                    style={{
                        position: "absolute",
                        left: "800px",
                        top: "100px"
                    }}></div>
                    {this.renderMap()}
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
                            onClickTimeslot={this.handleSelectTimeslot}
                            onOpenSuggestions={this.toggleSuggestionBar}
                            hotelMap={this.state.date2HotelMap}
                            travelObjects={this.state.items}
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
                            travelObjects={this.state.items}
                        />
                    </Grid>
                </Grid>
                {this.renderSuggestionBar()}
                <Grid id="button-group">
                    <Box mb={3}>
                        <OptimizationButton
                            displayDate={this.state.today.date}
                            displayItems={_.cloneDeep(this.state.today.events)}
                            userPref={this.state.tripSetting.userPref}
                            hotels={this.state.date2HotelMap.get(this.state.today.date)}
                            onConfirm={this.editMultipleItems}
                        />
                    </Box>
                    <Box mb={3}>
                        <GetSuggestionButton
                            onClick={this.toggleSuggestionBar}
                        />
                    </Box>
                    <Box>
                        <AddItemButton
                            startDate={new Date(this.state.today.date)}
                            onAddItem={this.handleAddItem}
                            travelObjects={this.state.items}
                        />
                    </Box>
                </Grid>
            </div>
        );
    }
}