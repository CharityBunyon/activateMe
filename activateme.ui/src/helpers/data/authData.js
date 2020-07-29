import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { baseUrl } from '../constants.json';

axios.interceptors.request.use((request) => {
    const token = sessionStorage.getItem('token');
  
    if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
    }, (err) => Promise.reject(err));
  

const loginUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)
    .then((cred) => {
      cred.user.getIdToken()
        .then((token) => sessionStorage.setItem('token', token));
    })
    .catch((err) => console.error(err));
  

const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((cred) => {
      cred.user.getIdToken()
        .then((token) => sessionStorage.setItem('token', token));
    });
  };
  

const registerUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      cred.user.getIdToken()
        .then((token) => {
          sessionStorage.setItem('token', token);
        });
    });
  
const addUserToDatabase = (userObj) => axios.post(`${baseUrl}/addUser`, userObj);

const getUserByEmail = (email) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/userEmail/${email}`)
    .then((response) => {
      let user = {};
      user = response.data;
      resolve(user);
    })
    .catch((error) => reject(error));
  })

const updateUserInfo = (user) => axios.put(`${baseUrl}/update`, user);

// const getUserPoints = (id) => new Promiseaxios.get(`${baseUrl}/points/${id}`);
    
const getUserPoints = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/points/${id}`)
  .then((result) => resolve(result.data))
  .catch((error) => reject(error));
});

  
  
  export default {
    loginUser, registerUser, loginWithGoogle, addUserToDatabase,getUserByEmail, updateUserInfo, getUserPoints
  };