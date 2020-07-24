import React from "react";
import FinalizedHeader from "../Sidebars/FinalizedHeader";
import "../../styles/TimeLine.css";
import { travelObjectStartDateComparator } from "../../scripts/HelperFunctions";
import { getEmptySlots, handleClickedTimePoint } from "./HandleClickedTimePoint";
import { sameDate } from "../../scripts/HelperFunctions";
import OneHourInterval from "./OneHourInterval";
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
    if (prevProps.displayDate.toDateString() !== this.props.displayDate.toDateString) {
      this.setState()
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

    return handleClickedTimePoint(idV, this.startOfDisplayDate, this.endOfDisplayDate, this.displayItemsExcludeHotel, this.emptySlots)
  }

  /* Handling rendering starts HERE */
  getIntervals() {
    let intervals = [];
    if (this.props.displayDate !== undefined) {
      this.date2Items = new Map();
      this.displayItems = [];
      this.emptySlots = [];
      this.separateDates();
      this.displayItems = this.date2Items.has(
        this.props.displayDate.toDateString()
      )
        ? this.date2Items.get(this.props.displayDate.toDateString())
        : [];
      this.props.setTodaysEvents(
        this.displayItems,
        this.props.displayDate.toDateString()
      );


      this.displayItems.sort(travelObjectStartDateComparator);
      this.displayItemsExcludeHotel = this.displayItems.filter((item) => item.type !== "hotel");

      this.emptySlots = getEmptySlots(this.startOfDisplayDate, this.endOfDisplayDate, this.displayItemsExcludeHotel)

      var nextItemIndex = 0;
      var hotel = null; // flags hotel until finds right place to palce in timeline

      for (var i = 0; i < 24; i++) {
        // if there are still travel objects that haven't been rendered
        if (hotel || nextItemIndex < this.displayItems.length) {
          // End date within current display date for catching checkout time for flight
          // Renders interval from midnight until arrival time
          if (nextItemIndex < this.displayItems.length 
            && !sameDate(this.props.displayDate, this.displayItems[nextItemIndex].startDate)
            && this.displayItems[nextItemIndex].type === "flight") {

            var nextItem = this.displayItems[nextItemIndex];
            var nextItemStartDate = nextItem.startDate;

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
              />
            );
          } else {
            var items = [];
            var div = null;
            // loops through all travelobjects within this one hour period
            // goes/continues in loop if:
            // a hotel was flagged and the flagged hotel is in this timeBlock
            // there are more travel objects in the list and the next one goes in this timeblock (if hotel, endDate in timeblock. Otherwise, startDate)
            while ((hotel && hotel.endDate.getHours() === i)
              || (nextItemIndex < this.displayItems.length
                && (this.displayItems[nextItemIndex].type === "hotel"
                  || (this.displayItems[nextItemIndex].displayItems !== hotel && this.displayItems[nextItemIndex].startDate.getHours() === i)))) {
              var item = this.displayItems[nextItemIndex];
              // found hotel who's checkout time isn't in the current hour block --> flags it and moves index
              if (!hotel && item.type === "hotel" && !sameDate(this.props.displayDate, item.startDate) && item.endDate.getHours() !== i) {
                hotel = item;
                nextItemIndex++;
                if (nextItemIndex === this.displayItems.length) {
                  break;
                }
                item = this.displayItems[nextItemIndex];
              }
              // found proper location for previously flagged hotel.
              if (hotel && hotel.endDate.getHours() === i) {
                item = hotel;
                hotel = null;
              } else {
                nextItemIndex++;
              }

              var nextItemStartDate = item.startDate;
              var nextItemMinutes = nextItemStartDate.getMinutes();

              if (nextItemMinutes < 30) {
                div = ":00";
              } else {
                div = ":30";
              }

              items.push({ data: item, div: div });
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
          <table className="offset">
            <tbody>
              <tr></tr>
              {this.getMorningHotel()}
              <div id="intervals">{this.getIntervals()}</div>
              {this.getNightHotel()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
