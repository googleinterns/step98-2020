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


export default class ItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewItem: props.data === undefined,
            value: 0,
            onClose: props.onClose,
            onAddItem: props.onAddItem,
            onEditItem: props.onEditItem,
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
                <AddEventHotel
                    onDataChange={this.handleDataChange}
                    type="event"
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
                <AddEventHotel
                    onDataChange={this.handleDataChange}
                    type="hotel"
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
            this.state.onAddItem(this.state.data);
        } else {
            this.state.onEditItem(this.state.data);
        }
        
        this.state.onClose();
    }

    renderCardContent() {
        if (this.state.isNewItem) {
            return (
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
            )
        } else {
            return (
                <CardContent>
                    {this.getForm()}
                </CardContent>
            )
        }
    }

    render() {
        return (
            <Card id="add-form-container">
                {this.renderCardContent()}
                <CardActions>
                    <Button onClick={this.state.onClose} size="small">Cancel</Button>
                    <Button onClick={this.handleSave} size="small">Save</Button>
                </CardActions>
            </Card>
        )
    }
}


