import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB7xdKm_It9ZqWxioKJYqmOyjDAtfRVRms",
  authDomain: "react-image-upload-18373.firebaseapp.com",
  databaseURL: "https://react-image-upload-18373.firebaseio.com",
  projectId: "react-image-upload-18373",
  storageBucket: "react-image-upload-18373.appspot.com",
  messagingSenderId: "380656951111",
  appId: "1:380656951111:web:f20ccc0fb3a2ca19f5f662",
};
var fire = firebase.initializeApp(firebaseConfig);

export default fire;
