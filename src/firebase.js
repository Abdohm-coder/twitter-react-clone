import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBCfm8WQ9Xw3AmBIMQ7pxJAf6jbCNPeJoU",
    authDomain: "twitter-app-4d7eb.firebaseapp.com",
    projectId: "twitter-app-4d7eb",
    storageBucket: "twitter-app-4d7eb.appspot.com",
    messagingSenderId: "82513015539",
    appId: "1:82513015539:web:3ddade2510a740a0febd86",
    measurementId: "G-YSLB1GR9JF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { provider, auth, storage};
export default db;
  