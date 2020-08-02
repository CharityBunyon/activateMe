import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Image,Popup, Grid } from 'semantic-ui-react'
import firebase from 'firebase/app';
import 'firebase/auth';
import authData from '../../../helpers/data/authData';
import badgeData from '../../../helpers/data/badgeData';
import BadgeCard from './../../shared/BadgeCard/BadgeCard';
import recipes from '../../../assets/edited-recipe.png';
import workouts from '../../../assets/edited-workout.png';
import scale from '../../../assets/edited-log.png';

import './Dashboard.scss';


class Dashboard extends React.Component {
    state ={
        user: {},
        email: '',
        badges: [], 
        foodPoints:'',
        exercisePoints: '',
        userId: Number(sessionStorage.getItem('userId')), 
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
       const {user, badges} = this.state;
       const totalPoints = this.state.foodPoints + this.state.exercisePoints;
      
        return ( 
            <div className='dash-container'>
                <div className="ui grid container">
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

                    <div className='ui container'>
                        <Grid divided='vertically'>
                                <Grid.Column width={5}>
                                    <Link to='/activateme/recipes'><img src={recipes} alt='recipe-page-link' className='dashboard-images'/></Link>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Link to='/activateme/log'><img src={scale} alt='recipe-page-link' className='dashboard-images'/></Link>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Link to='/activateme/exercises'><img src={workouts} alt='recipe-page-link' className='dashboard-images'/></Link>
                                </Grid.Column>   
                        </Grid>
                    </div>

                    <div className='ui grid container'>
                        <Grid>
                            <Grid.Row className='badge-title'>
                            <Grid.Column  width={14}><h1 className='four wide column'>Earned Badges</h1></Grid.Column>
                            
                            <Grid.Column  width={2}><Popup
                                className='one wide column]'
                                trigger= {<FontAwesomeIcon icon={faQuestionCircle} id='question-icon'/>}
                                content="Start logging some plant-based foods to earn badges! Click Log in the navbar to get started!"
                                basic
                            /></Grid.Column>
                            </Grid.Row>
                        </Grid>
            
                        <div className='badge-container ui grid container'>
      
                            {badges.map((badge) => <BadgeCard key={badge.badgeId} badge={badge} />)} 
                      
                        </div>      
                    </div>
          
            
            </div>

         );
    }
}
 
export default Dashboard;