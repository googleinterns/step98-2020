import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';

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
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.ui = new firebaseui.auth.AuthUI(this.auth);
    this.uiConfig = {
      signInSuccessUrl: 'index.html',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      tosUrl: 'index.html',
      privacyPolicyUrl: function() {
        window.location.assign('index.html');
      }
    };
  }

  createSignOut = function(accessToken) {
    const signOutButton = document.getElementById('sign-out');
    signOutButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.auth.signOut().then(() => window.location ="index.html");
    });
  };

  createFirebaseWidget = () => {this.ui.start("#firebaseui-auth-container", this.uiConfig)};
  getUserInfo = () => {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;

          //Logout button is created here
          user.getIdToken().then((accessToken) => this.createSignOut(accessToken));

          resolve({signInStatus: true, userInfo: displayName});

        } else {
          // User is signed out.
          resolve({signInStatus: false, userInfo:null});
        }
      })
        
    });
  }

}
 
export default Firebase;