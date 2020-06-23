import React from 'react';
import './styles/App.css';
import TravelObject from './components/TravelObject'

class App extends React.Component {
  render () {
    return(
      <div className="App">
        <TravelObject type="flight" />
      </div>
    );
  }
}

export default App;
