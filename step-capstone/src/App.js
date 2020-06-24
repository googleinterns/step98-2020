import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './styles/App.css';

class App extends React.Component {
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
    <h2>Hello World</h2>
   // <ul> {tripList} </ul>
  );
}

export default App;
