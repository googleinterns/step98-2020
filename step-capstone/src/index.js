import app from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui'

var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain:  process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: "1:390165048626:web:6e692e8fa9d6c5ea1dbb2b",
    measurementId: "G-JPC7PLV9CF",
  };

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.ui = new firebaseui.auth.AuthUI(this.auth);
    this.uiConfig = {
      signInSuccessUrl: 'index.html',
      signInOptions: [
        app.auth.GoogleAuthProvider.PROVIDER_ID,
        app.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      tosUrl: 'index.html',
      privacyPolicyUrl: function() {
        window.location.assign('index.html');
      }
    };
  }

  signOutCallback = function() {
    console.log("You have signed out successfully");
    const signOutButton = document.getElementById('sign-out');
    signOutButton.style.display = 'none';
    this.ui.start("#firebaseui-auth-container", this.uiConfig);
  };

  createSignOut = function(accessToken) {
    const signOutButton = document.getElementById('sign-out');
    signOutButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.auth.signOut().then(this.signOutCallback());
    });
  };

  createFirebaseWidget = () => {this.ui.start("#firebaseui-auth-container", this.uiConfig)};
  getUserInfo = () => {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          console.log(displayName);

          //Logout button is created here
          user.getIdToken().then((accessToken) => this.createSignOut(accessToken));

          resolve(true);

        } else {
          // User is signed out.
          console.log("havent logged in");

          resolve(false);
        }
      })
        
    });
  }
}

window.onloadFunction = function() {
  var firebaseObject = new Firebase();
  firebaseObject.getUserInfo().then((status) => {
      if (status) {
        console.log("You haaaave loggedddd in");
      }
      else {
        const signOutButton = document.getElementById('sign-out');
        signOutButton.style.display = 'none';
        firebaseObject.createFirebaseWidget();
      }
  })
}


//export default value;
//export default firebaseObject;
// ReactDOM.render(

//     <App firebase={firebaseObject}/>

//   ,document.getElementById('root')
// );

// serviceWorker.unregister();
