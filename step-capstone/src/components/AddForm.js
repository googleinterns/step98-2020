import React from 'react'
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Paper,
    Tabs,
    Tab,
} from '@material-ui/core';
import AddEventHotel from './AddEventHotel'
import AddFlight from './AddFlight'


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


