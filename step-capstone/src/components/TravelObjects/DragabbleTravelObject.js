import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable"; // The default
import TravelObject from "./TravelObject";

export default class DraggableTravelObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: 0,
      anchorEl: null
    };
    this.onStop = this.onStop.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose = (event) => {
    this.setState({anchorEl: null});
  };

  onStop = (e, data) => {
    const lastY = this.state.y;
    if (lastY === data.y) {
      if(e.target.className.slice(0, 5) == "event")
      //TODO: handle flights and hotel
        this.onClick(e.target);
    } else {
      //TODO: calculate the current Time and then setState of y to be 0 again
      this.setState({
        y: data.y,
      });
    }
  }

  onClick(target) {
    if (this.props.data.placeId) {
      this.props.onClickObject(this.props.data.id);
    }
    this.setState({anchorEl: target})
  }

  render() {
    console.log("hey rerendering with new state ", this.state.y);
    return (
      <div>
        <Draggable
          axis="y"
          onStop= {this.onStop}
        >
          <div
            style={{
              position: "absolute",
              zIndex: "100",
              background: "red",
              width: "100",
              height: "100",
            }}
          >
            <TravelObject
              {...this.props}
              anchorEl={this.state.anchorEl}
              handleClose={this.handleClose}
            />
          </div>
        </Draggable>
      </div>
    );
  }
}
