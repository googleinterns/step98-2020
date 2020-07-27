import React from "react";
import { useDrag } from "react-dnd";
import TravelObject from "./TravelObject";
import _, { clone } from "lodash";
import { ItemTypes } from "../../scripts/DragTravelObject";

export default function DraggableTravelObject(props) {
  const [{ opacity }, dragRef] = useDrag({
    item: {
      type: ItemTypes.TRAVELOBJECT,
      travelObjectId: props.data.id,
      data: props.data,
      displayDate: props.displayDate,
      onEditItem: props.onEditItem,
    },
    previewOptions: {
      offsetX: 0,
      offsetY: 0
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.75 : 1,
    }),
  });

  let newStyleConfig = _.cloneDeep(props.styleConfig);
  newStyleConfig.top = "0px";

  return (
    <div
      id={props.data.id}
      ref={dragRef}
      style={{
        position: "absolute",
        background: "red",
        width: "100%",
        height: props.styleConfig.height,
        top: props.styleConfig.top,
        opacity,
        zIndex: props.styleConfig.zIndex,
      }}
    >
      <TravelObject
        key={props.key}
        displayDate={props.displayDate}
        data={props.data}
        onRemoveItem={props.onRemoveItem}
        onEditItem={props.onEditItem}
        onAddItem={props.onAddItem}
        onClickObject={props.onClickObject}
        styleConfig={newStyleConfig}
      />
    </div>
  );
}
