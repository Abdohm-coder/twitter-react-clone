import firebase from "firebase";

const firebaseConfig = {
    // Get it from your firebase project 
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { provider, auth, storage};
export default db;
  