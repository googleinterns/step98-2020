import React, { useState, useEffect } from 'react'
import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    Grid,
    Typography,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import LocationAutocompleteInput from "../Utilities/LocationAutocompleteInput"
import PreferenceForm from "../Utilities/PreferenceForm"

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
            <Card id="add-form-container" style={{ height: "350px" }}>
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
            </Card>
        )
    }
}

function EditTripSetting(props) {
    // Sets values to previous values if editing, otherwise blank slate
    const [title, setTitle] = useState(props.tripSetting.title);
    const [destination, setDestination] = useState(props.tripSetting.destination);
    const [startDate, setStartDate] = useState(props.tripSetting.startDate);
    const [endDate, setEndDate] = useState(props.tripSetting.endDate);
    const [description, setDescription] = useState(props.tripSetting.description);
    const [userPref, setUserPref] = useState(props.tripSetting.userPref);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDestinationChange = (location) => {
        setDestination(location);
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

    useEffect(() => {
        props.onDataChange({
            title: title,
            destination: destination,
            startDate: startDate,
            endDate: endDate,
            description: description,
            userPref: userPref
        })
        // notifies form if necessary inputs are present
        props.onValidation(!(!destination || (title === "")))
    }, [destination, startDate, endDate, description, userPref])

    return (
        <div>
            <Grid container direction="column">
                <Grid>
                    <Typography variant={"h4"} gutterBottom>New Trip</Typography>
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
                    helperText={!destination ? "Cannot leave field blank, list your destinations, and separate them using comma" : null}
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
            <PreferenceForm pref={userPref} onChange={handleUserPrefChange}/>
        </div>
    )
}



