import React from 'react';
import 'firebase/auth';
import logo from '../../../assets/activate-logo.png';
import authData from '../../../helpers/data/authData';
import { Link } from 'react-router-dom';

import './Register.scss';


class Register extends React.Component {
    state ={
        firstname:'',
        lastname:'',
        email: '',
        password:'',
    };
    

    handleChange = (e) => {
        const {value, name } = e.target;
        this.setState({ [name]: value}); //dynamically setting the state
    }

    registerEvent = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const userObj = {...this.state };
        authData.registerUser(email, password)
        .then(()=> {
            authData.addUserToDatabase(userObj);
            console.error('register user works');
        })
        .catch((error) =>{
            console.error('There was an error registering a user');
        });
    }

   

    render() { 
        const { email, password, firstname, lastname} = this.state;

        return ( 
            <div className='register-form'>
                <div className="ui middle aligned center aligned grid ">
                <div className="column">
                <h2 className="ui teal image header">
                    <img src={logo} alt='logo' className="image"/>
                </h2>
                <form className="ui large form">
                    <div className="ui stacked segment">
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input 
                            type="text" 
                            name="firstname" 
                            placeholder="First Name"
                            value={firstname}
                            onChange={this.handleChange}
                            required>
                            </input>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input 
                            type="text" 
                            name="lastname" 
                            placeholder="Last Name"
                            value={lastname}
                            onChange={this.handleChange}
                            required>
                            </input>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="envelope outline icon"></i>
                            <input 
                            type="text" 
                            name="email" 
                            placeholder="E-mail address"
                            value={email}
                            onChange={this.handleChange}
                            required>
                            </input>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChange}
                            required></input>
                        </div>
                    </div>
                    <div className="ui fluid large submit button teal" onClick={this.registerEvent}>Register</div>
                    </div>
                    <div className="ui message">
                    Already A Member? <Link to='/activateme/login' className='register-link'>Login</Link>
                    </div>
                    
                </form>
                </div>
                </div>
            </div>
         );
    }
}
 
export default Register;