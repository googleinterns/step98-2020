import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const loadGoogleMapScript = document.createElement('script');
loadGoogleMapScript.src =
  'https://maps.googleapis.com/maps/api/js?key=' + process.env.REACT_APP_API_KEY + '&libraries=places';

window.document.body.appendChild(loadGoogleMapScript);

let theme = createMuiTheme({
  typography : {
    fontFamily : ['Roboto', 'Arial', 'sans-serif'],
  },
});

loadGoogleMapScript.addEventListener("load", () => {
  ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </FirebaseContext.Provider>,
    document.getElementById('root')
  );
})


serviceWorker.unregister();