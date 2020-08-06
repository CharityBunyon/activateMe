import React from 'react';
import { Popup, Grid} from 'semantic-ui-react'
import 'firebase/auth';
import foodLogData from '../../../helpers/data/foodLogData';
import workoutLogData from '../../../helpers/data/workoutLogData';
import authData from '../../../helpers/data/authData';
import goalData from '../../../helpers/data/goalData';
import FoodLogCard from '../../shared/FoodLogCard/FoodLogCard';
import WorkoutLogCard from '../../shared/WorkoutLogCard/WorkoutLogCard';
import { Link } from 'react-router-dom';

import flame from '../../../assets/flame.png';
import bread from '../../../assets/carbs.png';
import fat from '../../../assets/oil.png';
import pro from '../../../assets/protein.png';
import awards from '../../../assets/points.png';
import calories from '../../../assets/cal.png';
import foodLog from '../../../assets/food-log.jpg'
import exerciseLog from '../../../assets/exercise-log.jpg';

import './LogPage.scss';


class FoodLogPage extends React.Component {
    state = { 
        user: {},
        // goals: {},
        email: '',
        foodLogs: [],
        workoutLogs: [],
        caloriesBurned: '',
        caloriesEaten: '',
        fats:'',
        carbs: '',
        protein: '',
        foodPoints: '',
        workoutPoints: '',
        userId: sessionStorage.getItem('userId'),
     }


     componentDidMount() {
        foodLogData.getFoodLogsById(this.state.userId)
        .then((foodLogs) => {
            this.setState({foodLogs})
        })
        .catch((error) => console.error(error, 'error from getting logs'));
        workoutLogData.getWorkoutLogsById(this.state.userId)
        .then((workoutLogs) => {
            this.setState({workoutLogs})
        })
        .catch((error) => console.error(error, 'error from getting exercise logs'));
        workoutLogData.getCaloriesBurned(this.state.userId)
        .then((caloriesBurned) => {
            this.setState({caloriesBurned})
        })
        .catch((error) => console.error(error, 'error from getting caloriesBurned'));
        foodLogData.getCaloriesEaten(this.state.userId)
        .then((caloriesEaten) => {
            this.setState({caloriesEaten})
        })
        .catch((error) => console.error(error, 'error from getting caloriesEaten'));
        foodLogData.getFats(this.state.userId)
        .then((fats) => {
            this.setState({fats})
        })
        .catch((error) => console.error(error, 'error from getting fats'));
        foodLogData.getCarbs(this.state.userId)
        .then((carbs) => {
            this.setState({carbs})
        })
        .catch((error) => console.error(error, 'error from getting carbs'));
        foodLogData.getProtein(this.state.userId)
        .then((protein) => {
            this.setState({protein})
        })
        .catch((error) => console.error(error, 'error from getting carbs'));
        authData.getFoodPoints(this.state.userId)
        .then((foodPoints) => this.setState({foodPoints}))
        .catch((error) => console.error(error, 'error from getPoints in log page'));

        authData.getWorkoutPoints(this.state.userId)
        .then((workoutPoints) => this.setState({workoutPoints}))
        .catch((error) => console.error(error, 'error from getPoints in log page'));
        // this.getDailyGoals();
     }

    //  getDailyGoals = () => {
    //     goalData.getDailyGoalsById(this.state.userId)
    //     .then((goals) => this.setState({goals}))
    //     .catch((error) =>console.error(error, 'error from get goals in dashboard'))
    //  }


    getUser = () => {
        const {email} = this.state;
        authData.getUserByEmail(email)
        .then((user) => this.setState({user}))
        .catch((error) => console.error(error, 'error from getUser in home'));   
    }

    deleteLog = (id) => {
        foodLogData.deleteLog(id)
        .then(() => foodLogData.getFoodLogsById(this.state.userId)
        .then((foodLogs) => {
            this.setState({foodLogs})
        })
        .then(()=> foodLogData.getCaloriesEaten(this.state.userId))
        .then((caloriesEaten) => {
            this.setState({caloriesEaten})
        })
        .then(()=> foodLogData.getFats(this.state.userId))
        .then((fats) => {
            this.setState({fats})
        })
        .then(()=> foodLogData.getCarbs(this.state.userId))
        .then((carbs) => {
            this.setState({carbs})
        })
        .then(()=> foodLogData.getProtein(this.state.userId))
        .then((protein) => {
            this.setState({protein})
        })
        )
        .catch((error) => console.error(error, 'error from delte bottom in log page'))
       
        
    }

    deleteWorkout = (id) => {
        workoutLogData.deleteWorkoutLog(id)
        .then(() => workoutLogData.getWorkoutLogsById(this.state.userId)
        )
        .then((workoutLogs) => {
            this.setState({workoutLogs})
        })
       .then(() =>  workoutLogData.getCaloriesBurned(this.state.userId))
       .then((caloriesBurned) => {
           this.setState({caloriesBurned})
       })
        .catch((error) => console.error(error, 'error from getting logs'))
        
    }

    render() { 
        const {foodLogs, workoutLogs, caloriesBurned, caloriesEaten, fats, carbs, protein, foodPoints, workoutPoints, goals} = this.state;
        let balance = this.state.caloriesEaten - this.state.caloriesBurned;
        let goalDifference = {
            carbs: carbs - goals.carbs,
            fats: fats - goals.fats,
            protein: protein - goals.protein,
        }

        let carbDifference;
        if(goalDifference.carbs > 0 ){
            carbDifference = (
                <span className='macro-over'>(+{goalDifference.carbs})</span>
            );
        } else {
            carbDifference = (
                <span className='macro-under'>({goalDifference.carbs})</span>
            );
        }

        let fatDifference;
        if(goalDifference.fats > 0) {
            fatDifference = (
            <span className='macro-over'>(+{goalDifference.fats})</span>
            );
        } else {
            fatDifference =(
                <span className='macro-under'>({goalDifference.fats})</span>
            )
        }


        let proteinDifference;
        if(goalDifference.protein > 0) {
            proteinDifference = (
            <span className='macro-over'>(+{goalDifference.protein})</span>
            );
        } else {
            proteinDifference =(
                <span className='macro-under'>({goalDifference.protein})</span>
            )
        }



        return ( 
            <div>
                <div className='ui container log-image-container'>
                <h1 className='ui center aligned grid recipe-title'>Start Logging To Earn Badges!</h1>
                    <Grid divided='vertically center aligned'>
                        <Grid.Row >
                            <Grid.Column className='food-container' width={8} >
                                <img src={foodLog} alt='foodlog' className='food-log-image'/>
                                <div className='ui vertical animated large button black add-food-btn' tabIndex="0">
                                <div className='visible content add-content'>Add Food</div>
                                <div className="hidden content">
                                <Link to='/activateme/foodForm' className='add-food-link'><i className="right arrow icon"></i></Link>
                                </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column className='exercise-container' width={8}>
                                
                                <img src={exerciseLog} alt='exerciselog' className='exercise-log-image'/>
                                <div className='ui vertical animated large button black add-exercise-btn' tabIndex="0">
                                <div className='visible content add-content'>Add Workout</div>
                                <div className="hidden content">
                                <Link to='/activateme/exerciseForm' className='add-exercise-link'><i className="right arrow icon"></i></Link>
                                </div>
                                </div>
                                
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
 
                <div className='food-logs'>
                    <Grid columns={7} className='ui grid container'>
                        <Grid.Row>
                        <Grid.Column className='log-contents grid-title'><strong>Food Title</strong></Grid.Column>
                        <Grid.Column className='center aligned'>
                            <Popup
                            trigger={<img src={bread} alt='carbs' className='emoji'/>}
                            content='Carbs'
                            position='top center'
                            />
                        </Grid.Column>
                        <Grid.Column className='center aligned'>
                            <Popup
                            trigger={<img src={fat} alt='fats' className='emoji'/>}
                            content='Fats'
                            position='top center'
                            />
                        </Grid.Column>
                        <Grid.Column className='center aligned'>
                            <Popup
                            trigger={<img src={pro} alt='protein' className='emoji'/>}
                            content='Protein'
                            position='top center'
                            />
                        </Grid.Column>
                        <Grid.Column className='center aligned'>
                            <Popup
                            trigger={<img src={awards} alt='earned points' className='emoji'/>}
                            content='Points Earned'
                            position='top center'
                            />
                        </Grid.Column>
                        <Grid.Column className='center aligned'>
                            <Popup
                            trigger={<img src={calories} alt='calories from food item' className='emoji'/>}
                            content='Calories'
                            position='top center'
                            />
                        </Grid.Column>
                        <Grid.Column  className='log-contents'><strong>Delete</strong></Grid.Column>
                        </Grid.Row>
                        <hr className='ui container'/>
                        {foodLogs.map((foodLog) => <FoodLogCard key={foodLog.id} food={foodLog} deleteLog={this.deleteLog}/>)}
                        <hr className='ui container'/>
                        <Grid.Row>
                        <Grid.Column className='log-contents total'><strong>Totals</strong></Grid.Column>
                        <Grid.Column className='center aligned log-contents'>{carbs}</Grid.Column>
                        <Grid.Column className='center aligned log-contents'>{fats}</Grid.Column> 
                        <Grid.Column className='center aligned log-contents'>{protein}</Grid.Column>  
                        <Grid.Column className='center aligned log-contents'>{foodPoints}</Grid.Column> 
                        <Grid.Column className='center aligned log-contents'>{caloriesEaten}</Grid.Column> 
                    </Grid.Row>
                    </Grid>
                </div>
                <div className='exercise-logs'>
                    <Grid columns={5} className='ui grid container'>
                    <Grid.Row>
                        <Grid.Column  className='log-contents grid-title'><strong>Workouts</strong></Grid.Column>
                        <Grid.Column className='center aligned'>
                            <Popup
                            trigger={<img src={calories} alt='calories from food item' className='emoji'/>}
                            content='Calories'
                            position='top center'
                            />
                        </Grid.Column>
                        <Grid.Column className='center aligned'>
                            <Popup
                            trigger={<img src={awards} alt='earned points' className='emoji'/>}
                            content='Points'
                            position='top center'
                            />
                        </Grid.Column>
                        <Grid.Column  className='log-contents'><strong>Delete</strong></Grid.Column>
                    </Grid.Row>
                        <hr className='ui container'/>
                    {workoutLogs.map((workoutLog) => <WorkoutLogCard key={workoutLog.id} workoutLog={workoutLog} deleteWorkout={this.deleteWorkout}/>)}
                    <hr className='ui container'/>
                    <Grid.Row>
                        <Grid.Column className='log-contents total'><strong>Totals</strong></Grid.Column>
                        <Grid.Column className='center aligned log-contents'>{caloriesBurned}</Grid.Column>
                        <Grid.Column className='center aligned log-contents'>{workoutPoints}</Grid.Column>  
                    </Grid.Row>
                    </Grid>
                </div>

                <div className='ui container'>
                    
                        <Grid.Row>
                            <Grid.Column className='progress'><strong>Progress: </strong></Grid.Column>
                        </Grid.Row>
                    
                   
                    <div className='ui grid'>
                        <img src={flame} alt='flame' className='one wide column flame-img'/>
                        <p className="five wide column">Calories burned from activity: <span className='just-cal-burned log-contents'>{caloriesBurned} </span>cals</p>
                    </div>
                    <div className='ui grid'>
                        
                        <div className="three wide column"><span className='cal-eaten log-contents'>{caloriesEaten}</span><span>Calories from food</span> </div>
                        <div className='one wide column'><span className='minus log-contents'>-</span></div>
                        <div className="four wide column"><span className='cal-burned log-contents'>{caloriesBurned}</span><span>Calories from exercise</span></div>
                        <div className='one wide column'><span className='equals log-contents'>=</span></div>
                        <div className="six wide column"><span className='total log-contents'>{balance}</span><span className='net-title'>Net Calories</span> </div>
               
                    </div>

                    {/* <div className='ui grid'>
                        <div className="three wide column progress macro-container"><strong>Macros:</strong></div>
                        <div className="three wide column macro-container macro-totals"><img src={bread} alt='bread' className='emoji-macro emoji'/>{carbs}g {goals.carbs > -1 && carbDifference}</div>
                        <div className="three wide column macro-container macro-totals"><img src={fat} alt='bread' className='emoji-macro emoji'/>{fats}g {goals.fats > -1 && fatDifference}</div>
                        <div className="three wide column macro-container macro-totals"><img src={pro} alt='bread'className='emoji-macro emoji'/>{protein}g {goals.protein > -1 && proteinDifference}</div>
                    </div>
                     */}
                </div>
            </div>
         );
    }
}
 
export default FoodLogPage;

