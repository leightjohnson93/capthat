import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBVPen2ptHHzErAVwhLU2xuWIr_1UpSCxo",
  authDomain: "capthat-69.firebaseapp.com",
  databaseURL: "https://capthat-69.firebaseio.com",
  storageBucket: "gs://capthat-69.appspot.com"
});

const base = Rebase.createClass(firebaseApp.database());
const storage = Rebase.createClass(firebaseApp.storage());

export { firebaseApp, storage };

export default base;
