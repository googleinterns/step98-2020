import React from "react";
import { Popover, Typography, Box, Grid, TextField } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
export default function OptimizationForm(props) {
  return (
    <div>
      <Popover
        open={props.open}
        onClose={props.onClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 100, left: 600 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        style={{width: "100%", height:"100%"}}
      >
        <Grid container direction="column">
          <Grid>
            <Typography variant={"h3"} gutterBottom>
              Optimization Form
            </Typography>
          </Grid>
          <Grid item container direction="row" justify="space-between">
            <Typography variant={"h6"}>Please select the unfinalized items to get optimization</Typography>
          </Grid>
          <Grid item container direction="row" justify="space-between"></Grid>
          <Grid item>
            <Box
            style={{width: "100%", height: '100px', borderStyle:"dashed"}}
            >
                Drop here
            </Box>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
}
