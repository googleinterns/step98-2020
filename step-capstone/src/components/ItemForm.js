import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Paper,
    Tabs,
    Tab,
} from '@material-ui/core';
import AddEvent from './AddEvent';
import AddHotel from './AddHotel';
import AddFlight from './AddFlight';


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
                />
            )
        } else if ((!isNew && this.state.data.type === "flight") || (isNew && this.state.value === 1)) {
            return (
                <AddFlight
                    onDataChange={this.handleDataChange}
                    data={this.state.data}
                    onToggleValidation={this.handleToggleValidation}
                />
            )
        } else {
            return (
                <AddHotel
                    onDataChange={this.handleDataChange}
                    data={this.state.data}
                    onToggleValidation={this.handleToggleValidation}
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
                    >
                        <Tab label="Event" />
                        <Tab label="Flight" />
                        <Tab label="Hotel" />
                    </Tabs>
                </Paper>
            )
        }
        return null;
    }

    render() {
        return (
            <Card id="add-form-container" style={{height: "350px"}}>
                <CardContent>
                    {this.renderTab()}
                    {this.getForm()}
                </CardContent>
                <CardActions>
                    <Button onClick={this.state.onClose} size="small">Cancel</Button>
                    <Button onClick={this.handleSave} size="small">Save</Button>
                    <Button onClick={() => this.props.onRemoveItem(this.state.data.id)} size="small">Delete</Button>
                </CardActions>
            </Card>
        )
    }
}


