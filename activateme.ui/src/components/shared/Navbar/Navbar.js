import React from 'react';
import { Link } from 'react-router-dom';
import firebase, { auth } from 'firebase/app';
import 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/activate-logo.png';
import './Navbar.scss';

class Navbar extends React.Component {

    logout = (e) => {
        e.preventDafault();
        firebase.auth().signOut();
    };

    render() { 
        const { authed } = this.props;

        return ( 
            <div class="ui large top secondary menu">
                <Link className="item nav-link" to="/">
                    <img src={logo} alt="activateMeLog"/>
                </Link>
                <Link className="item nav-link" to="/activateme/dashboard">Dashboard</Link>
                <Link className="item nav-link" to="/activateme/log">Log</Link>
                <Link className="item nav-link" to="/activateme/recipes">Recipes</Link>
                <Link className="item nav-link" to="/activateme/exercises">Exercises</Link>
                <div class="right menu">
                    <div class="item nav-link" onClick={this.logout}>
                        <Link to="/activateme/auth" className='user-icon'><FontAwesomeIcon icon={faUserAlt} /></Link>
                    </div>
                </div>
            </div>
          
         );
    }
}
 
export default Navbar;

//  < className='navbar'>
//     <div class='pusher'>
//     <div class="ui  vertical masthead center aligned segment">
//     </div>
// </div>


            