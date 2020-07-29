import React, {useState} from "react";
import { useDrag } from "react-dnd";
import TravelObject from "./TravelObject";
import _, { clone } from "lodash";
import { ItemTypes } from "../../scripts/DragTravelObject";


export default function DraggableUnfinalized(props) {
  const item = {
    type: ItemTypes.UNFINALIZEDTRAVELOBJECT,
    travelObjectId: props.data.id,
    data: props.data,
    displayDate: props.displayDate,
    onEditItem: props.onEditItem,
  }

  const [{ opacity }, dragRef] = useDrag({
    item: {
      type: ItemTypes.UNFINALIZEDTRAVELOBJECT,
      travelObjectId: props.data.id,
      data: props.data,
      displayDate: props.displayDate,
      onEditItem: props.onEditItem,
    },
    previewOptions: {
      offsetX: 0,
      offsetY: 0
    },
    begin : () => {
      item.y = window.event.clientY;
      return item;
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.75 : 1,
    }),
  });

  return (
    <div
      id={props.data.id}
      ref={dragRef}
      style={{
        width: "100%",
        height: "100%",
        opacity,
        zIndex: "3",
        cursor: "move"
      }}
    >
      <TravelObject
        {...props}
      />
    </div>
  );
}
