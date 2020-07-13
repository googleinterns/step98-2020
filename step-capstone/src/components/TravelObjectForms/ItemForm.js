import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Paper,
    Tabs,
    Tab,
    Typography,
    Box
} from '@material-ui/core';
import AddEvent from '../TravelObjectForms/AddEvent';
import AddHotel from '../TravelObjectForms/AddHotel';
import AddFlight from '../TravelObjectForms/AddFlight';


export default class ItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewItem: props.data === undefined,
            value: 0,
            data: props.data,
            isValidated: false
        }

        this.handleToggleTab = this.handleToggleTab.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleToggleValidation = this.handleToggleValidation.bind(this);
    }

    renderDeleteButton() {
        return (this.props.data === undefined)
            ? null
            : <Button
                onClick={() => this.props.onRemoveItem(this.state.data)}
                color="primary"
                size="small"
            >
                Delete
            </Button>;
    }

    // clears data when tab is changed
    handleToggleTab(event, newVal) {
        this.setState({
            value: newVal,
            data: undefined
        });
    }

    /* Mimic Google Calendar's behavior: when user edits the newStartDate to be bigger than the current endDate,
    this function will automatically reset the endDate to be bigger than the newStartDate by the same duration as before editting.
    This behavior happends during editting, so the user can never submit an invalid time range.
    */
    handleStartDateChange(newData) {
        if (this.state.data.endDate <= newData.startDate) {
            var newEndDate = new Date(newData.startDate);
            newEndDate.setTime(newData.startDate.getTime() + this.state.data.endDate.getTime() - this.state.data.startDate.getTime());
            newData.endDate = newEndDate;
        }
    }
    /* Mimic Google Calendar's behavior: when user edits the newEndDate to be smaller than the current startDate,
    this function will automatically reset the startDate to be smaller than the newEndDate by the same duration as before editting.
    This behavior happends during editting, so the user can never submit an invalid time range. 
    */
    handleEndDateChange(newData) {
        if (this.state.data.startDate >= newData.endDate) {
            var newStartDate = new Date(newData.endDate);
            newStartDate.setTime(newData.endDate.getTime() - this.state.data.endDate.getTime() + this.state.data.startDate.getTime());
            newData.startDate = newStartDate;
        }
    }

    handleDataChange(newData) {
        if (this.state.data !== undefined) {
            if (newData.startDate !== this.state.data.startDate) {
                this.handleStartDateChange(newData);
            }
            else if (newData.endDate !== this.state.data.endDate) {
                this.handleEndDateChange(newData);
            }
        }

        this.setState({
            data: newData
        })
    }

    // sets validation state to indicate whether or not all required inputs are filled out
    handleToggleValidation(validated) {
        if (validated !== this.state.isValidated) {
            this.setState({
                isValidated: validated
            })
        }
    }

    getForm() {
        let isNew = this.state.isNewItem;
        if ((!isNew && this.state.data.type === "event") || (isNew && this.state.value === 0)) {
            return (
                
                <AddEvent
                    onDataChange={this.handleDataChange}
                    data={this.state.data}
                    onToggleValidation={this.handleToggleValidation}
                    startDate={this.props.startDate}
                />
            )
        } else if ((!isNew && this.state.data.type === "flight") || (isNew && this.state.value === 1)) {
            return (
                <AddFlight
                    onDataChange={this.handleDataChange}
                    data={this.state.data}
                    onToggleValidation={this.handleToggleValidation}
                    startDate={this.props.startDate}
                />
            )
        } else {
            return (
                <AddHotel
                    onDataChange={this.handleDataChange}
                    data={this.state.data}
                    onToggleValidation={this.handleToggleValidation}
                    startDate={this.props.startDate}
                />
            )
        }
    }

    handleSave() {
        // Doesn't save data if improper input --> doesn't close popover which shows error
        if (!this.state.isValidated) {
            return;
        }
        if (this.state.isNewItem) {
            this.props.onAddItem(this.state.data);
        } else {
            this.props.onEditItem(this.state.data);
        }

        this.props.onClose();
    }

    // renders tab if user presses add button to create a new item
    // otherwise only the form should show for editing
    renderTab() {
        if (this.state.isNewItem) {
            return (
                <Paper>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleToggleTab}
                        variant="fullWidth"
                        indicatorColor="primary"
                    >
                        <Tab label="Event" />
                        <Tab label="Flight" />
                        <Tab label="Hotel" />
                    </Tabs>
                </Paper>
            )
        }
        return (
            <Typography variant="h4" gutterBottom>{this.state.data.type.charAt(0).toUpperCase() + this.state.data.type.slice(1)}</Typography>
        );
    }

    render() {
        return (
            <Card id="add-form-container">
                <CardContent>
                    {this.renderTab()}
                    {this.getForm()}
                </CardContent>
                <CardActions>
                    <Button onClick={this.props.onClose} size="small" color="primary">Cancel</Button>
                    <Button onClick={this.handleSave} size="small" color="primary">Save</Button>
                    {this.renderDeleteButton()}
                </CardActions>
            </Card>
        )
    }
}


