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
            <Typography variant={"h4"} gutterBottom>
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
            <Typography variant={"h6"}>
              Please select the unfinalized items to get optimization
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
