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
      startIndex: 0
    }

    this.loadPrevious = this.loadPrevious.bind(this);
    this.loadNext = this.loadNext.bind(this);
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
    return (
      <div id="suggestion-bar">
        <Grid id="suggestion-grid" container direction="row" wrap="nowrap" justify="center" >
          <Grid item>
            <IconButton
              className="arrow-buttons" 
              onClick={this.loadPrevious}
              disabled={(this.state.startIndex === 0) ? true : false}
            >
              <ArrowLeft />
            </IconButton>
          </Grid>

          <Grid item container id="displayed-suggestions" direction="row" wrap="nowrap" justify="space-around">
            <Grid item className="suggestion-item-holder">
              <SuggestionItem 
                suggestion={this.state.suggestions[this.state.startIndex]} 
                context={this.props.context}
                onAddItem={this.props.onAddItem}
              />
            </Grid>
            <Grid item className="suggestion-item-holder">
              <SuggestionItem 
                suggestion={this.state.suggestions[this.state.startIndex + 1]}
                context={this.props.context}
                onAddItem={this.props.onAddItem}
              />
            </Grid>
            <Grid item className="suggestion-item-holder">
              <SuggestionItem 
                suggestion={this.state.suggestions[this.state.startIndex + 2]} 
                context={this.props.context}
                onAddItem={this.props.onAddItem}
              />
            </Grid>
          </Grid>

          <Grid item>
            <IconButton
              className="arrow-buttons" 
              onClick={this.loadNext}
              disabled={(this.state.startIndex === this.state.suggestions.length) ? true : false}
            >
              <ArrowRight/>
            </IconButton>
          </Grid>
        </Grid>
      </div>
    )
  }
}
