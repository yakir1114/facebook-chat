import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCh5H6y28Eu_hrWX_1Xe_iSidI5SIhHg_w",
    authDomain: "facebook-chat-55603.firebaseapp.com",
    databaseURL: "https://facebook-chat-55603.firebaseio.com",
    projectId: "facebook-chat-55603",
    storageBucket: "facebook-chat-55603.appspot.com",
    messagingSenderId: "258991241463",
    appId: "1:258991241463:web:259212930679cafa3ffbf2",
    measurementId: "G-R3R28LLTJZ"
  });

  const db = firebaseApp.firestore();

  export default db;