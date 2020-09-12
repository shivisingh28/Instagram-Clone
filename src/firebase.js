// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
 const firebaseConfig ={
        apiKey: "AIzaSyCFsFTxlK6kqdlG8Nap75s-UHsIi9Tlxtg",
        authDomain: "instagram-clone-10d9b.firebaseapp.com",
        databaseURL: "https://instagram-clone-10d9b.firebaseio.com",
        projectId: "instagram-clone-10d9b",
        storageBucket: "instagram-clone-10d9b.appspot.com",
        messagingSenderId: "647537808502",
        appId: "1:647537808502:web:2330c4261b5833a2b0bb57",
        //measurementId: "G-6G2JJXQ5F0"
 };
 const firebaseApp=firebase.initializeApp(firebaseConfig);
 const db = firebaseApp.firestore();
 const auth = firebase.auth();
 const storage = firebase.storage();
  
  export {db , auth , storage} ;
  
  
 // export default db;