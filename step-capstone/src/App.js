import React from 'react';
import './styles/App.css';
import { FirebaseContext } from './components/Firebase';
import TravelObject from './components/TravelObject'



class App extends React.Component {
  SomeComponent = () => (
    <FirebaseContext.Consumer>
      {(firebase) => {
        firebase.creatFirebaseWidget();
      }}
    </FirebaseContext.Consumer>
  );
  value = this.SomeComponent();
  render () {
    return(
      <div className="App">
        <p> Hello World </p>
        {this.SomeComponent()}
      </div>
    );
  }
}

export default App;
