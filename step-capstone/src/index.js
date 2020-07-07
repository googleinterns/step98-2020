import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import LocationAutocompleteInput from "./components/LocationAutocompleteInput"

const loadGoogleMapScript = document.createElement('script');
loadGoogleMapScript.src =
  'https://maps.googleapis.com/maps/api/js?key=' + process.env.REACT_APP_API_KEY + '&libraries=places';

window.document.body.appendChild(loadGoogleMapScript);

loadGoogleMapScript.addEventListener("load", () => {
  ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
      {/* <App /> */}
      <LocationAutocompleteInput />
    </FirebaseContext.Provider>,
    document.getElementById('root')
  );
})


serviceWorker.unregister();