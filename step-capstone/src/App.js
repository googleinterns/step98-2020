import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import './styles/App.css';
import {FirebaseContext} from './components/Firebase';
import Home from './components/Pages/Home'
import SignOutButton from './components/Firebase/SignOutButton';
import TripList from "./components/Pages/TripList"
import Trip from "./components/Pages/Trip"
import './styles/App.css';

class App extends React.Component {
  static contextType = FirebaseContext;

  constructor(props) {
    super(props);
    
    this.state = {
      authState: null,
      user: null,
    };

  }

  componentDidMount() {
    this.context.getUserInfo().then( (status) => this.afterAuthStateCheck(status));
  }

  afterAuthStateCheck(status) {
    if (status.signInStatus) {
      this.setState({authState: true, user: status.user});
    }
    else {
      console.log("Signed out")
      this.setState({authState: false, user: null});
    }
  }

  handleLogin(){
    if(this.state.authState){
      console.log("opning trips")
      sessionStorage.setItem("userId", this.context.auth.currentUser.uid);
      return <Redirect to = "/trips/"/>;
    } else {
      console.log("going back to home")
      return <Redirect to = "/home"/>;
    }
  }

  render () {
   
    return(
      <div className="app">
        {this.state.authState ? <SignOutButton className="sign-out"/> :''}
        <Router>
          {this.handleLogin()}
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path = "/trips/:tripId">
              <Trip/>
            </Route>
            <Route exact path = "/trips/">
              <TripList />
            </Route>
          </Switch>
        </Router>
      </div>
    ) 
  }  
}



export default App;