// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const createMoment = data => {
  firebase
    .firestore()
    .collection("moment")
    .add(data)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

const userObj = {
  id: 1,
  name: "faiz",
  googleId: "0019203",
  email: "faiz@gmail.com"
};

const coupleObj = {
  id: 1,
  User1: {
    id: 1,
    name: "faiz"
  },
  moment: [{ body: "tessss", title: "haooo", date: "10 January 2012" }]
};

export const createUser = data => {
  firebase
    .firestore()
    .collection("couple")
    .add(data)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

export const signUpGoogle = cb => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      cb(result);
      console.log(result);
    })
    .catch(function(error) {
      console.log(error);
    });
};
