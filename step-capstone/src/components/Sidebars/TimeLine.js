import React from "react";
import FinalizedHeader from "../Sidebars/FinalizedHeader";
import "../../styles/TimeLine.css";
import { travelObjectStartDateComparator } from "../../scripts/HelperFunctions";
import { getEmptySlots, handleClickedTimePoint } from "./HandleClickedTimePoint";
import { sameDate } from "../../scripts/HelperFunctions";
import OneHourInterval from "./OneHourInterval";

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
      this.props.setTodaysEvents(
        this.displayItems,
        this.props.displayDate.toDateString()
      );


      this.displayItems.sort(travelObjectStartDateComparator);
      this.displayItemsExcludeHotel = this.displayItems.filter((item) => item.type !== "hotel");

      this.emptySlots = getEmptySlots(this.startOfDisplayDate, this.endOfDisplayDate, this.displayItemsExcludeHotel)

      var nextItemIndex = 0;
      for (var i = 0; i < 24; i++) {
        if (nextItemIndex < this.displayItems.length) {
          var nextItem = this.displayItems[nextItemIndex];
          var nextItemStartDate = nextItem.startDate;
          // End date within current display date
          if (
            !sameDate(this.props.displayDate, nextItemStartDate) &&
            (nextItem.type !== "hotel" || nextItem.endDate.getHour === i)
          ) {
            nextItemIndex++;
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
            while (
              nextItemIndex < this.displayItems.length &&
              this.displayItems[nextItemIndex].startDate.getHours() === i
            ) {
              var item = this.displayItems[nextItemIndex];
              nextItemStartDate = item.startDate;
              var nextItemMinutes = nextItemStartDate.getMinutes();

              if (nextItemMinutes < 30) {
                div = ":00";
              } else {
                div = ":30";
              }

              items.push({ data: item, div: div });

              nextItemIndex++;
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
              <div id="intervals">{this.getIntervals()}</div>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
