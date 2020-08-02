import React from 'react';
import logo from '../../../assets/activate-logo.png';
import authData from '../../../helpers/data/authData';
import { Link } from 'react-router-dom';

import './Login.scss';


class Login extends React.Component {
    state ={
        email: '',
        password:''
    };

    emailChange = (e) => {
        e.preventDefault();
        this.setState({ email: e.target.value });
    };

    passwordChange = (e) => {
        e.preventDefault();
        this.setState({ password: e.target.value });
    }

    loginEvent = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        authData.loginUser(email, password)
        .then(() => {
            this.props.history.push('/');
        })
        .catch((error) => {
        })
    }

    render() { 
        const { email, password } = this.state;

        return ( 
            <div className='login-form'>
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
                        name="email" 
                        placeholder="E-mail address"
                        value={email}
                        onChange={this.emailChange}
                        error
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
                        onChange={this.passwordChange}
                        required></input>
                    </div>
                    </div>
                    <div className="ui fluid large submit button teal" onClick={this.loginEvent}>Login</div>
                    </div>
                </form>
            
                <div className="ui message">
                    New to us? <Link to='/activateme/register' className='sign-up-link'>Sign Up</Link>
                </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default Login;