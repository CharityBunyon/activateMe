import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/activate-logo.png';

import './Navbar.scss';

class Navbar extends React.Component {
    logout = (e) => {
        e.preventDefault();
        firebase.auth().signOut();
        sessionStorage.clear();
    };

    render() { 
        const { authed } = this.props;
    
        return ( 
            <div className="ui top secondary menu">
               
                <Link className="item nav-link" to="/"  id='hover'>
                    <img src={logo} alt="activateMeLog"/>
                </Link>
              
                {authed ? (
                    <Link className="item  nav-link" id='hover' to="/activateme/dashboard">Dashboard</Link>    
                ): 
                (null)}
                 {authed ? (
                    <Link className="item nav-link"  id='hover' to="/activateme/log">Log</Link>
                ): 
                (null)}
                 {authed ? (
                    <Link className="item nav-link"  id='hover' to="/activateme/recipes">Recipes</Link>  
                ): 
                (null)}
                 {authed ? (
                    <Link className="item nav-link"  id='hover' to="/activateme/exercises">Workouts</Link>  
                ): 
                (null)}
                 
                <div className="right menu">
                    {authed ? (

                        <div className='item' onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} className='user-icon'/></div>

                        ) : (

                        <div className="item"><Link to='/activateme/login'><FontAwesomeIcon icon={faUserAlt} className='user-icon'/></Link></div>

                        )
                    }
                </div> 
            </div>
         );
    }
}
 
export default Navbar;
            