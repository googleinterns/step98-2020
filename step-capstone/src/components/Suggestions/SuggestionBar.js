import React from 'react';
import { Grid, IconButton, Typography, Box } from '@material-ui/core'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import "../../styles/Suggestions.css"
import SuggestionItem from "./SuggestionItem"
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default class SuggestionBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: props.suggestions,
      startIndex: 0,
      numOfSuggestionsToDisplay: 4,
    }

    this.loadPrevious = this.loadPrevious.bind(this);
    this.loadNext = this.loadNext.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        suggestions: this.props.suggestions,
        startIndex: 0
      })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDisplayNum)
  }

  updateDisplayNum = () => {
    var suggestionWidth = window.innerWidth - 300;
    this.setState({ numOfSuggestionsToDisplay: Math.floor(suggestionWidth / 400) });
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDisplayNum);
  }

  loadPrevious() {
    let newStartIndex = this.state.startIndex - 1;
    this.setState({ startIndex: newStartIndex })
  }

  loadNext() {
    let newStartIndex = this.state.startIndex + 1;
    this.setState({ startIndex: newStartIndex })
  }

  render() {
    if (this.state.suggestions.length === 0) {
      return (
        <Box mt={10}>
          <Grid container justify="center" align-items="center">
            <ErrorOutlineIcon color="secondary" fontSize="medium" />
            <Typography variant="subtitle1" gutterBottom color="secondary">We were unable to retrieve any suggestions given your location and preferences.</Typography>
          </Grid>
        </Box>
      )
    }

    let suggestionItems = [];
    for (let i = 0; i < this.state.numOfSuggestionsToDisplay; i++) {
      suggestionItems.push(
        <Grid item className="suggestion-item-holder">
          <SuggestionItem
            suggestion={this.state.suggestions[this.state.startIndex + i]}
            context={this.props.context}
            onAddItem={this.props.onAddItem}
            travelObjects={this.props.travelObjects}
          />
        </Grid>
      );
    }

    return (
      <div id="suggestion-bar">
        <Grid id="suggestion-grid" container direction="row" justify="center" nowrap>
          <Grid item>
            <IconButton
              className="arrow-buttons"
              onClick={this.loadPrevious}
              disabled={(this.state.startIndex === 0) ? true : false}
            >
              <ArrowLeft />
            </IconButton>
          </Grid>

          <Grid item container spacing={0} id="displayed-suggestions" direction="row" wrap="nowrap" justify="space-around">
            {suggestionItems}
          </Grid>

          <Grid>
            <IconButton
              className="arrow-buttons"
              onClick={this.loadNext}
              disabled={(this.state.startIndex === this.state.suggestions.length) ? true : false}
            >
              <ArrowRight />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    )
  }
}
