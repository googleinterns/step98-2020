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

class App extends React.Component {
  static contextType = FirebaseContext;

  constructor(props) {
    super(props);
    
    this.state = {
      authState: null,
      user: null
    };

  }

  componentDidMount() {
    
    this.context.getUserInfo().then( (status) => this.afterAuthStateCheck(status));
    //Example code: Read the db function
    // this.context.db.collection('users').get().then((snapshot) => {
    //   snapshot.docs.forEach(doc => {
    //     console.log(doc.data());
    //   })
    // });

    // //Example code: Write to the db functionif(this.state.authState){
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
    console.log("handleLogin");
    if(this.state.authState){
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
            <Route path="/login-page">
              <Login />
            </Route>
            <Route path = "/trips/">
              <TripList userId = 'userId'/>
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