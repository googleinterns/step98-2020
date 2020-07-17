import React, { useState, useEffect } from 'react';
import TravelObject from '../TravelObjects/TravelObject';
import {sameDate} from "../../scripts/HelperFunctions";

export default function OneHourInterval(props) {

    const displayHeightOfADiv = 45.0;
    const padding = 22.0;
    const minPerDiv = 30.0;
  
    const handleOnClickInterval = (idV) => {
      console.log("User has just clicked in ", idV);
      props.onClickInterval(idV);
    }
  
    /*Given startDate and endDate of a TravelObject, return the height of display (unit: pixel) */
    const getHeightPercentage = (startDate, endDate) => {
      let dif = 0;
      if (sameDate(startDate, endDate)) {
        dif = endDate.getHours() * 60 + endDate.getMinutes() - startDate.getHours() * 60 - startDate.getMinutes();
      } else if (!sameDate(props.displayDate, endDate)) {
        dif = 24 * 60 - startDate.getHours() * 60 - startDate.getMinutes();
      } else {
        dif = endDate.getHours() * 60 + endDate.getMinutes();
        console.log(dif * displayHeightOfADiv / minPerDiv - padding);
      }
      return dif * displayHeightOfADiv / minPerDiv - padding;
    }
  
    const getHeightFromMin = (min) => {
      return min * displayHeightOfADiv / minPerDiv - padding;
    }
  
    /*Given a startDate of a TravelObject, return the top pixel*/
    const getTopPixel = (startDate) => {
      if (!sameDate(props.displayDate, startDate)) {
        return 0;
      }
      let dif = (startDate.getMinutes() < 30) ? startDate.getMinutes() : startDate.getMinutes() - 30;
      return dif / minPerDiv * displayHeightOfADiv;
    }
  
    var item00 = [];
    var item30 = [];
  
    if (props.items !== null) {
      props.items.forEach((item) => {
        let height = item.data.type === "hotel"
          ? getHeightFromMin(30)
          : getHeightPercentage(item.data.startDate, item.data.endDate);
        let top = item.data.type === "hotel"
          ? getTopPixel(item.data.endDate)
          : getTopPixel(item.data.startDate);
  
        let travelObject = <TravelObject
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
            zIndex: props.zIndex.toString()
          }}
        />
  
        if (item.div === ":00") {
          item00.push(travelObject);
        } else if (item.div === ":30") {
          item30.push(travelObject);
        }
      })
    }
    return (
      <div className="OneHourInterval">
        <tr className="OneHourInterval">
          <td className="headcol">{props.idV + ":00"}</td>
          <td className="Interval" id={props.idV + ":00"} onClick={() => handleOnClickInterval(props.idV + ":00")}>
            {item00.length === 0 ? null : item00}
          </td>
        </tr>
        <tr className="OneHourInterval">
          <td className="headcol"></td>
          <td className="Interval" id={props.idV + ":30"} onClick={() => handleOnClickInterval(props.idV + ":30")}>
            {item30.length === 0 ? null : item30}
          </td>
        </tr>
      </div>
    )
  }