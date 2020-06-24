import React from 'react'
import { Typography, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Paper, Box, Tabs, Tab } from '@material-ui/core'

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
        console.log("rendering tab")
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

    return (
        <TextField id="title" label="Add Title" />
    )
}

function AddHotel(props) {

}

function AddFlight(props) {

}

