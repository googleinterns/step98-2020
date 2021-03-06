import _, { clone } from "lodash";
export const ItemTypes = {
  FINALIZEDTRAVELOBJECT: "FinalizedTravelObject",
  UNFINALIZEDTRAVELOBJECT: "UnfinalizedTravelObject"
};

const minPerDiv = 30.0;
const pixelPerDiv = 47.5;
const millisecondsPerMin = 60000;
export const moveTravelObject = (item, monitor) => {
  var deltaY = window.event.clientY - item.y;
  // Handle Drag and drop
  var cloneData = _.cloneDeep(item.data);
  const startOfDisplayDate = new Date(
    item.displayDate.getFullYear(),
    item.displayDate.getMonth(),
    item.displayDate.getDate(),
    0,
    0,
    0
  );

  const endOfDisplayDate = new Date(
    item.displayDate.getFullYear(),
    item.displayDate.getMonth(),
    item.displayDate.getDate(),
    23,
    59,
    59
  );
  var newStartDate = new Date(
    item.data.startDate.getTime() +
      ((deltaY * minPerDiv) / pixelPerDiv) *
      millisecondsPerMin
  );
  newStartDate =
    newStartDate < startOfDisplayDate ? startOfDisplayDate : newStartDate;

  var newEndDate = new Date(
    newStartDate.getTime() +
      item.data.endDate.getTime() -
      item.data.startDate.getTime()
  );

  if (newEndDate > endOfDisplayDate) {
    newEndDate = endOfDisplayDate;
    newStartDate = new Date(
      newEndDate.getTime() -
        (item.data.endDate.getTime() -
          item.data.startDate.getTime())
    );
  }

  cloneData.startDate = newStartDate;
  cloneData.endDate = newEndDate;

  item.onEditItem(cloneData);
};
