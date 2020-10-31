import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser);
        // console.log(displayName, email, photoURL);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }
  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signInUser = {
          isSignIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false,
        }
        setUser(signInUser);
        // console.log(displayName, email, photoURL);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

  const handleChange = (e) => {
    let isFeildValid = true;
    if (e.target.name === 'email') {
      isFeildValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHashValid = /\d{1}/.test(e.target.value);
      isFeildValid = isPasswordValid && isPasswordHashValid;
    }
    if (isFeildValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }

  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name)
        })
        .catch(error => {
          // Handle Errors here.
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from)
        })
        // sessionStorage.setItem('token', loggedInUser.user)
        .catch(error => {
          // Handle Errors here.
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ...
        });
    }
    e.preventDefault();
  }
  const updateUserName = name => {
    const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: name
      }).then(function () {
        // Update successful.
        console.log('user name update successfully ');
      }).catch(function (error) {
        console.log(error);
        // An error happened.
      });
  }
  return (

    <div className="text-center">

      <h1 className="mt-5 ">Our own authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label className="pl-2 text-center "  htmlFor="newUser">create user account</label>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        {
          newUser && <input className="form-control" type="text" name="name" onBlur={handleChange} placeholder="Drop your Name" required />
        }
        <br />
        <input className="form-control" type="text" name="email" onBlur={handleChange} placeholder="Drop your Email" required /> <br />
        <input className="form-control" type="password" name="password" onBlur={handleChange} placeholder="Drop your password" required /> <br />
        <input className="form-control btn btn-dark" type="submit" value={newUser ? 'sign up' : 'sign in'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'created ' : 'login'}   success</p>
      }

    </div>
  );
};

export default Login;
