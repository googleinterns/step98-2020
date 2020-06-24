import React from 'react';
import './styles/App.css';
import TravelObject from './components/TravelObject'


class App extends React.Component {
  constructor(props) {
    super();
    console.log(props.firebase);
    this.firebase = props.firebaseObject;
    this.signInWidget = this.firebase.createFirebaseWidget();
  }
  render () {
    return(
      <div className="App">
        <p> Hello World </p>
      </div>
    );
  }
}

export default App;
