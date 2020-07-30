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
import LogPage from '../components/pages/LogPage/LogPage';
import Recipes from './../components/pages/Recipes/Recipes';
import UserForm from '../components/pages/UserForm/UserForm';
import FoodForm from './../components/pages/FoodForm/FoodForm';
import ExerciseForm from './../components/pages/ExerciseForm/ExerciseForm';
// import Footer from '../components/shared/Footer/Footer';
import authData from '../helpers/data/authData';

import './App.scss';



const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? (
      <Component {...props} {...rest} />
  ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  ));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

firebaseConnection();

class App extends React.Component {

  state ={
    authed: false,
    userObj: '',
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
    const {authed, userObj} = this.state;
    return (
      <div>
        <Router>
          <Navbar authed={authed} userObj={userObj}/>
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
              <PrivateRoute authed={authed} path="/activateme/exercises" exact component={Exercises}/>
              <PrivateRoute authed={authed} path="/activateme/recipes" exact component={Recipes}/>
              <PrivateRoute authed={authed} path="/activateme/log" exact component={LogPage}/>
              <PrivateRoute authed={authed} path="/activateme/updateUser" exact component={UserForm}/>
              <PrivateRoute authed={authed} path="/activateme/foodForm" exact component={FoodForm}/>
              <PrivateRoute authed={authed} path="/activateme/exerciseForm" exact component={ExerciseForm}/>
          </Switch>
  
        </Router>
      </div>
    );
  }
}

export default App;
