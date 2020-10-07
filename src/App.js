import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import fire from "./fire";
import firebase from "firebase";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  function onsubmit() {
    var provider = new firebase.auth.GoogleAuthProvider();
    fire
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        // console.log(user);
        // ...
      })
      .catch(function (error) {
        console.log(error);
      });
    
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user.displayName);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  }


  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user.displayName);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  })


  function logOut() {
    setUser(null)

    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ user }}>
          <button onClick={onsubmit}>Login with Google</button>
          <button onClick={logOut}> Log out </button>
        
        {user ? (
          <div>
          <img
          src={user.photoURL}
          alt=""
          style={{ height: "50px", width: "50px", borderRadius: "100%" }}
          />
          <label>{user.displayName}</label>
          </div>
        ) : ("")}
          <Profile />
      </UserContext.Provider> 
    </div>
  );
}

export default App;
