import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './styles/App.css';
import {Grid} from '@material-ui/core'
import Trip from "./components/Trip"
import TripItemComponent from "./components/TripItemComponent"

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      selectedTrip: undefined
    };

    this.handleOpenTrip = this.handleOpenTrip.bind(this);
  }

  handleOpenTrip(tripID) {
    // TODO
    // fetch trip from database with tripID
    this.setState({ selectedTrip: "fetched trip" })
    console.log("Opening trip " + tripID);
    // redirect to trip component
    // return (
    //   <Redirect to = "/trip/nameOfTrip" />
    // )
  }
  
  isLoggedIn = true;
  handleLogin(){
    if(this.isLoggedIn){
      return(
        <Redirect to = "/trip-list"/>
      ); 
    } else {
      return (
        <Redirect to = "/login-page"/>
      );
    }
  }
  render () {
    return(
      <div className="App">
        <Router>
          {this.handleLogin()}
          <Switch>
            <Route path="/trip-list">
              <TripList userId = 'userId' />
            </Route>
            <Route path="/login-page">
              <Login />
            </Route>
        {/* 
          TODO

          Add route to trip with path /trip and pass in selected trip object

          <Route path="/trip">
            <Trip items={this.state.selectedTrip} />
          </Route>
        
        */}
          </Switch>
        </Router>
      </div>
    );
  }
}

function Login(){
  return ( 
    <Login/>
    //Login Page
  );
}

function TripList(){
  // const trips = firestore.getTrips(props.userId);
  // const tripList = trips.map((trip) =>
  //   <li><TripBox {...trip}/></li>
  // );
  return (
    <Trip />
    // <Grid> {
    //    trips.map((trip) => {
    //      return(
    //        <TripBox {...trip}/>
    //      );
    //      })
    //   }
    // </Grid>
    
   // <ul> {tripList} </ul>
  );
}

export default App;
