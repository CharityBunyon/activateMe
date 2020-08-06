import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Image,Popup, Grid, Header } from 'semantic-ui-react'
import firebase from 'firebase/app';
import 'firebase/auth';
import authData from '../../../helpers/data/authData';
import badgeData from '../../../helpers/data/badgeData';
import goalData from '../../../helpers/data/goalData';
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
        goals: {},
        foodPoints:'',
        workoutPoints: '',
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
           this.getFoodPoints();
           this.getWorkoutPoints();
           this.getDailyGoals();
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

 getFoodPoints = () => {
     authData.getFoodPoints(this.state.userId)
     .then((foodPoints) => this.setState({foodPoints}))
     .catch((error) => console.error(error, 'error from getPoints in dashboard'))
 }

 getWorkoutPoints = () => {
    authData.getWorkoutPoints(this.state.userId)
    .then((workoutPoints) => this.setState({workoutPoints}))
    .catch((error) => console.error(error, 'error from getPoints in dashboard'))
}

 getDailyGoals = () => {
    goalData.getDailyGoalsById(this.state.userId)
    .then((goals) => this.setState({goals}))
    .catch((error) =>console.error(error, 'error from get goals in dashboard'))
 }


    render() { 
       const {user, badges, goals} = this.state;
       const totalPoints = this.state.foodPoints + this.state.workoutPoints;
      
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

                    <div className='ui container goal-container'>
                       <h1 className='goalTitle'>Daily Goals</h1>
                       <Grid container columns={4} doubling>
                           <Grid.Column>
                               <Grid.Row className='goalItems'>Calories</Grid.Row>
                               <Grid.Row className='goalValues'>{goals.calories}</Grid.Row>
                           </Grid.Column>

                           <Grid.Column>
                               <Grid.Row className='goalItems'>Carbohydrates (g)</Grid.Row>
                               <Grid.Row className='goalValues'>{goals.carbs}</Grid.Row>
                           </Grid.Column>

                           <Grid.Column>
                               <Grid.Row className='goalItems'>Fat (g)</Grid.Row>
                               <Grid.Row className='goalValues'>{goals.fats}</Grid.Row>
                           </Grid.Column>

                           <Grid.Column>
                               <Grid.Row className='goalItems'>Protein (g)</Grid.Row>
                               <Grid.Row className='goalValues'>{goals.protein}</Grid.Row>
                           </Grid.Column>

                           <Grid.Column>
                               <Grid.Row className='goalItems'>Fiber (g)</Grid.Row>
                               <Grid.Row className='goalValues'>{goals.fiber}</Grid.Row>
                           </Grid.Column>

                           <Grid.Column>
                               <Grid.Row className='goalItems'>Sugar (g)</Grid.Row>
                               <Grid.Row className='goalValues'>{goals.sugar}</Grid.Row>
                           </Grid.Column>

                           <Grid.Column>
                               <Grid.Row className='goalItems'>Sodium (mg)</Grid.Row>
                               <Grid.Row className='goalValues'>{goals.sodium}</Grid.Row>
                           </Grid.Column>
                           <Grid.Column>
                           <Link className='ui large submit button teal' to='/activateme/goalForm'>Edit Goals</Link> 
                           </Grid.Column>
                           
                       </Grid>

                    </div>

                    <div className='ui container'>
                        <Grid verticals>
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