import React from "react";
import {
    Slide,
    Paper,
    Tabs,
    Tab,
    Grid,
    Box,
    Button,
    CircularProgress,
    IconButton
} from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import "../../styles/SuggestionPopup.css"
import PreferenceForm from "../Utilities/PreferenceForm"
import { handleSuggestions } from "../../scripts/Suggestions"
import SuggestionBar from "../Suggestions/SuggestionBar"
import _ from "lodash"

export default class SuggestionPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userPref: this.getModifiedUserPref(),
            tabPos: 0,
            foodSuggestions: [],
            activitySuggestions: [],
            suggestionsLoaded: false,
        }

        this.handleUserPrefChange = this.handleUserPrefChange.bind(this);
        this.handleToggleTab = this.handleToggleTab.bind(this);
        this.renderSuggestions = this.renderSuggestions.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
    }

    componentDidUpdate(prevProps) {
        // opening
        if (!prevProps.show && this.props.show) {
            this.getSuggestions();
            // closing
        } else if (prevProps.show && !this.props.show) {
            this.setState({ suggestionsLoaded: false });
        }
    }

    equalsUserPref(prevPref, newPref) {
        return (prevPref.activityPreferences === newPref.activityPreferences
            && prevPref.foodPreferences === newPref.foodPreferences
            && prevPref.radius === newPref.radius
            && prevPref.budget === newPref.budget);
    }

    getSuggestions() {
        let prefs = this.state.suggestionsLoaded ? this.state.userPref : this.getModifiedUserPref();
        this.setState({ suggestionsLoaded: false });
        this.getActivitySuggestions(this.getConfig("activities", prefs)).then(activities => {
            this.getFoodSuggestions(this.getConfig("food", prefs)).then(foods => {
                this.setState({
                    foodSuggestions: foods,
                    activitySuggestions: activities,
                    suggestionsLoaded: true,
                    userPref: prefs,
                })
            })
        });
    }

    getModifiedUserPref() {
        let newPref = _.cloneDeep(this.props.userPref);
        newPref.radius = this.props.radius;
        newPref.timeRange = this.props.timeRange;
        newPref.coordinates = this.props.coordinates;
        return newPref;
    }

    getConfig(queryType, userPref) {
        return {
            userCategories: queryType === "activities" ? this.state.userPref.activityPreferences : this.state.userPref.foodPreferences,
            userBudget: userPref.budget,
            radius: "" + userPref.radius * 1000,
            coordinates: userPref.coordinates,
            timeRange: userPref.timeRange,
            items: this.props.items
        }
    }

    async getActivitySuggestions(config) {
        /**
         * param: 
         * config: an object with six fields: 
         *  1. userCategories: a  String array of categories 
         *  2. userBudget: an integer for budget
         *  3. radius: a string integer radius object 
         *  4. timeRange: free time range [startDate, endDate]
         *  5. coordinates: an object for coordinates
         *  6. items: set of all place ids of selected places
         * return the suggestions : an array of PlaceObject already sorted based on score
         */
        try {
            let results = await handleSuggestions(this.props.service, config, "activities");
            return results;
        } catch {
            return [];
        }

    }

    async getFoodSuggestions(config) {
        try {
            let results = await handleSuggestions(this.props.service, config, "food");
            return results;
        } catch {
            return [];
        }
    }

    handleToggleTab(event, newVal) {
        this.setState({ tabPos: newVal })
    }

    renderSuggestions() {
        if (!this.state.suggestionsLoaded) {
            return (
                <Grid container justify="center" align-items="center">
                    <Box mt={10}>
                        <CircularProgress color="secondary" />
                    </Box>
                </Grid>
            )
        }
        return (
            <SuggestionBar
                suggestions={this.state.tabPos === 0 ? this.state.activitySuggestions : this.state.foodSuggestions}
                context={{
                    finalized: this.props.finalized,
                    startDate: this.props.timeRange[0],
                    endDate: this.props.timeRange[1]
                }}
                onAddItem={this.props.onAddItem}
                travelObjects={this.props.travelObjects}
            />
        )
    }

    handleUserPrefChange(newPref) {
        if (!this.equalsUserPref(newPref, this.state.userPref)) {
            newPref.coordinates = this.state.userPref.coordinates;
            this.setState({
                userPref: newPref
            })
        }
    }

    render() {
        return (
            <Slide direction="up" in={this.props.show} mountOnEnter mountonexit="true">
                <Paper elevation={10} id="suggestion-component">
                    <Grid container direction="row" nowrap>
                        <Grid item>
                            <Box
                                width={300}
                                height={350}
                                className="scroll"
                                px={3}
                            >
                                <PreferenceForm
                                    pref={this.state.suggestionsLoaded ? this.state.userPref : this.getModifiedUserPref()}
                                    onChange={this.handleUserPrefChange}
                                />
                                <Box my={2}>
                                    <Button
                                        color="primary"
                                        onClick={this.getSuggestions}
                                    >
                                        Apply changes
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Box width={"100%"} height={"100%"}>
                                <Tabs
                                    variant="fullWidth"
                                    indicatorColor="secondary"
                                    onChange={this.handleToggleTab}
                                    value={this.state.tabPos}
                                >
                                    <Tab label="Activities" />
                                    <Tab label="Food" />
                                </Tabs>
                                {this.renderSuggestions()}
                            </Box>
                        </Grid>
                        <Grid item>
                            <IconButton
                                color="secondary"
                                aria-label="close"
                                onClick={this.props.onClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Slide>
        )
    }

}