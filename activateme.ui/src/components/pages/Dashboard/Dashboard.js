import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import authData from '../../../helpers/data/authData';
import badgeData from '../../../helpers/data/badgeData';
import BadgeCard from './../../shared/BadgeCard/BadgeCard';

import './Dashboard.scss';

class Dashboard extends React.Component {
    state ={
        user: {},
        email: '',
        badges: [], 
        points:'',
        userId: Number(sessionStorage.getItem('userId')),
    }
 
 
 componentDidMount(){
    badgeData.getAllBadges()
    .then((badges) => {
        this.setState({ badges })
    })
    .catch((error) => console.error(error, 'error from getting badges'));
   firebase.auth().onAuthStateChanged((userObj) =>{
       if(userObj) {
           this.setState({email: userObj.email})
           this.getUser();
           this.getUserPoints();
       }
     }
   ) 
  
}


 getUser = () => {
     const {email} = this.state;
     authData.getUserByEmail(email)
     .then((user) => this.setState({user}))
     .catch((error) => console.error(error, 'error from getUser in dashboard'))
 }

 getUserPoints = () => {
     authData.getUserPoints(this.state.userId)
     .then((points) => this.setState({points}))
     .catch((error) => console.error(error, 'error from getPoints in dashboard'))
 }


    render() { 
      
       const {user, badges, points} = this.state;

        return ( 
            <div>
            <div className="ui grid container">
                <div className="four wide column">
                    <img src={user.imageUrl} className="ui image" alt='user-profile'/>
                </div>

                <div className="nine wide column">
                    <h1>Welcome back, {user.firstname} {user.lastname}</h1>
                    
                        <p className='userinfo'>Email:{user.email}</p>
                        <p className='userinfo'>City: {user.city}</p>
                        <p className='userinfo'>State: {user.state}</p>
                        <p className='userinfo'>Member since: {user.dateJoined}</p>
                        <Link to='/activateme/updateUser'>Edit</Link>
                </div>

                <div className='three wide column points-container'>
                    <p>{points}</p>
                    <p>Points Earned</p>   
                </div>
             
                </div>

                <div className='ui grid container'>
                <h1>Badges</h1>
                <div className='badge-container ui grid'>
                
                    
                    {badges.map((badge) => <BadgeCard key={badge.badgeId} badge={badge} />)}
                    
                </div> 
                </div>
          
            
            </div>

         );
    }
}
 
export default Dashboard;