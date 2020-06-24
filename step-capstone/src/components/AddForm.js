import React from 'react'
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
    Tab
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
            data: undefined
        }
        this.handleToggleTab = this.handleToggleTab.bind(this);
    }

    handleToggleTab() {
        let newVal = this.state.value < 2 ? this.state.value + 1 : 0
        this.setState({
            value: newVal
        });
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
                    <AddEvent />
                </CardContent>
                <CardActions>
                    <Button onClick={this.state.onClose} size="small">Cancel</Button>
                    <Button onClick={() => this.state.onAddItem(this.state.data)} size="small">Create</Button>
                </CardActions>
            </Card>
        )
    }
}

function AddEvent(props) {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <Grid container direction="column">
            <Grid item>
                <TextField id="title" label="Add Title" fullWidth/>
            </Grid>
            <Grid item container direction="row" justify="space-between">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={selectedDate} onChange={handleDateChange} />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={selectedDate} onChange={handleDateChange} />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
                <TextField id="location" label="Add Location" fullWidth/>
            </Grid>
            <Grid item>
                <TextField id="description" label="Add Description" fullWidth multiline/>
            </Grid>
        </Grid>
    )
}

function AddHotel(props) {

}

function AddFlight(props) {

}

