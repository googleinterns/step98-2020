import React from "react";
import { Popper, Typography, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DropArea from "./DropArea";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function OptimizationForm(props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Popper
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        style={{
          background: "white",
          overflowY: "scroll",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Grid
          noWrap
          container
          direction="column"
          className="popper_class"
          spacing={0}
          style={{
            position: "relative",
            height: "850px",
            overflowY: "scroll",
            width: "600px",
            margin: "0",
          }}
        >
          <Grid item justify="center">
            <Typography variant={"h5"} gutterBottom>
              Optimization Form
            </Typography>
          </Grid>
          <Grid
            item
            direction="row"
            alignItems="center"
            justify="space-between"
            style={{ justifyContent: "center" }}
          >
            <Typography variant={"subtitle2"}>
              We'll generate an optimal schedule for your date of {props.displayDate}.
            </Typography>
            <Typography variant={"subtitle2"}>
              All finalized items of that date will be included in the optimal schedule.
            </Typography>
            <Typography variant={"subtitle2"}>
              Please select unfinalized items you also want to include:
            </Typography>
          </Grid>
          <DropArea
            onClose={props.onClose}
            displayDate={props.displayDate}
            displayItems={props.displayItems}
          />
        </Grid>
      </Popper>
    </DndProvider>
  );
}
