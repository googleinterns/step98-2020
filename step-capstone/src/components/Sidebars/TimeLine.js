import React from "react";
import FinalizedHeader from "../Sidebars/FinalizedHeader";
import "../../styles/TimeLine.css";
import { travelObjectStartDateComparator } from "../../scripts/HelperFunctions";
import {
  getEmptySlots,
  handleClickedTimePoint,
} from "./HandleClickedTimePoint";
import { sameDate } from "../../scripts/HelperFunctions";
import OneHourInterval from "./OneHourInterval";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Grid } from "@material-ui/core"
import TravelObject from "../TravelObjects/TravelObject"

export default class TimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.date2Items = new Map();
    this.emptySlots = [];
    this.displayItems = [];
    this.displayItemsExcludeHotel = [];
    this.startOfDisplayDate = new Date(
      this.props.displayDate.getFullYear(),
      this.props.displayDate.getMonth(),
      this.props.displayDate.getDate(),
      0,
      0,
      0
    );
    this.endOfDisplayDate = new Date(
      this.props.displayDate.getFullYear(),
      this.props.displayDate.getMonth(),
      this.props.displayDate.getDate(),
      23,
      59,
      59
    );
    this.handleOnClickInterval = this.handleOnClickInterval.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.displayDate.toDateString() !== this.props.displayDate.toDateString()) {
      this.setState()
      this.props.setTodaysEvents(
        this.displayItems,
        this.props.displayDate.toDateString()
      );
    }
  }

  /*Given a date and an item, put the item to the list of items belonging to the given date. */
  addItemToDate(item, dateKey) {
    if (!this.date2Items.has(dateKey)) {
      this.date2Items.set(dateKey, [item]);
    } else {
      let items = this.date2Items.get(dateKey);
      items.push(item);
    }
  }

  /*Given a list of items (props.list), split the items into the its dates */
  separateDates() {
    for (let i = 0; i < this.props.list.length; i++) {
      let item = this.props.list[i];
      let startDate = item.startDate;
      let endDate = item.endDate;
      this.addItemToDate(item, startDate.toDateString());

      if (!sameDate(startDate, endDate)) {
        this.addItemToDate(item, endDate.toDateString());
      }
    }
  }

  handleOnClickInterval(idV) {
    idV = idV.length < 5 ? "0" + idV : idV;

    return handleClickedTimePoint(
      idV,
      this.startOfDisplayDate,
      this.endOfDisplayDate,
      this.displayItemsExcludeHotel,
      this.emptySlots
    );
  }

  /* Handling rendering starts HERE */
  getIntervals() {
    let intervals = [];
    if (this.props.displayDate !== undefined) {
      this.startOfDisplayDate = this.date2Items = new Map();
      this.displayItems = [];
      this.emptySlots = [];
      this.startOfDisplayDate = new Date(
        this.props.displayDate.getFullYear(),
        this.props.displayDate.getMonth(),
        this.props.displayDate.getDate(),
        0,
        0,
        0
      );
      this.endOfDisplayDate = new Date(
        this.props.displayDate.getFullYear(),
        this.props.displayDate.getMonth(),
        this.props.displayDate.getDate(),
        23,
        59,
        59
      );
      this.separateDates();
      this.displayItems = this.date2Items.has(
        this.props.displayDate.toDateString()
      )
        ? this.date2Items.get(this.props.displayDate.toDateString())
        : [];

      this.displayItems.sort(travelObjectStartDateComparator);

      this.props.setTodaysEvents(
        this.displayItems,
        this.props.displayDate.toDateString()
      );

      this.displayItemsExcludeHotel = this.displayItems.filter((item) => item.type !== "hotel");

      this.emptySlots = getEmptySlots(this.startOfDisplayDate, this.endOfDisplayDate, this.displayItemsExcludeHotel)

      var nextItemIndex = 0;
      var hotel = null; // flags hotel until finds right place in timeline

      for (var i = 0; i < 24; i++) {
        // if there are still travel objects that haven't been rendered
        if (hotel || nextItemIndex < this.displayItems.length) {
          // End date within current display date for catching checkout time for flight
          // Renders interval from midnight until arrival time
          var nextItem = this.displayItems[nextItemIndex];
          if (nextItem !== undefined && (!sameDate(this.props.displayDate, nextItem.startDate) && nextItem.type === "flight")) {
            intervals.push(
              <OneHourInterval
                idV={
                  nextItem.type === "hotel" ? nextItem.endDate.getHours() : 0
                }
                items={[{ data: nextItem, div: ":00" }]}
                zIndex={nextItemIndex}
                displayDate={this.props.displayDate}
                onRemoveItem={this.props.onRemoveItem}
                onEditItem={this.props.onEditItem}
                onAddItem={this.props.onAddItem}
                onClickObject={this.props.onClickObject}
                onClickInterval={this.handleOnClickInterval}
                onClickTimeslot={this.props.onClickTimeslot}
                onOpenSuggestions={this.props.onOpenSuggestions}
                startDate={this.props.startDate}
                travelObjects={this.props.travelObjects}
              />
            );
            
          } else {
            var items = [];
            var div = null;

            var item = this.displayItems[nextItemIndex];

            // found hotel who's checkout time isn't in the current hour block --> flags it and moves index
            if (!hotel && item.type === "hotel" && !sameDate(item.startDate, this.props.displayDate) && item.endDate.getHours() !== i) {
              hotel = item;
              if(nextItemIndex <= this.displayItems.length - 1)
                item = this.displayItems[++nextItemIndex];
            }

            // special case: no travel objects except for checkout for hotel
            if (hotel && this.displayItems.length === 1) {
              if (hotel.endDate.getHours() === i) {
                items.push({ data: hotel, div: hotel.endDate.getMinutes() < 30 ? ":00" : ":30"})
              }
            } else {
              // loops through all travelobjects within this one hour period
              while (
                (nextItemIndex < this.displayItems.length &&
                  this.displayItems[nextItemIndex].startDate.getHours() === i) || (hotel && hotel.endDate.getHours() === i)
              ) {
                // found proper location for previously flagged hotel.
                if (hotel && hotel.endDate.getHours() === i && (nextItemIndex>=this.displayItems.length  ||  travelObjectStartDateComparator(hotel, this.displayItems[nextItemIndex]) < 0)) {
                  item = hotel;
                  hotel = null;
                } else {
                  nextItemIndex++;
                }

                let nextItemStartDate = item.startDate;
                var nextItemMinutes = nextItemStartDate.getMinutes();

                if (nextItemMinutes < 30) {
                  div = ":00";
                } else {
                  div = ":30";
                }

                items.push({ data: item, div: div });
                item = this.displayItems[nextItemIndex];
              }
            }

            intervals.push(
              <OneHourInterval
                idV={i.toString()}
                items={items.length === 0 ? null : items}
                zIndex={nextItemIndex}
                displayDate={this.props.displayDate}
                onRemoveItem={this.props.onRemoveItem}
                onEditItem={this.props.onEditItem}
                onAddItem={this.props.onAddItem}
                onClickObject={this.props.onClickObject}
                onClickInterval={this.handleOnClickInterval}
                onClickTimeslot={this.props.onClickTimeslot}
                onOpenSuggestions={this.props.onOpenSuggestions}
                startDate={this.props.startDate}
                travelObjects={this.props.travelObjects}
              />
            );
          }
          // No more travel objects in the day, just render empty slots
        } else {
          intervals.push(
            <OneHourInterval
              idV={i.toString()}
              items={null}
              zIndex={0}
              displayDate={this.props.displayDate}
              onRemoveItem={this.props.onRemoveItem}
              onEditItem={this.props.onEditItem}
              onAddItem={this.props.onAddItem}
              onClickObject={this.props.onClickObject}
              onClickInterval={this.handleOnClickInterval}
              onClickTimeslot={this.props.onClickTimeslot}
              onOpenSuggestions={this.props.onOpenSuggestions}
              startDate={this.props.startDate}
              travelObjects={this.props.travelObjects}
            />
          );
        }
      }
    }
    return intervals;
  }

  getTodaysHotel() {
    return this.props.hotelMap.get(this.props.displayDate.toDateString());
  }

  getMorningHotel() {
    let hotel = this.getTodaysHotel()
    if (hotel && this.getTodaysHotel().morningHotel !== undefined) {
      return this.getHotelBar(this.getTodaysHotel().morningHotel);
    }
    return null;
  }

  getNightHotel() {
    let hotel = this.getTodaysHotel()
    if (hotel && this.getTodaysHotel().nightHotel !== undefined) {
      return this.getHotelBar(this.getTodaysHotel().nightHotel);
    }
    return null;
  }

  getHotelBar(object) {
    return (
      <div className="hotel-bar">
        < TravelObject
          key={object.id}
          data={object}
          onRemoveItem={this.props.onRemoveItem}
          onAddItem={this.props.onAddItem}
          onClickObject={this.props.onClickObject}
          onEditItem={this.props.onEditItem}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <FinalizedHeader
          displayDate={this.props.displayDate}
          onChangeDisplayDate={this.props.onChangeDisplayDate}
        />
        <div className="outer">
          <DndProvider backend={HTML5Backend}>
            <table className="offset">
              <tbody>
              <tr></tr>
              {this.getMorningHotel()}
              <div id="intervals">{this.getIntervals()}</div>
              {this.getNightHotel()}
            </tbody>
            </table>
          </DndProvider>
        </div>
      </div>
    );
  }
}
