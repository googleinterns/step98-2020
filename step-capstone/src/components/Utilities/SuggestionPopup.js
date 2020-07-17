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
import PreferenceForm from "./PreferenceForm"
import { handleSuggestions } from "../../scripts/Suggestions"

export default class SuggestionPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userPref: this.props.userPref,
            coordinates: this.props.coordinates,
            timeRange: this.props.timeRange,
            items: this.props.items,
            tabPos: 0,
            foodSuggestions: [],
            activitySuggestions: [],
            suggestionsLoaded: false,
            radius: this.props.radius
        }

        this.handleUserPrefChange = this.handleUserPrefChange.bind(this);
        this.handleToggleTab = this.handleToggleTab.bind(this);
        this.renderSuggestions = this.renderSuggestions.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
    }

    componentDidMount() {
        // this.getSuggestions();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.show && this.props.show) {
            this.getSuggestions();
        }
    }

    equalsUserPref(prevPref, newPref) {
        return (prevPref.activityPreferences === newPref.activityPreferences
            || prevPref.foodPreferences === newPref.foodPreferences
            || prevPref.radius === newPref.radius
            || prevPref.budget === newPref.budget);
    }

    getSuggestions() {
        this.setState({ suggestionsLoaded: false });
        this.getActivitySuggestions(this.getConfig("activities")).then(activities => {
            this.getFoodSuggestions(this.getConfig("food")).then(foods => {
                if (this.state.radius) {
                    var updatedPref = this.state.userPref;
                    updatedPref.radius = this.state.radius;
                }
                this.setState({
                    foodSuggestions: foods,
                    activitySuggestions: activities,
                    suggestionsLoaded: true,
                    userPref: updatedPref
                })
            })
        });
    }

    getConfig(queryType) {
        return {
            userCategories: queryType === "activities" ? this.state.userPref.activityPreferences : this.state.userPref.foodPreferences,
            userBudget: this.state.userPref.budget,
            radius: "" + this.state.userPref.radius * 1000,
            coordinates: this.props.coordinates,
            timeRange: this.props.timeRange,
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
        let results = await handleSuggestions(this.props.service, config, "activities");
        return results;
    }

    async getFoodSuggestions(config) {
        let results = await handleSuggestions(this.props.service, config, "food");
        return results;
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
        // TODO: Suggestion component
        if (this.state.tabPos === 0) {
            console.log("Activities: ", this.state.activitySuggestions)
        } else {
            console.log("Food: ", this.state.foodSuggestions)
        }
    }

    handleUserPrefChange(newPref) {
        if (newPref !== this.state.userPref) {
            this.setState({
                userPref: newPref
            })
        }
    }

    render() {
        return (
            <Slide direction="up" in={this.props.show} mountOnEnter mountonexit="true">
                <Paper elevation={10} id="suggestion-component">
                    <Grid container direction="row">
                        <Grid item>
                            <Box
                                width={300}
                                height={350}
                                className="scroll"
                                px={3}
                            >
                                <PreferenceForm
                                    pref={this.props.userPref}
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