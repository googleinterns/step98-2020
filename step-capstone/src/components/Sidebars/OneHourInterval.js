import React, { useState } from "react";
import { sameDate } from "../../scripts/HelperFunctions";
import InsertObjectPopover from "./InsertObjectPopover"
import DraggableTravelObject from "../TravelObjects/DragabbleTravelObject";

export default function OneHourInterval(props) {
  const [slots, setSlots] = useState(null);
  const displayHeightOfADiv = 45.0;
  const padding = 22.0;
  const minPerDiv = 30.0;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOnClickInterval = (idV, event) => {
    if (event.target.className === "Interval") {
      let data = props.onClickInterval(idV);
      if (data.freeTimeSlot !== undefined) {
        setSlots(data);
        setAnchorEl(event.currentTarget)
      }
    }
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  /*Given startDate and endDate of a TravelObject, return the height of display (unit: pixel) */
  const getHeightPercentage = (startDate, endDate) => {
    let dif = 0;
    if (sameDate(startDate, endDate)) {
      dif =
        endDate.getHours() * 60 +
        endDate.getMinutes() -
        startDate.getHours() * 60 -
        startDate.getMinutes();
    } else if (!sameDate(props.displayDate, endDate)) {
      dif = 24 * 60 - startDate.getHours() * 60 - startDate.getMinutes();
    } else {
      dif = endDate.getHours() * 60 + endDate.getMinutes();
    }

    let height = (dif * displayHeightOfADiv) / minPerDiv
    return  height < padding ? 0 : height - padding;
  };

  const getHeightFromMin = (min) => {
    return (min * displayHeightOfADiv) / minPerDiv - padding;
  };

  /*Given a startDate of a TravelObject, return the top pixel*/
  const getTopPixel = (startDate) => {
    if (!sameDate(props.displayDate, startDate)) {
      return 0;
    }
    let dif =
      startDate.getMinutes() < 30
        ? startDate.getMinutes()
        : startDate.getMinutes() - 30;
    return (dif / minPerDiv) * displayHeightOfADiv;
  };

  var item00 = [];
  var item30 = [];

  if (props.items !== null) {
    props.items.forEach((item) => {
      let height =
        item.data.type === "hotel"
          ? getHeightFromMin(30)
          : getHeightPercentage(item.data.startDate, item.data.endDate);
      let top =
        item.data.type === "hotel"
          ? getTopPixel(item.data.endDate)
          : getTopPixel(item.data.startDate);

      let travelObject = (
        <DraggableTravelObject
          key={item.data.id}
          data={item.data}
          onRemoveItem={props.onRemoveItem}
          onEditItem={props.onEditItem}
          onAddItem={props.onAddItem}
          onClickObject={props.onClickObject}
          styleConfig={{
            top: top.toString() + "px",
            height: height.toString() + "px",
            width: "216px",
            overflowY: "scroll",
            position: "absolute",
            zIndex: props.zIndex.toString(),
          }}
        />
      );

      if (item.div === ":00") {
        item00.push(travelObject);
      } else if (item.div === ":30") {
        item30.push(travelObject);
      }
    });
  }
  return (
    <div className="OneHourInterval">
      <tr className="OneHourInterval">
        <td className="headcol">{props.idV + ":00"}</td>
        <td
          className="Interval"
          id={props.idV + ":00"}
          onClick={(event) => handleOnClickInterval(props.idV + ":00", event)}
        >
          {item00.length === 0 ? null : item00}
        </td>
      </tr>
      <tr className="OneHourInterval">
        <td className="headcol"></td>
        <td
          className="Interval"
          id={props.idV + ":30"}
          onClick={(event) => handleOnClickInterval(props.idV + ":30", event)}
        >
          {item30.length === 0 ? null : item30}
        </td>
      </tr>
      <InsertObjectPopover
        anchorEl={anchorEl}
        slots={slots}
        onClickTimeslot={props.onClickTimeslot}
        onAddItem={props.onAddItem}
        onOpenSuggestions={props.onOpenSuggestions}
        onClose={handleClose}
        startDate={props.startDate}
      />
    </div>
  );
}
