// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtmTl9R3Atg_P5PheLUvoA7WxABp2o0Vo",
  authDomain: "whatsproject-34c44.firebaseapp.com",
  projectId: "whatsproject-34c44",
  storageBucket: "whatsproject-34c44.appspot.com",
  messagingSenderId: "1062488458882",
  appId: "1:1062488458882:web:6f76bc9fb96b5add06969b"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
export  {db,auth,provider};