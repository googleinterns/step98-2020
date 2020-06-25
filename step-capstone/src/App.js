import React from 'react';
import './styles/App.css';
import {FirebaseContext} from './components/Firebase';
import {Button} from 'react-bootstrap';

class App extends React.Component {

  static contextType = FirebaseContext;
  constructor() {
    super();
    this.state = {authState: false, userInfo: null};
  }

  afterAuthStateCheck(status) {
    console.log(status);
    if (status.signInStatus) {
      this.setState({authState: true, userInfo: status.userInfo});
      console.log("You have logged in.");
    }
    else {
      this.setState({authState: false, userInfo: null});
      console.log("You havent logged in yet");
      this.context.createFirebaseWidget();
    }
  }

  componentDidMount() {
    console.log(this.context);
    this.context.getUserInfo().then( (status) => this.afterAuthStateCheck(status));
    
    //Example code: Read the db function
    this.context.db.collection('users').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
      })
    });

    //Example code: Write to the db function
    this.context.db.collection('users').add({
      displayName: "memo",
      email: "memo@email.com"
    });

  }
  render () {
    console.log(this.state);
    const display = (this.state.authState)? "block" : "none";
    console.log(display);
    const displayObject = {display: display};
    return (
      <div>
          <div id="firebaseui-auth-container"></div>
          
          <div id="sign-in-status"></div>
          <div id="sign-in">
            <Button id="sign-out" style={displayObject}>Sign Out</Button>
          </div>
          <pre id="account-details" style={displayObject}>Hello {this.state.userInfo}</pre>

      </div>
    ) 
  }  
}




export default App;