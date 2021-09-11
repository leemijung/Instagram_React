import firebase from "firebase";

// firebase api key
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB0Ar2ykxWH6AakM8m5I8IteY_72AWRrNY",
    authDomain: "instagram-clone-react-23583.firebaseapp.com",
    projectId: "instagram-clone-react-23583",
    storageBucket: "instagram-clone-react-23583.appspot.com",
    messagingSenderId: "994617499509",
    appId: "1:994617499509:web:b27a20aaa72c62ef6b7d3c",
    measurementId: "G-1J3CDP7HDQ"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};



// export default db;