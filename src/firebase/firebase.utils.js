import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDa3_80KdAeI4HsT6now3TtRYHzQcpKEV8",
    authDomain: "crwn-db-b1323.firebaseapp.com",
    projectId: "crwn-db-b1323",
    storageBucket: "crwn-db-b1323.appspot.com",
    messagingSenderId: "13070768784",
    appId: "1:13070768784:web:ff21b341286bd1c5d61615",
    measurementId: "G-4S62SHCTGW"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;