import React from 'react';
import './styles/App.css';
import {FirebaseContext} from './components/Firebase';
import SignInWidget from './components/Firebase/SignInWidget';
import {Button} from 'react-bootstrap';

class App extends React.Component {

  static contextType = FirebaseContext;
  constructor() {
    super();
    this.state = {authState: false, userInfo: null};
  }

  afterAuthStateCheck(status) {

    if (status.signInStatus) {
      this.setState({authState: true, userInfo: status.userInfo});
      console.log("You have logged in.");
    }
    else {
      this.setState({authState: false, userInfo: null});
      console.log("You havent logged in yet");
      
    }
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
  render () {

    const display = (this.state.authState)? "block" : "none";
    const displayObject = {display: display};
    return (
      <div>
          <SignInWidget authState={this.state.authState}/>
          <Button id="sign-out" style={displayObject}>Sign Out</Button>
          
          <pre id="account-details" style={displayObject}>Hello {this.state.userInfo}</pre>
      </div>
    ) 
  }  
}




export default App;