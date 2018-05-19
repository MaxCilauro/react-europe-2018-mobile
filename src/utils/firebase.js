import firebase from '@firebase/app';
import '@firebase/firestore'

export const app = firebase.initializeApp({
  apiKey: "AIzaSyC0_FTizExCMfeLfJoADTzXFw7pqkkwv14",
  authDomain: "react-europe.firebaseapp.com",
  databaseURL: "https://react-europe.firebaseio.com",
  projectId: "react-europe",
  storageBucket: "react-europe.appspot.com",
  messagingSenderId: "564091651315"
})

export const db = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};

db.settings(settings);

export const questionsRef = db.collection("questions");
export const raisedRef = db.collection("raised");
export default firebase
