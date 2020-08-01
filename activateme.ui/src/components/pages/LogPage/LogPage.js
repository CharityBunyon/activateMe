import React from 'react';

import 'firebase/auth';
import foodLogData from '../../../helpers/data/foodLogData';
import exerciseLogData from '../../../helpers/data/exerciseLogData';
import authData from '../../../helpers/data/authData';
import FoodLogCard from '../../shared/FoodLogCard/FoodLogCard';
import ExerciseLogCard from '../../shared/ExerciseLogCard/ExerciseLogCard';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
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
        email: '',
        foodLogs: [],
        exerciseLogs: [],
        caloriesBurned: '',
        caloriesEaten: '',
        fats:'',
        carbs: '',
        protein: '',
        points: '',
        exercisePoints: '',
        userId: sessionStorage.getItem('userId'),
     }


     componentDidMount() {
        foodLogData.getFoodLogsById(this.state.userId)
        .then((foodLogs) => {
            this.setState({foodLogs})
        })
        .catch((error) => console.error(error, 'error from getting logs'));
        exerciseLogData.getExerciseLogsById(this.state.userId)
        .then((exerciseLogs) => {
            this.setState({exerciseLogs})
        })
        .catch((error) => console.error(error, 'error from getting exercise logs'));
        exerciseLogData.getCaloriesBurned(this.state.userId)
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
        authData.getUserPoints(this.state.userId)
        .then((points) => this.setState({points}))
        .catch((error) => console.error(error, 'error from getPoints in log page'))
        authData.getExercisePoints(this.state.userId)
        .then((exercisePoints) => this.setState({exercisePoints}))
        .catch((error) => console.error(error, 'error from getPoints in log page'))
     }


     getUser = () => {
        const {email} = this.state;
        authData.getUserByEmail(email)
        .then((user) => this.setState({user}))
        .catch((error) => console.error(error, 'error from getUser in home'));   
    }

    deleteLog = (id) => {
        foodLogData.deleteLog(id)
        .then(() => foodLogData.getFoodLogsById(this.state.userId)
        )
        .then((foodLogs) => {
            this.setState({foodLogs})
        })
        .catch((error) => console.error(error, 'error from getting logs'));
    }

    deleteExercise = (id) => {
        exerciseLogData.deleteExerciseLog(id)
        .then(() => exerciseLogData.getExerciseLogsById(this.state.userId)
        )
        .then((exerciseLogs) => {
            this.setState({exerciseLogs})
        })
        .catch((error) => console.error(error, 'error from getting logs'));
    }

    render() { 
        const {foodLogs, exerciseLogs, caloriesBurned, caloriesEaten, fats, carbs, protein, points, exercisePoints} = this.state;
        let balance = this.state.caloriesEaten - this.state.caloriesBurned;
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
                                <div className='visible content add-content'>Add Activity</div>
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
                        <Grid.Column><strong>FOOD ITEM</strong></Grid.Column>
                        <Grid.Column className='center aligned'><img src={bread} alt='carbs' className='emoji'/></Grid.Column>
                        <Grid.Column className='center aligned'><img src={fat} alt='fats' className='emoji'/></Grid.Column>
                        <Grid.Column className='center aligned'><img src={pro} alt='protein' className='emoji'/></Grid.Column>
                        <Grid.Column className='center aligned'><img src={awards} alt='earned points' className='emoji'/></Grid.Column>
                        <Grid.Column className='center aligned'><img src={calories} alt='calories from food item' className='emoji'/></Grid.Column>
                        <Grid.Column><strong>DELETE</strong></Grid.Column>
                        </Grid.Row>
                        <hr className='ui container'/>
                        {foodLogs.map((foodLog) => <FoodLogCard key={foodLog.id} food={foodLog} deleteLog={this.deleteLog}/>)}
                        <hr className='ui container'/>
                        <Grid.Row>
                        <Grid.Column><strong>TOTALS</strong></Grid.Column>
                        <Grid.Column className='center aligned'>{carbs}</Grid.Column>
                        <Grid.Column className='center aligned'>{fats}</Grid.Column> 
                        <Grid.Column className='center aligned'>{protein}</Grid.Column>  
                        <Grid.Column className='center aligned'>{points}</Grid.Column> 
                        <Grid.Column className='center aligned'>{caloriesEaten}</Grid.Column> 
                    </Grid.Row>
                    </Grid>
                </div>
                <div className='food-logs'>
                    <Grid columns={5} className='ui grid container'>
                    <Grid.Row>
                        <Grid.Column><strong>ACTIVITY</strong></Grid.Column>
                        <Grid.Column className='center aligned'><img src={calories} alt='calories from food item' className='emoji'/></Grid.Column>
                        <Grid.Column className='center aligned'><img src={awards} alt='earned points' className='emoji'/></Grid.Column>
                        <Grid.Column><strong>DELETE</strong></Grid.Column>
                    </Grid.Row>
                        <hr className='ui container'/>
                    {exerciseLogs.map((exerciseLog) => <ExerciseLogCard key={exerciseLog.id} exercise={exerciseLog} deleteExercise={this.deleteExercise}/>)}
                    <hr className='ui container'/>
                    <Grid.Row>
                        <Grid.Column><strong>TOTALS</strong></Grid.Column>
                        <Grid.Column className='center aligned'>{caloriesBurned}</Grid.Column>
                        <Grid.Column className='center aligned'>{exercisePoints}</Grid.Column>  
                    </Grid.Row>
                    </Grid>
                </div>

                <div className='ui container'>
                    
                        <Grid.Row>
                            <Grid.Column className='progress'><strong>Progress: </strong></Grid.Column>
                        </Grid.Row>
                    
                   
                    <div className='ui grid'>
                        <img src={flame} alt='flame' className='one wide column flame-img'/>
                        <p className="five wide column">Calories burned from activity: <span className='just-cal-burned'>{caloriesBurned} </span>cals</p>
                    </div>
                    <div className='ui grid'>
                        
                        <div className="three wide column"><span className='cal-eaten'>{caloriesEaten}</span><span>Calories from food</span> </div>
                        <div className='one wide column'><span className='minus'>-</span></div>
                        <div className="four wide column"><span className='cal-burned'>{caloriesBurned}</span><span>Calories from exercise</span></div>
                        <div className='one wide column'><span className='equals'>=</span></div>
                        <div className="six wide column"><span className='total'>{balance}</span> </div>
               
                    </div>

                    <div className='ui grid'>
                        <div className="three wide column progress macro-container"><strong>Macros:</strong></div>
                        <div className="three wide column macro-container macro-totals"><img src={bread} alt='bread' className='emoji-macro'/>{carbs}g</div>
                        <div className="three wide column macro-container macro-totals"><img src={fat} alt='bread' className='emoji-macro'/>{fats}g</div>
                        <div className="three wide column macro-container macro-totals"><img src={pro} alt='bread'className='emoji-macro'/>{protein}g</div>
                    </div>
                    
                </div>
            </div>
         );
    }
}
 
export default FoodLogPage;

