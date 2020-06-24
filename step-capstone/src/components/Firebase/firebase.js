
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
  createFirebaseWidget = () => {this.ui.start("#firebaseui-auth-container", this.uiConfig)};
  doSignOut = () => this.auth.signOut();
  getUserInfo = () => {
    this.auth.onAuthStateChanged(async (user) => {
      console.log(user.displayName);
      if (user) {
        return "Success";
      } else {
        return "Not log in";
      }
    }
  );}
}

var firebaseObject = new Firebase(); 
