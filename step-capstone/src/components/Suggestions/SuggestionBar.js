import React from 'react';
import { Grid, IconButton } from '@material-ui/core'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import "../../styles/Suggestions.css"
import SuggestionItem from "./SuggestionItem"

export default class SuggestionBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: props.suggestions,
      startIndex: 0,
      numOfSuggestionsToDisplay: 4
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

  loadPrevious() {
    let newStartIndex = this.state.startIndex - 1;
    this.setState({ startIndex: newStartIndex })
  }

  loadNext() {
    let newStartIndex = this.state.startIndex + 1;
    this.setState({ startIndex: newStartIndex })
  }

  render() {
    let suggestionItems = [];
    for (let i = 0; i < this.state.numOfSuggestionsToDisplay; i++) {
      suggestionItems.push(
        <Grid item className="suggestion-item-holder">
          <SuggestionItem
            suggestion={this.state.suggestions[this.state.startIndex + i]}
            context={this.props.context}
            onAddItem={this.props.onAddItem}
          />
        </Grid>
      );
    }
    
    return (
      <div id="suggestion-bar">
        <Grid id="suggestion-grid" container direction="row" justify="center" >
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

          <Grid item>
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
