import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Image, Grid } from 'semantic-ui-react'
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
        foodPoints:'',
        exercisePoints: '',
        userId: Number(sessionStorage.getItem('userId')),
        isVisible: false,
        // earnedBadges: [],
    }
 
 
 componentDidMount(){
    badgeData.getEarnedBadges(this.state.userId)
    .then((badges) => {
        this.setState({ badges})
    })
    .catch((error) => console.error(error, 'error from getting badges'));
   firebase.auth().onAuthStateChanged((userObj) =>{
       if(userObj) {
           this.setState({email: userObj.email})
           this.getUser();
           this.getUserPoints();
           this.getExercisePoints();
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
     .then((foodPoints) => this.setState({foodPoints}))
     .catch((error) => console.error(error, 'error from getPoints in dashboard'))
 }

 getExercisePoints = () => {
    authData.getExercisePoints(this.state.userId)
    .then((exercisePoints) => this.setState({exercisePoints}))
    .catch((error) => console.error(error, 'error from getPoints in dashboard'))
}



    render() { 
      
       const {user, badges } = this.state;
       const totalPoints = this.state.foodPoints + this.state.exercisePoints;

        return ( 
            <div>
            <div className="ui grid container dash-container">
                <div className="four wide column">
                    <Image src={user.imageUrl} className="ui pro-image" alt='user-profile'/>
                </div>
                
                <div className="eight wide column">
                    <h1>Welcome back, {user.firstname} {user.lastname}</h1>
                    <div className='userInfo-container'>
                        <p className='userinfo'><strong className='city'>City:</strong> {user.city}</p>
                        <p className='userinfo'><strong className='state'>State:</strong> {user.state}</p>
                        <p className='userinfo'><strong className='member'>Member Since:</strong> {moment(user.dateJoined).format('MMMM Do, YYYY')}</p>
                        <Link className='ui large submit button teal' to='/activateme/updateUser'>Edit</Link>
                    </div>
                </div>

                <div className='three wide column points-container' >
                    <div className='content'>
                    <p className='total-points'>{totalPoints}</p>
                    <p className='points-earned'>Points Earned</p>
                    </div>   
                </div>
             
                </div>

                <div className='ui grid container'>
                <h1>Earned Badges</h1>
           
                <div className='badge-container ui grid'>
                
                    
                    {badges.map((badge) => <BadgeCard key={badge.badgeId} badge={badge} />)}
                    
                </div> 
              
                </div>
          
            
            </div>

         );
    }
}
 
export default Dashboard;