import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TravelObject from './TravelObject';
import FinalizedHeader from './FinalizedHeader';
import '../styles/TimeLine.css';

/*Given 2 Date objects, return true if they have the same date; return false otherwise */
const sameDate = (timeA, timeB) => {
  return (timeA.getDate() === timeB.getDate() && timeA.getMonth() === timeB.getMonth() && timeA.getFullYear() === timeB.getFullYear());
}

function OneHourInterval(props) {

  const displayHeightOfADiv = 48.0;
  const padding = 16.0;
  const minPerDiv = 30.0;

  const handleOnClickInterval = (idV) => {
    console.log(idV);
  }


  /*Given startDate and endDate of a TravelObject, return the height of display (unit: pixel) */
  const getHeightPercentage = (startDate, endDate) => {
    let dif = 0;
    if (sameDate(startDate, endDate)) {
      dif = endDate.getHours() * 60 + endDate.getMinutes() - startDate.getHours() * 60 - startDate.getMinutes();

    } else if (sameDate(props.displayDate, startDate)) {
      dif = 24 * 60 - startDate.getHours() * 60 - startDate.getMinutes();

    } else {
      dif = endDate.getHours() * 60 + endDate.getMinutes();
    }
    return dif * displayHeightOfADiv / minPerDiv - padding;
  }

  /*Given a startDate of a TravelObject, return the top pixel*/
  const getTopPixel = (startDate) => {
    if (!sameDate(props.displayDate, startDate)) {
      return 0;
    }
    let dif = (startDate.getMinutes() < 30) ? startDate.getMinutes() : startDate.getMinutes() - 30;
    return dif / minPerDiv * displayHeightOfADiv;
  }

  var item00 = null;
  var item30 = null;

  if (props.item !== null) {
    let height = getHeightPercentage(props.item.startDate, props.item.endDate);
    let top = getTopPixel(props.item.startDate);
    if (props.div === ":00") {
      item00 = <TravelObject
        key={props.item.id}
        data={props.item}
        onRemoveItem={props.onRemoveItem}
        onEditItem={props.onEditItem}
        onAddItem={props.onAddItem}
        styleConfig={{
          top: top.toString() + "px",
          height: height.toString() + "px",
          width: "228px",
          overflowY: "scroll",
          position: "absolute",
          zIndex: props.zIndex.toString()
        }}
      />
    } else if (props.div === ":30") {
      item30 = <TravelObject
        key={props.item.id}
        data={props.item}
        onRemoveItem={props.onRemoveItem}
        onEditItem={props.onEditItem}
        onAddItem={props.onAddItem}
        styleConfig={{
          top: top.toString() + "px",
          height: height.toString() + "px",
          width: "228px",
          overflowY: "scroll",
          position: "absolute",
          zIndex: props.zIndex.toString()
        }}
      />
    }

  }
  return (
    <div className="OneHourInterval">
      <tr className="OneHourInterval">
        <td className="headcol">{props.idV + ":00"}</td>
        <td className="Interval" id={props.idV + ":00"} onClick={() => handleOnClickInterval(props.idV + ":00")}> {item00}</td>
      </tr>
      <tr className="OneHourInterval">
        <td className="headcol"></td>
        <td className="Interval" id={props.idV + ":30"} onClick={() => handleOnClickInterval(props.idV + ":30")}> {item30} </td>
      </tr>
    </div>
  )
}

export default function TimeLine(props) {
  const intervals = [];
  const [displayDate, setDisplayDate] = useState(props.displayDate);
  const date2Items = new Map();


  /*Given a date and an item, put the item to the list of items belonging to the given date. */
  const addItemToDate = (item, dateKey) => {
    if (!date2Items.has(dateKey)) {
      date2Items.set(dateKey, [item]);
    }
    else {
      let items = date2Items.get(dateKey);
      items.push(item);
    }
  }
  /*Given a list of items (props.list), split the items into the its dates */
  const separateDates = () => {
    for (let i = 0; i < props.list.length; i++) {
      let item = props.list[i];
      let startDate = item.startDate;
      let endDate = item.endDate;
      addItemToDate(item, startDate.toDateString());

      if (!sameDate(startDate, endDate)) {
        addItemToDate(item, endDate.toDateString());
      }
    }
  }

  const travelObjectstartDateComparator = (travelObjectA, travelObjectB) => {
    if (travelObjectA.startDate === travelObjectB.startDate) {
      return 0;
    }
    else if (travelObjectA.startDate > travelObjectB.startDate) {
      return 1;
    }
    else {
      return -1;
    }
  }
  /*Sort all lists of items in the hashMap: date2Items */
  const sortItemList = () => {
    const iterator = date2Items[Symbol.iterator]();
    for (let date2items of iterator) {
      let items = date2items[1];
      items.sort(travelObjectstartDateComparator);
    }
  }

  /* Handling rendering starts HERE */

  separateDates();
  sortItemList();

  var displayItems = (date2Items.has(displayDate.toDateString())) ? date2Items.get(displayDate.toDateString()) : [];
  var nextItemIndex = 0;
  for (var i = 0; i < 24; i++) {
    if (nextItemIndex < displayItems.length) {
      var nextItem = displayItems[nextItemIndex];
      var nextItemStartDate = nextItem.startDate;
      if (!sameDate(displayDate, nextItemStartDate)) {
        nextItemIndex++;
        intervals.push(<OneHourInterval
          idV={0}
          item={nextItem}
          div={":00"}
          zIndex={nextItemIndex}
          displayDate={displayDate}
          onRemoveItem={props.onRemoveItem}
          onEditItem={props.onEditItem}
          onAddItem={props.onAddItem}
        />);
      }
      else {
        var nextItemHour = nextItemStartDate.getHours();
        var item = null;
        var div = null;

        if (nextItemHour >= i && nextItemHour < i + 1) {
          item = nextItem;
          var nextItemMinutes = nextItemStartDate.getMinutes();

          if (nextItemMinutes < 30) {
            div = ":00";
          }
          else {
            div = ":30";
          }

          nextItemIndex++;
        }

        intervals.push(<OneHourInterval
          idV={i.toString()}
          item={item}
          div={div}
          displayDate={displayDate}
          zIndex={nextItemIndex}
          onRemoveItem={props.onRemoveItem}
          onEditItem={props.onEditItem}
          onAddItem={props.onAddItem}
        />);
      }
    }
    else {
      intervals.push(<OneHourInterval
        idV={i.toString()}
        item={null}
        div={null}
        displayDate={displayDate}
        zIndex={0}
        onRemoveItem={props.onRemoveItem}
        onEditItem={props.onEditItem}
        onAddItem={props.onAddItem}
      />);

    }
  }

  useEffect(() => {
    setDisplayDate(props.displayDate);
  }, [props.displayDate]);

  return (
    <div>
      <FinalizedHeader
        displayDate={props.displayDate}
        onChangeDisplayDate={props.onChangeDisplayDate}
      />
      <div className="outer">
        <table className="offset">
          <tbody>
            <tr></tr>
            <div id="intervals">{intervals}</div>
          </tbody>
        </table>
      </div>
    </div>
  );
}