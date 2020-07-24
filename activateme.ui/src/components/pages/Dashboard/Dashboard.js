import React from 'react';
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
       }
     }
   )
   
}


 


 getUser = () => {
     const {email} = this.state;
     authData.getUserByEmail(email)
     .then((user) => this.setState({user}))
     .catch((error) => console.error(error, 'error from getUser in home'));   
 }

    render() { 
        const {user, badges} = this.state;
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
                        <button class="ui teal button">Edit</button>
                </div>

                <div className='three wide column points-container'>
                    <p>{user.points}</p>
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