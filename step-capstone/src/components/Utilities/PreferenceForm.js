import React from 'react'
import {
    Grid,
    Typography,
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    MenuItem,
    InputLabel,
    Select,
    Slider,
    FormLabel,
    FormGroup,
    Checkbox
} from "@material-ui/core"

export default class PreferenceForm extends React.Component {
    constructor() {
        super();
        this.state = {
            budget: 2,
            radius: 10,
            activityPreferences: [],
            foodPreferences: []
        }
    }

    handleBudgetChange = (event) => {
        this.setState({ budget: event.target.value });
    }

    handleRadiusChange = (event) => {
        this.setState({ radius: event.target.value })
    }

    handleActivityPreferenceCheck = (event) => {
        this.togglePreferenceHelper("activityPreferences", event.target.name)
    }

    handleFoodPreferenceCheck = (event) => {
        this.togglePreferenceHelper("foodPreferences", event.target.name)
    }

    togglePreferenceHelper = (listName, pref) => {
        if (!this.state[listName].includes(pref)) {
            this.setState({ [listName]: this.state[listName].concat([pref])})
        } else {
           this.setState({ [listName]: this.state[listName].filter(activity => activity !== pref)}) 
        }
        console.log(this.state);
    }

    render() {
        return (
            <Box mt={2}>
                <Grid container>
                    <Grid item>
                        <Typography variant="h5" gutterBottom>Preferences</Typography>
                        <Typography variant="subtitle2" gutterBottom>Select your own preferences and we'll give you custom suggestions for foor and activities!</Typography>
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
                                    <FormHelperText>We won't give you anything above this price!</FormHelperText>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box mb={1}>
                                <Typography gutterBottom>Radius (in kilometers)</Typography>
                                <Slider
                                    defaultValue={this.state.radius}
                                    getAriaValueText={this.radiusText}
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
                                        <Grid item direction="column">
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={this.handleActivityPreferenceCheck} name="shopping" />}
                                                    label="Shopping"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={this.handleActivityPreferenceCheck} name="beauty" />}
                                                    label="Self-care / Beauty"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={this.handleActivityPreferenceCheck} name="entertainment" />}
                                                    label="Entertainment"
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item direction="column">
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={this.handleActivityPreferenceCheck} name="familyFriendly" />}
                                                    label="Family Friendly"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={this.handleActivityPreferenceCheck} name="nightlife" />}
                                                    label="Nightlife"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={this.handleActivityPreferenceCheck} name="outdoors" />}
                                                    label="Outdoors / active"
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item direction="column">
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={this.handleActivityPreferenceCheck} name="artsAndCulture" />}
                                                    label="Arts and Culture"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox onChange={this.handleActivityPreferenceCheck} name="sightseeing" />}
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
                                                control={<Checkbox onChange={this.handleFoodPreferenceCheck} name="bakery" />}
                                                label="Bakery"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel
                                                control={<Checkbox onChange={this.handleFoodPreferenceCheck} name="cafe" />}
                                                label="Cafe"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel
                                                control={<Checkbox onChange={this.handleFoodPreferenceCheck} name="restaurant" />}
                                                label="Restaurant"
                                            />
                                        </Grid>
                                </Grid>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}