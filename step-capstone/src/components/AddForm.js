import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Typography,
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    Paper,
    Grid,
    Tabs,
    Tab,
    Checkbox
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";


export default class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            onClose: props.onClose,
            onAddItem: props.onAddItem,
            data: {}
        }
        this.handleToggleTab = this.handleToggleTab.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    // clears data when tab is changed
    handleToggleTab(event, newVal) {
        this.setState({
            value: newVal,
            data: undefined
        });
    }

    handleDataChange(newData) {
        this.setState({
            data: newData
        })
    }

    getForm() {
        switch (this.state.value) {
            case 0: return <AddEventHotel onDataChange={this.handleDataChange} />
            case 1: return <AddFlight onDataChange={this.handleDataChange} />
            case 2: return <AddEventHotel onDataChange={this.handleDataChange} />
            default: return;
        }
    }

    handleCreate() {
        switch (this.state.value) {
            case 0:
                this.state.onAddItem("event", this.state.data);
                break;
            case 1:
                this.state.onAddItem("flight", this.state.data);
                break;
            case 2:
                this.state.onAddItem("hotel", this.state.data);
                break;
            default: break;
        }
        this.state.onClose();
    }

    render() {
        return (
            <Card id="add-form-container">
                <CardContent>
                    <Paper>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleToggleTab}
                            variant="fullWidth"
                        >
                            <Tab label="Event" />
                            <Tab label="Flight" />
                            <Tab label="Hotel" />
                        </Tabs>
                    </Paper>
                    {this.getForm()}
                </CardContent>
                <CardActions>
                    <Button onClick={this.state.onClose} size="small">Cancel</Button>
                    <Button onClick={this.handleCreate} size="small">Create</Button>
                </CardActions>
            </Card>
        )
    }
}

function AddEventHotel(props) {
    const [startDate, handleStartChange] = useState(new Date());
    const [endDate, handleEndChange] = useState(new Date());
    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const handleChecked = (e) => {
        setChecked(e.target.checked);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    /*
     * Called once change to hook state is complete. Updates data property in AddForm.
     */
    useEffect(() => {
        props.onDataChange({
            title: title,
            startDate: startDate,
            endDate: endDate,
            finalized: checked,
            location: location,
            description: description
        })
    }, [startDate, endDate, checked, title, location, description])

    return (
        <Grid container direction="column">
            <Grid item>
                <TextField id="title" label="Add Title" fullWidth onChange={handleTitleChange} />
            </Grid>
            <Grid item>
                <Checkbox
                    checked={checked}
                    onChange={handleChecked}
                />
            </Grid>
            <Grid item container direction="row" justify="space-between">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={startDate} onChange={handleStartChange} />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={endDate} onChange={handleEndChange} />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
                <TextField
                    id="location"
                    label="Add Location"
                    fullWidth onChange={handleLocationChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="description"
                    label="Add Description"
                    fullWidth
                    multiline
                    onChange={handleDescriptionChange}
                />
            </Grid>
        </Grid>
    )
}

function AddFlight(props) {
    const [departureDate, handleStartChange] = useState(new Date());
    const [arrivalDate, handleEndChange] = useState(new Date());
    const [checked, setChecked] = useState(false);
    const [departureAirport, setDepartureAirport] = useState("");
    const [arrivalAirport, setArrivalAirport] = useState("")
    const [description, setDescription] = useState("");

    const handleChecked = (event) => {
        setChecked(event.target.checked);
    }

    const handleDepartureAirport = (e) => {
        setDepartureAirport(e.target.value);
    }

    const handleArrivalAirport = (e) => {
        setArrivalAirport(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    /*
     * Called once change to hook state is complete. Updates data property in AddForm.
     */
    useEffect(() => {
        console.log("changing data");
        props.onDataChange({
            finalized: checked,
            departureDate: departureDate,
            arrivalDate: arrivalDate,
            departureAirport: departureAirport,
            arrivalAirport: arrivalAirport,
            description: description
        })
    }, [departureDate, arrivalDate, checked, departureAirport, arrivalAirport, description])

    return (
        <Grid container direction="column">
            <Grid item container direction="row">
                <TextField
                    id="departure"
                    label="Add departure airport"
                    onChange={handleDepartureAirport}
                />
                <TextField
                    id="arrival"
                    label="Add arrival airport"
                    onChange={handleArrivalAirport}
                />
            </Grid>
            <Grid item>
                <Checkbox
                    checked={checked}
                    onChange={handleChecked}
                />
            </Grid>
            <Grid item container direction="row" justify="space-between">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={departureDate} onChange={handleStartChange} />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={arrivalDate} onChange={handleEndChange} />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
                <TextField
                    id="description"
                    label="Add Description"
                    fullWidth
                    multiline
                    onChange={handleDescriptionChange}
                />
            </Grid>
        </Grid>
    )
}

