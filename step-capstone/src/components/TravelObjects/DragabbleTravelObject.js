import React from "react";
import Draggable from "react-draggable"; // The default
import TravelObject from "./TravelObject";
import _, { clone } from "lodash";

export default class DraggableTravelObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: 0,
      anchorEl: null,
    };
    this.minPerDiv = 30.0;
    this.pixelPerDiv = 45.0;
    this.onStop = this.onStop.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.startOfDisplayDate = new Date(
      this.props.displayDate.getFullYear(),
      this.props.displayDate.getMonth(),
      this.props.displayDate.getDate(),
      0,
      0,
      0
    );
  }
  handleClose = (event) => {
    this.setState({ anchorEl: null });
  };

  onStop = (e, data) => {
    const lastY = this.state.y;
    if (lastY === data.y) {
      // Handle Click
      if (e.path[0].className.slice(0, 5) == "event")
        //to handle events
        this.onClick(e.target);
      else if (e.path[1].className.slice(0, 5) == "event")
        // to handle flights and hotels
        this.onClick(e.path[1]);
    } else {
      // Handle Drag and drop
      var cloneData = _.cloneDeep(this.props.data);
      console.log(this.props)
      const startOfDisplayDate = new Date(
        this.props.displayDate.getFullYear(),
        this.props.displayDate.getMonth(),
        this.props.displayDate.getDate(),
        0,
        0,
        0
      );

      const endOfDisplayDate = new Date(
        this.props.displayDate.getFullYear(),
        this.props.displayDate.getMonth(),
        this.props.displayDate.getDate(),
        23,
        59,
        59
      );

      var newStartDate = new Date(
        this.props.data.startDate.getTime() +
          (((data.y - this.state.y) * this.minPerDiv) / this.pixelPerDiv) * 60000
      );
      newStartDate = (newStartDate < startOfDisplayDate)? startOfDisplayDate : newStartDate;
      

      var newEndDate = new Date(
        newStartDate.getTime() +
          this.props.data.endDate.getTime() - this.props.data.startDate.getTime()
      );
      
      if (newEndDate > endOfDisplayDate) {
        newEndDate = endOfDisplayDate;
        newStartDate = new Date(
          newEndDate.getTime() - 
          (this.props.data.endDate.getTime() - this.props.data.startDate.getTime())
        );
      }

      cloneData.startDate = newStartDate;
      cloneData.endDate = newEndDate;

      this.props.onEditItem(cloneData);
      this.setState({
        y: data.y,
      });
    }
  };

  onClick(target) {
    if (this.props.data.placeId) {
      this.props.onClickObject(this.props.data.id);
    }
    this.setState({ anchorEl: target });
  }

  render() {
    return (
      <div>
        <Draggable 
          axis="y" 
          onStart={this.onStart} 
          onStop={this.onStop}
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
