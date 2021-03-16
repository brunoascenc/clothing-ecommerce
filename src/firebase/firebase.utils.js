import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDwDgPhdpZXC70m8TlJZ-wsYQtcV4Rav14",
  authDomain: "crowndb-9c6bd.firebaseapp.com",
  projectId: "crowndb-9c6bd",
  storageBucket: "crowndb-9c6bd.appspot.com",
  messagingSenderId: "102186394176",
  appId: "1:102186394176:web:6a947e00351509f92435a5",
  measurementId: "G-X53BKJR4GH",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
