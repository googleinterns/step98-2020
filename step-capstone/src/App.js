import React from 'react';
import './styles/App.css';
import TravelObject from './components/TravelObject'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  fetchData() {
    return [
      {
        finalized: true,
        type: "flight",
        departureAirport: "BOS",
        arrivalAirport: "SFO",
        departureDate: "4:00pm EST",
        arrivalDate: "7:00pm PST",
        description: "Additional notes"
      }
    ]
  }

  componentDidMount() {
    this.setState({
      data: this.fetchData()
    })
  }

  render() {
    if (this.state.data.length === 0) {
      return null;
    }
    return (
      <div className="App">

        <TravelObject
          data={this.state.data[0]}
        />
      </div>
    );
  }
}

export default App;
