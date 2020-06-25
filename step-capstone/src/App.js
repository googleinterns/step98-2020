import React from 'react';
import './styles/App.css';
import Trip from "./components/Trip"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Trip />
      </div>
    );
  }
}

export default App;
