import React from 'react';
import './styles/App.css';
import Trip from "./components/Trip"
import TripItemComponent from "./components/TripItemComponent"

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      selectedTrip: undefined
    };

    this.handleOpenTrip = this.handleOpenTrip.bind(this);
  }

  handleOpenTrip(tripID) {
    // TODO
    // fetch trip from database with tripID
    this.setState({ selectedTrip: "fetched trip" })
    console.log("Opening trip " + tripID);
    // redirect to trip component
    // return (
    //   <Redirect to = "/trip/nameOfTrip" />
    // )
  }

  render() {
    return (
      <div className="App">
        <TripItemComponent
          id="dksfgbwehkf"
          title="Asia Trip"
          startDate={new Date()}
          endDate={new Date()}
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          onOpenTrip={this.handleOpenTrip}
        />
        {/* 
          TODO

          Add route to trip with path /trip and pass in selected trip object

          <Route path="/trip">
            <Trip items={this.state.selectedTrip} />
          </Route>
        
        */}
      </div>
    );
  }
}

export default App;
