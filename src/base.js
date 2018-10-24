import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBVPen2ptHHzErAVwhLU2xuWIr_1UpSCxo",
  authDomain: "capthat-69.firebaseapp.com",
  databaseURL: "https://capthat-69.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
