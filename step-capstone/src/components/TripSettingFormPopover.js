import React, {useState, useEffect} from 'react'
import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    Grid,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { isValid } from 'date-fns';



export default class TripSettingFormPopover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidated : false,
            tripSetting : this.props.tripSetting
        };
        this.handleValidation = this.handleValidation.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleValidation(isValidated) {
        if (this.state.isValidated != isValidated) {
            this.setState({isValidated : isValidated});
        }
    }

    handleDataChange(newTripSetting) {
        this.setState({tripSetting: newTripSetting});
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
            <Card id="add-form-container" style={{height: "350px"}}>
                <CardContent>
                    <EditTripSetting 
                        tripSetting = {this.props.tripSetting}
                        onValidation = {this.handleValidation}
                        onDataChange = {this.handleDataChange}
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
    const [destinations, setDestinations] = useState(props.tripSetting.destinations);
    const [timeStart, setTimeStart] = useState(props.tripSetting.timeStart);
    const [timeEnd, setTimeEnd] = useState(props.tripSetting.timeEnd);
    const [description, setDescription] = useState(props.tripSetting.description);

    const handleDestinationsChange = (event) => {
        setDestinations(event.target.value);
    }

    const handleTimeStartChange = (timeStart) => {
        setTimeStart(timeStart);
    }

    const handleTimeEndChange = (timeEnd) => {
        setTimeEnd(timeEnd);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    useEffect(() => {
        props.onDataChange({
            destinations : destinations,
            timeStart : timeStart,
            timeEnd : timeEnd,
            description :  description
        })
        // notifies form if necessary inputs are present
        props.onValidation(!(destinations === ""))
    }, [destinations, timeStart, timeEnd, description])

    // Users must input destinations --> renders error input if not
    let renderDestinations = () => {
        if (destinations === "") {
            return (
                <TextField
                    error
                    helperText="Cannot leave field blank, list your destinations, and separate them using comma"
                    id="destinations"
                    label={"Destinations"}
                    defaultValue={destinations}
                    onChange={handleDestinationsChange}
                />
            )
        } else {
            return (
                <TextField
                    helperText="List your destinations and separate them using comma"
                    id="destinations"
                    label={"Destinations"}
                    defaultValue={destinations}
                    onChange={handleDestinationsChange}
                />
            )
        }
    }

    return (
        <Grid container direction="column">
            <Grid item container direction="row" justify="space-between">
                {renderDestinations()}
            </Grid>
            <Grid item>
            </Grid>
            <Grid item container direction="row" justify="space-between">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="timeStart"
                        label="Date Start"
                        value={timeStart}
                        onChange={handleTimeStartChange}
                    />

                    <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="timeEnd"
                        label="Date End"
                        value={timeEnd}
                        onChange={handleTimeEndChange}
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
        </Grid>
    )
}

