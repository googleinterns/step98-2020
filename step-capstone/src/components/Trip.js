import React from 'react';
import Finalized from './Finalized';
import Unfinalized from './Unfinalized';
import AddItemButton from './AddItemButton'
import { Grid } from '@material-ui/core'
import '../styles/Trip.css'
import {FirebaseContext} from './Firebase';
import MapComponent from "./Map"

export default class Trip extends React.Component {
  static contextType = FirebaseContext;
    constructor(props) {
        super(props);

        this.state = {
            reference :"/users/" + sessionStorage.getItem("userId") +"/trips/" + sessionStorage.getItem("tripId"),
            items: []
        }
    }
    componentDidMount() {
      let travelObjectList = [];
      this.context.getTrip(this.state.reference)
      .then(data => {
        data.data().travelObjects.forEach(travelObject => {
          travelObjectList.push(travelObject)
        });
        this.setState({items : travelObjectList});
      })
      .catch(error => {
        console.log("Error Getting Trip Data")
        console.error(error)
      });
    }

    handleRemoveItem(data) {
      this.context.deleteTravelObject(this.state.reference, data)
      .then(() => {
        this.setState({
          items: this.state.items.filter((item) => item.id !== data.id)
        });
      })
      .catch(error => {
        console.log("Error Removing Item")
        console.error(error)
      });
    }

    handleEditItem(data) {
      let newItems = [];
      let itemToChange;
      this.state.items.forEach((item) => {
        if(item.id === data.id) {
            itemToChange = item;
            newItems.push(data);
        } else {
          newItems.push(item);
        }
      });
      this.context.editTravelObject(this.state.reference, itemToChange, data)
          .then(() => {
            this.setState ({items : newItems});
          })
          .catch((error) => {
            console.log("Error Editing Item");
            console.log(error);
          });
      console.log(newItems.length);
      this.setState({items : newItems});
      console.log(this.state.items);
    }

    handleAddItem(data) {
      // Add to database here
      data.id = Date.now();
      this.context.addTravelObject(this.state.reference, data)
      .then(() => {
        this.setState({items : this.state.items.concat(data)});
      })
      .catch(error => {
        console.log("Error Adding Item")
        console.error(error)
      });
    }
    

    handleEditTripSetting(newSetting) {
        this.setState({
            tripSetting: newSetting
        });
    }
    
    render() {
        return (
            <div className="trip">
                <Grid id="map-component"><Map zoom={13} center={{ lat: 51.5, lng: 0.087 }} /></Grid>
                <Grid container className="foreground" direction="row" justify="space-between">
                    <Grid item id="finalized-component">
                        <Finalized
                            list={this.state.items.filter((item) => item.finalized)}
                            startDate={this.state.tripSetting.startDate}
                            endDate={this.state.tripSetting.endDate}
                            onRemoveItem={this.handleRemoveItem}
                            onEditItem={this.handleEditItem}
                            onAddItem={this.handleAddItem}
                        />
                    </Grid>
                    <Grid item id="unfinalized-component">
                        <Unfinalized
                            list={this.state.items.filter((item) => !item.finalized)}
                            onRemoveItem={this.handleRemoveItem}
                            onEditItem={this.handleEditItem}
                            onAddItem={this.handleAddItem}
                            tripSetting= {this.state.tripSetting}
                            onEditTripSetting = {this.handleEditTripSetting}
                        />
                    </Grid>
                </Grid>
                <Grid id="add-button-component">
                    <AddItemButton 
                      startDate={this.state.tripSetting.startDate}
                      onAddItem={this.handleAddItem} />
                </Grid>
            </div>
        );
    }
}


  
 
 
 