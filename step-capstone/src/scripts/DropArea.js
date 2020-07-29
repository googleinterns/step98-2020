import React, { useState } from "react";
import {
  Box,
  Grid,
  GridList,
  GridListTile,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { ItemTypes } from "./DragTravelObject";
import TravelObject from "../components/TravelObjects/TravelObject";
import { useDrop } from "react-dnd";
import _, { clone } from "lodash";

export default function DropArea(props) {
  const [selectedUnfinalizedItems, setSelectedUnfinalizedItems] = useState(
    new Map()
  );
  const handleClick = (id) => {
    var newItems = _.cloneDeep(selectedUnfinalizedItems);
    newItems.delete(id);
    setSelectedUnfinalizedItems(newItems);
  };
  const handleSelectItem = (newItem) => {
    if (
      !selectedUnfinalizedItems.has(newItem.data.id) &&
      newItem.data.location !== undefined &&
      newItem.data.location !== null &&
      newItem.data.location.address !== "" &&
      newItem.data.type !== "hotel"
    ) {
      var newItems = _.cloneDeep(selectedUnfinalizedItems);
      newItems.set(newItem.data.id, newItem.data);
      setSelectedUnfinalizedItems(newItems);
    }
  };
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.UNFINALIZEDTRAVELOBJECT,
    drop: (item, monitor) => handleSelectItem(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const getOptimized = () => {
    var allItems = [];
    selectedUnfinalizedItems.forEach((item) => {
      allItems.push(item);
    });

    allItems = allItems.concat(props.displayItems);

    //Current status: we have displayDate, displayItems, selectedUnfinalizedItems here
    //What is lacking: hotel start and end of displayDate, userPref
    //TODO: 1. pass Emmie's hotel start and end of displayDate from Trip to
    // Optimization Button, to Optimization Form to Drop Area
    //      2. call function
    // try {
    //     let schedule = createSchedule(travelObjects, userPref, props.displayDate);
    //     Call Zach's confirmation component here, when user clicks accept, call editMultipleItems(schedule);
    // } catch (error) {
    //     Call Dan's error display component here
    // }
    // })
  };

  const getTravelObjects = () => {
    var itemsList = [];
    selectedUnfinalizedItems.forEach((travelobject) => {
      itemsList.push(
        <GridListTile>
          <Grid container direction="row">
            <Grid item>
              <TravelObject
                onClickAllow={false}
                data={travelobject}
                styleConfig={{
                  width: "430px",
                  height: "110px",
                  overflowY: "scroll",
                }}
              />
            </Grid>
            <Grid item>
              <DeleteIcon
                style={{ left: "10px", position: "relative", top: "40px" }}
                color="primary"
                onClick={() => handleClick(travelobject.id)}
              />
            </Grid>
          </Grid>
        </GridListTile>
      );
    });
    return itemsList;
  };

  return (
    <div>
      <GridList style={{ paddingTop: "16px", paddingBottom: "16px" }}>
        <Box
          ref={drop}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
            height: "100px",
            borderStyle: "dashed",
            borderColor: "#3f50b5",
          }}
        >
          <Typography variant="h6" align="center" gutterBottom color="primary">
            Drop unfinalized items here
          </Typography>
        </Box>
      </GridList>
      <GridList
        cols={1}
        cellHeight={130}
        container
        direction="column"
        style={{ maxWidth: "90%", maxHeight: "520px", overflowY: "scroll" }}
      >
        {getTravelObjects()}
      </GridList>
      <Grid style={{ position: "fixed", bottom: "20px" }}>
        <CardActions>
          <Button onClick={props.onClose} size="small" color="primary">
            Cancel
          </Button>
          <Button onClick={() => getOptimized()} size="small" color="primary">
            Submit
          </Button>
        </CardActions>
      </Grid>
    </div>
  );
}
