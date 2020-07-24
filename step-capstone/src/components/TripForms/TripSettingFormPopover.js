import React, { useState, useEffect } from 'react'
import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    Grid,
    Typography,
    Box
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import LocationAutocompleteInput from "../Utilities/LocationAutocompleteInput"
import PreferenceForm from "../Utilities/PreferenceForm"
import "../../styles/TripSetting.css"
import { fetchPhoto } from "../../scripts/HelperFunctions"
import FoodTimeForm from "../Utilities/FoodTimeForm"

export default class TripSettingFormPopover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidated: false,
            tripSetting: this.props.tripSetting
        };
        this.handleValidation = this.handleValidation.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleValidation(isValidated) {
        if (this.state.isValidated !== isValidated) {
            this.setState({ isValidated: isValidated });
        }
    }

    handleDataChange(newTripSetting) {
        this.setState({ tripSetting: newTripSetting });
    }

    handleSave() {
        // Doesn't save data if improper input --> doesn't close popover which shows error
        if (!this.state.isValidated) {
            return;
        }
        else {
            this.props.onEditTripSetting(this.state.tripSetting);
            this.props.onClose();
        }
    }

    render() {

        return (
            <Card id="setting-container">
                <Box>
                    <CardContent>
                        <EditTripSetting
                            tripSetting={this.props.tripSetting}
                            onValidation={this.handleValidation}
                            onDataChange={this.handleDataChange}
                        />
                    </CardContent>
                    <CardActions>
                        <Button onClick={this.props.onClose} size="small">Cancel</Button>
                        <Button onClick={this.handleSave} size="small">Save</Button>
                    </CardActions>
                </Box>
            </Card>
        )
    }
}

function EditTripSetting(props) {
    const [map, setMap] = useState(null);
    const [service, setService] = useState(null);

    // Sets values to previous values if editing, otherwise blank slate
    const [title, setTitle] = useState(props.tripSetting.title);
    const [destination, setDestination] = useState(props.tripSetting.destination);
    const [photoUrl, setPhotoUrl] = useState((props.tripSetting.photoUrl !== undefined)? props.tripSetting.photoUrl: "null");
    const [startDate, setStartDate] = useState(props.tripSetting.startDate);
    const [endDate, setEndDate] = useState(props.tripSetting.endDate);
    const [description, setDescription] = useState(props.tripSetting.description);
    const [userPref, setUserPref] = useState(props.tripSetting.userPref);
    const [foodTimeRanges, setFoodTimeRanges] = useState(props.tripSetting.foodTimeRanges);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDestinationChange = (location) => {
        setDestination(location);
        if(location!==null){
          fetchPhoto(location.placeId, service).then((url) => {
            setPhotoUrl(url);
          })
        }
    }

    const handleStartDateChange = (newStartDate) => {
        if (newStartDate > endDate) {
            setEndDate(newStartDate);
        }
        setStartDate(newStartDate);

    }

    const handleEndDateChange = (newEndDate) => {
        if (startDate > newEndDate) {
            setStartDate(newEndDate);
        }
        setEndDate(newEndDate);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleUserPrefChange = (pref) => {
        setUserPref(pref);
    }

    const handleFoodTimeRangesChange = (timeranges) => {
        setFoodTimeRanges(timeranges);
    }

    useEffect(() => {
        let newMap = new window.google.maps.Map(window.document.getElementById("map"))
        setMap(newMap);
        setService(new window.google.maps.places.PlacesService(newMap));
    }, [])

    useEffect(() => {
        props.onDataChange({
            title: title,
            destination: destination,
            photoUrl: photoUrl,
            startDate: startDate,
            endDate: endDate,
            description: description,
            userPref: userPref,
            foodTimeRanges: foodTimeRanges
        })
        // notifies form if necessary inputs are present
        props.onValidation(!(!destination || (title === "")))
    }, [destination, startDate, endDate, description, userPref, photoUrl, foodTimeRanges])
    return (
        <div>
            <div id="map"></div>
            <Grid container direction="column">
                <Grid>
                    <Typography variant={"h4"} gutterBottom>Trip Settings</Typography>
                </Grid>
                <Grid item container direction="row" justify="space-between">
                    <TextField
                        error={title === ""}
                        helperText={(title === "") ? "Cannot leave field blank" : null}
                        id="title"
                        label={"Title"}
                        defaultValue={title}
                        onChange={handleTitleChange}
                    />
                </Grid>
                <Grid item container direction="row" justify="space-between"></Grid>
                <LocationAutocompleteInput
                    onLocationSelected={handleDestinationChange}
                    error={!destination}
                    helperText={!destination ? "Cannot leave field blank. Please enter a destination." : null}
                    text={destination ? destination.address : ""}
                    type="other"
                />
            </Grid>
            <Grid item container direction="row" justify="space-between">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="startDate"
                        label="Date Start"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="endDate"
                        label="Date End"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
                <TextField
                    id="description"
                    label={"Add Description"}
                    defaultValue={description}
                    fullWidth
                    multiline
                    onChange={handleDescriptionChange}
                />
            </Grid>
            <PreferenceForm pref={userPref} onChange={handleUserPrefChange} />
            <FoodTimeForm foodTimeRanges={foodTimeRanges} onChange={handleFoodTimeRangesChange} />
        </div>
    )
}



