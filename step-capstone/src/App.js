import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './styles/App.css';
import {FirebaseContext} from './components/Firebase';
import SignInWidget from './components/Firebase/SignInWidget';
import SignOutButton from './components/Firebase/SignOutButton';
import TripList from "./components/TripList"
import Trip from "./components/Trip"

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
      // this.setState({authState: true, user: status.user, reference: "/users/"+this.context.auth.currentUser.uid});
      console.log("You have logged in.");
    }
    else {
      this.setState({authState: false, user: null});
      console.log("You havent logged in yet");
    }
  }

  handleLogin(){
    if(this.state.authState){
      //TODO: replace the hardcoded test user with logged in user once all users can create trips
      //sessionStorage.setItem("reference", "/users/"+this.context.auth.currentUser.uid);
      sessionStorage.setItem("userId", "0fmXVWHePsZoCV6ex1Z2");
      return <Redirect to = "/trips/"/>;
    } else {
      return <Redirect to = "/login-page"/>;
    }
  }

  render () {
   
    return(
      <div className="App">
        {this.state.authState ? <SignOutButton/> :''}
        <Router>
          {this.handleLogin()}
          <Switch>
            <Route exact path="/login-page">
              <Login />
            </Route>
            <Route path = "/trips/:tripId">
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

function Login(){
  return (
    <SignInWidget/>
  );
}

export default App;