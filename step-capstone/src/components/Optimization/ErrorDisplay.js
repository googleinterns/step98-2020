import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Popover,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

export default function ErrorDisplay(props) {
  const id = props.errorAnchorEl ? "error-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={Boolean(props.errorAnchorEl)}
        anchorEl={props.errorAnchorEl}
        onClose={props.onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Card id="add-form-container">
          <CardContent>
            <Alert variant="outlined" severity="error">
              {props.errorMessage}
            </Alert>
          </CardContent>
          <CardActions>
            <Button onClick={props.onClose} size="small" color="primary">
              OK
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </div>
  );
}
