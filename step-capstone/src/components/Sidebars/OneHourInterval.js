import React, { useState, useEffect } from "react";
import TravelObject from "../TravelObjects/TravelObject";
import { sameDate } from "../../scripts/HelperFunctions";
import PreferencePopover from "./PreferencePopover";

export default function OneHourInterval(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [slots, setSlots] = useState(null);
  const displayHeightOfADiv = 45.0;
  const padding = 22.0;
  const minPerDiv = 30.0;

  const handleOnClickInterval = (idV, event) => {
    console.log("User has just clicked in ", idV);
    let data = props.onClickInterval(idV);
    console.log(data);
    if (data.curSlot !== null) {
      console.log("in");
      console.log(event.currentTarget);
      setAnchorEl(event.currentTarget);
      setSlots(data);
    }
  };

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
      console.log((dif * displayHeightOfADiv) / minPerDiv - padding);
    }
    return (dif * displayHeightOfADiv) / minPerDiv - padding;
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
        <TravelObject
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
      <PreferencePopover anchorEl={anchorEl} slots={slots} />
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
    </div>
  );
}
