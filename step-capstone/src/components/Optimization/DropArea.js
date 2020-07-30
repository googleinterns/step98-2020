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
import { ItemTypes } from "../../scripts/DragTravelObject";
import TravelObject from "../TravelObjects/TravelObject";
import { useDrop } from "react-dnd";
import _ from "lodash";
import OptimizationConfirmation from "./OptimizationConfirmation";
import { getOptimalRoute, createSchedule } from "../../scripts/Optimization";
import ErrorDisplay from "./ErrorDisplay";

export default function DropArea(props) {
  const [selectedUnfinalizedItems, setSelectedUnfinalizedItems] = useState(
    new Map()
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorAnchorEl, setErrorAnchorEl] = useState(null);
  const [schedule, setSchedule] = useState(null);

  const onOpenError = (errorMessage) => {
    setErrorMessage(errorMessage);
    setErrorAnchorEl(window.document.getElementById("error-display"));
  };

  const onCloseError = () => {
    setErrorAnchorEl(null);
  };
  const handleDelete = (id) => {
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
      newItem.data.location !== "" &&
      newItem.data.type !== "hotel"
    ) {
      var newItems = _.cloneDeep(selectedUnfinalizedItems);
      newItems.set(newItem.data.id, _.cloneDeep(newItem.data));
      setSelectedUnfinalizedItems(newItems);
    }
  };
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.UNFINALIZEDTRAVELOBJECT,
    drop: (item, monitor) => {handleSelectItem(item);},
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

    allItems = allItems.concat(
      props.displayItems.filter((each) => each.type === "event")
    );

    if (
      props.hotels !== undefined && props.hotels.nightHotel !== undefined &&
      props.hotels.morningHotel !== undefined
    ) {
      getOptimalRoute(
        allItems,
        props.hotels.morningHotel,
        props.hotels.nightHotel
      )
        .then((travelObjects) => {
          try {
            let newSchedule = createSchedule(
              travelObjects,
              props.userPref,
              props.displayDate
            );
            setSchedule(newSchedule);
          } catch (error) {
            onOpenError(error);
          }
        })
        .catch((error) => {
          onOpenError(error);
        });
    } else {
      onOpenError(
        "You need a night and morning hotel to get schedule builder working!"
      );
    }
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
                onClick={() => handleDelete(travelobject.id)}
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
      <ErrorDisplay
        errorMessage={errorMessage}
        errorAnchorEl={errorAnchorEl}
        onClose={onCloseError}
      />
      {schedule ? (
        <OptimizationConfirmation
          travelObjects={schedule}
          onConfirm={props.onConfirm}
          onClose={props.onClose}
        />
      ) : null}
    </div>
  );
}
