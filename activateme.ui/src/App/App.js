import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';

import Navbar from '../components/shared/Navbar/Navbar';
import Login from '../components/pages/Login/Login';
import Register from '../components/pages/Register/Register';
import Dashboard from '../components/pages/Dashboard/Dashboard';
import Exercises from '../components/pages/Exercises/Exercises';
import Home from '../components/pages/Home/Home';
import FoodLogPage from '../components/pages/FoodLogPage/FoodLogPage';
import Recipes from './../components/pages/Recipes/Recipes';
import UserForm from '../components/shared/UserForm/UserForm';
// import Footer from '../components/shared/Footer/Footer';
import authData from '../helpers/data/authData';

import './App.scss';



firebaseConnection();

class App extends React.Component {

  state ={
    authed: false,
  }
  
  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((userObj) => {
      if (userObj) {
        this.setState({ authed: true, userObj });
        this.getUser(userObj.email);
      } else {
        this.setState({ authed: false });
      }
    });
  }
  
  getUser = (userEmail) => {
     authData.getUserByEmail(userEmail)
     .then((user) => sessionStorage.setItem('userId', user.id))
     .catch((error) => console.error(error, 'error from getUser in home'));   
  }

  componentWillUnmount() {
    this.removeListener();
  }
  
  render() {
    const {authed} = this.state;
    return (
      <div>
        <Router>
          <Navbar authed={authed}/>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route 
              path="/activateme/login"
              render={() => (authed ? (
                <Redirect to="/"/>
              ):(
                <Login/>
              ))}/>
              
              <Route path="/activateme/register" exact component={Register}/>
              <Route path="/activateme/dashboard" exact component={Dashboard}/> 
              <Route path="/activateme/exercises" exact component={Exercises}/>
              <Route path="/activateme/recipes" exact component={Recipes}/>
              <Route path="/activateme/log" exact component={FoodLogPage}/>
              <Route path="/activateme/updateUser" exact component={UserForm}/>
          </Switch>
  
        </Router>
      </div>
    );
  }
}

export default App;
