import React, { useContext } from "react";
import DraggableUnfinalized from "../TravelObjects/DraggableUnfinalized";
import { Button, Grid, Menu, MenuItem, Typography } from "@material-ui/core";
import TripSettingPopover from "../TripForms/TripSettingPopover";
import { FirebaseContext } from "../Firebase";
import { Redirect } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Header(props) {
  const context = useContext(FirebaseContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tripRedirect, setTripRedirect] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTrips = () => {
    sessionStorage.setItem("tripId", "");
    setTripRedirect(true);
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    context.auth.signOut().then(() => (window.location = "index.html"));
  };

  return (
    <div>
      <Grid container direction="row" justify="space-around" id="top-buttons">
        <div>
          {tripRedirect ? <Redirect to="/trips/" /> : ""}
          <Button
            variant="outlined"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Menu
          </Button>
          <Menu
            id="trip-nav"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleTrips}>Trips</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </div>

        <TripSettingPopover
          button={true}
          tripSetting={props.tripSetting}
          onEditTripSetting={props.onEditTripSetting}
        />
      </Grid>
      <table>
        <thead className="header-name">
          <Typography variant="h6" gutterBottom>
            Ideas
          </Typography>
        </thead>
      </table>
    </div>
  );
}

export default class Unfinalized extends React.Component {
  render() {
    return (
      <div>
        <Header
          tripSetting={this.props.tripSetting}
          onEditTripSetting={this.props.onEditTripSetting}
        />
        <DndProvider backend={HTML5Backend}>
          <Grid
            container
            style={{ position: "absolute", top: "120px", width: "300px" }}
          >
            {this.props.list.map((item) => {
              return (
                <Grid item >
                  <div>
                    <DraggableUnfinalized
                      key={item.id}
                      data={item}
                      onRemoveItem={this.props.onRemoveItem}
                      onEditItem={this.props.onEditItem}
                      onAddItem={this.props.onAddItem}
                      onClickObject={this.props.onClickObject}
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </DndProvider>
      </div>
    );
  }
}
