import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import User from './User';

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
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInSuccessUrl: 'index.html',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      tosUrl: 'index.html',
      privacyPolicyUrl: function() {
        window.location.assign('index.html');
      }
    };
  }

  createFirebaseWidget = () => {
    this.ui.start("#firebaseui-auth-container", this.uiConfig);
  };
  getUserInfo = () => {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          let userObject = new User(user.email, user.displayName);
          resolve({signInStatus: true, user: userObject});

        } else {
          // User is signed out.
          resolve({signInStatus: false, user: null});
        }
      })
        
    });
  }

  getTrip(reference){
    const tripRef = this.db.doc(reference);
    return tripRef.get();
  }

  getTripList(reference){
    const tripListRef = this.db.collection(reference);
    return tripListRef.get();
  }

  addTrip(reference, trip) {
    const tripListRef = this.db.collection(reference);
    return tripListRef.add(trip);
  }

  async deleteTrip(reference) {
    const tripRef = this.db.doc(reference);
    return await tripRef.delete();
  }

  /*This function will allow editting all fields in Trip except for travelObjects */
  async editTripSetting(reference, oldValue, newValue) {
    const tripRef = this.db.doc(reference);
    if (oldValue.title !== newValue.title) {
      await tripRef.update({title: newValue.title});
    }

    if (oldValue.startDate !== newValue.startDate) {
      await tripRef.update({startDate: firebase.firestore.Timestamp.fromDate(newValue.startDate)});
    }
    
    if (oldValue.endDate !== newValue.endDate) {
      await tripRef.update({endDate: firebase.firestore.Timestamp.fromDate(newValue.endDate)});
    }

    if (oldValue.destinations !== newValue.destinations) {
      await tripRef.update({destinations: newValue.destinations});
    }

    if (oldValue.description !== newValue.description) {
      await tripRef.update({description: newValue.description})
    }
  }

  addTravelObject(reference, travelObject) {
    const tripRef = this.db.doc(reference);
    return tripRef.update({travelObjects: firebase.firestore.FieldValue.arrayUnion(travelObject)});
  }

  editTravelObject(reference, oldTravelObject, newTravelObject) {
    const tripRef = this.db.doc(reference); 
    return new Promise((resolve) => {
      tripRef.update({travelObjects : firebase.firestore.FieldValue.arrayRemove(oldTravelObject)})
      .then(() => {
        tripRef.update({travelObjects : firebase.firestore.FieldValue.arrayUnion(newTravelObject)})
        .then(() => {resolve()});
     })
    });
  }

  deleteTravelObject(reference, travelObject) {
    const tripRef = this.db.doc(reference);
    return tripRef.update({travelObjects : firebase.firestore.FieldValue.arrayRemove(travelObject)});
  }

}
 
export default Firebase;