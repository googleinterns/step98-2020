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
import {Grid} from '@material-ui/core'
import Trip from "./components/Trip"

class App extends React.Component {
  static contextType = FirebaseContext;
  constructor() {
    super();
    this.state = {authState: null, user: null};
  }

  componentDidMount() {
    
    this.context.getUserInfo().then( (status) => this.afterAuthStateCheck(status));
    //Example code: Read the db function
    // this.context.db.collection('users').get().then((snapshot) => {
    //   snapshot.docs.forEach(doc => {
    //     console.log(doc.data());
    //   })
    // });

    // //Example code: Write to the db function
    // this.context.db.collection('users').add({
    //   displayName: "memo",
    //   email: "memo@email.com"
    // });

  }

  afterAuthStateCheck(status) {

    if (status.signInStatus) {
      this.setState({authState: true, user: status.user});
      console.log("You have logged in.");
    }
    else {
      this.setState({authState: false, user: null});
      console.log("You havent logged in yet");
      
    }
  }

  handleLogin(){
    if(this.authState){
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
    ) 
  }  
}
function Login(){
 render () {
    let displayWhenLoggedIn = (this.state.authState)? {display: "block"} : {display: "none"};
    let notDisplayOnLoad = (this.state.authState === null)? {display: "none"} : {display: "block"};
    let userEmail = (this.state.authState)? this.state.user.email : null;
    let SignInORSignOut = (this.state.authState)? <SignOutButton /> : <SignInWidget />;
    return (
      <div>
          <div style={notDisplayOnLoad}>
            {SignInORSignOut}
      </div>
      <pre id="account-details" style={displayWhenLoggedIn}>Hello {userEmail}</pre>
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