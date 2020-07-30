import React from 'react'
import {
    Grid,
    Typography,
    Box,
    FormControl,
    FormControlLabel,
    MenuItem,
    InputLabel,
    Select,
    Slider,
    FormLabel,
    FormGroup,
    Checkbox
} from "@material-ui/core"
import FoodTimeForm from "./FoodTimeForm"
import DayStartEndPref from "./DayStartEndPref"

export default class PreferenceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: this.props.pref.budget,
            radius: this.props.pref.radius,
            activityPreferences: this.props.pref.activityPreferences,
            foodPreferences: this.props.pref.foodPreferences,
            foodTimeRanges: this.props.pref.foodTimeRanges,
            dayStartEndTimes: this.props.pref.dayStartEndTimes
        }
    }

    componentDidUpdate(prevState) {
        if (prevState !== this.state) {
            this.props.onChange(this.state);
        }
    }

    handleBudgetChange = (event) => {
        this.setState({ budget: event.target.value });
    }

    handleRadiusChange = (event, newValue) => {
        this.setState({ radius: newValue })
    }
    ß
    handleActivityPreferenceCheck = (event) => {
        this.togglePreferenceHelper("activityPreferences", event.target.name)
    }

    handleFoodPreferenceCheck = (event) => {
        this.togglePreferenceHelper("foodPreferences", event.target.name)
    }

    handleFoodTimeRangesChange = (timeranges) => {
        this.setState({ foodTimeRanges: timeranges });
    }

    handleDayStartEndChange = (timerange) => {
        this.setState({ dayStartEndTimes: timerange })
    }

    togglePreferenceHelper = (listName, pref) => {
        if (!this.state[listName].includes(pref)) {
            this.setState({ [listName]: this.state[listName].concat([pref]) })
        } else {
            this.setState({ [listName]: this.state[listName].filter(activity => activity !== pref) })
        }
    }

    render() {
        return (
            <Box mt={2}>
                <Grid container>
                    <Grid item>
                        <Typography variant="h5" gutterBottom>Preferences</Typography>
                        <Typography variant="subtitle2" gutterBottom>Select your own preferences and we'll give you custom suggestions for food and activities!</Typography>
                    </Grid>
                    <Grid container item direction="column">
                        <Grid item>
                            <Box mb={1}>
                                <FormControl>
                                    <InputLabel>Budget</InputLabel>
                                    <Select
                                        value={this.state.budget}
                                        onChange={this.handleBudgetChange}
                                        displayEmpty
                                    >
                                        <MenuItem value={0}></MenuItem>
                                        <MenuItem value={1}>$</MenuItem>
                                        <MenuItem value={2}>$$</MenuItem>
                                        <MenuItem value={3}>$$$</MenuItem>
                                        <MenuItem value={4}>$$$$</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box mb={1}>
                                <Typography gutterBottom>Radius (in kilometers)</Typography>
                                <Slider
                                    value={this.state.radius}
                                    onChange={this.handleRadiusChange}
                                    step={.5}
                                    valueLabelDisplay="auto"
                                    min={.5}
                                    max={50}
                                />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box mb={1}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Activity Preferences</FormLabel>
                                    <Grid container direction="row">
                                        <Grid item>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.activityPreferences.includes("shopping")}
                                                            color="primary"
                                                            onChange={this.handleActivityPreferenceCheck}
                                                            name="shopping"
                                                        />
                                                    }
                                                    label="Shopping"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.activityPreferences.includes("beauty")}
                                                            color="primary"
                                                            onChange={this.handleActivityPreferenceCheck}
                                                            name="beauty"
                                                        />
                                                    }
                                                    label="Self-care / Beauty"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.activityPreferences.includes("entertainment")}
                                                            color="primary"
                                                            onChange={this.handleActivityPreferenceCheck}
                                                            name="entertainment"
                                                        />
                                                    }
                                                    label="Entertainment"
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.activityPreferences.includes("familyFriendly")}
                                                            color="primary"
                                                            onChange={this.handleActivityPreferenceCheck}
                                                            name="familyFriendly"
                                                        />
                                                    }
                                                    label="Family Friendly"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.activityPreferences.includes("nightlife")}
                                                            color="primary"
                                                            onChange={this.handleActivityPreferenceCheck}
                                                            name="nightlife"
                                                        />
                                                    }
                                                    label="Nightlife"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.activityPreferences.includes("outdoors")}
                                                            color="primary"
                                                            onChange={this.handleActivityPreferenceCheck}
                                                            name="outdoors"
                                                        />
                                                    }
                                                    label="Outdoors / active"
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item >
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.activityPreferences.includes("artsAndCulture")}
                                                            color="primary"
                                                            onChange={this.handleActivityPreferenceCheck}
                                                            name="artsAndCulture"
                                                        />
                                                    }
                                                    label="Arts and Culture"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.activityPreferences.includes("sightseeing")}
                                                            color="primary"
                                                            onChange={this.handleActivityPreferenceCheck}
                                                            name="sightseeing"
                                                        />
                                                    }
                                                    label="Sightseeing"
                                                />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Food Preferences</FormLabel>
                                <Grid container direction="row">
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.foodPreferences.includes("bakery")}
                                                    color="primary"
                                                    onChange={this.handleFoodPreferenceCheck}
                                                    name="bakery"
                                                />
                                            }
                                            label="Bakery"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.foodPreferences.includes("cafe")}
                                                    color="primary"
                                                    onChange={this.handleFoodPreferenceCheck}
                                                    name="cafe"
                                                />
                                            }
                                            label="Cafe"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.foodPreferences.includes("restaurant")}
                                                    color="primary"
                                                    onChange={this.handleFoodPreferenceCheck}
                                                    name="restaurant"
                                                />
                                            }
                                            label="Restaurant"
                                        />
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </Grid>
                        <DayStartEndPref dayStartEndTimes={this.state.dayStartEndTimes} onChange={this.handleDayStartEndChange} />
                        <FoodTimeForm foodTimeRanges={this.state.foodTimeRanges} onChange={this.handleFoodTimeRangesChange} />
                    </Grid>
                </Grid>
            </Box>
        )
    }
}