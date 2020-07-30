import React from 'react';

import 'firebase/auth';
import foodLogData from '../../../helpers/data/foodLogData';
import exerciseLogData from '../../../helpers/data/exerciseLogData';
import authData from '../../../helpers/data/authData';
import FoodLogCard from '../../shared/FoodLogCard/FoodLogCard';
import ExerciseLogCard from '../../shared/ExerciseLogCard/ExerciseLogCard';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import bread from '../../../assets/carbs.png';
import fat from '../../../assets/oil.png';
import pro from '../../../assets/protein.png';
import points from '../../../assets/points.png';
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
        .catch((error) => console.error(error, 'error from getting logs'));
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
        const {foodLogs, exerciseLogs} = this.state;

        return ( 
            <div>
                <div className='ui container log-image-container'>
                    <Grid divided='vertically center aligned'>
                        <Grid.Row >
                            <Grid.Column className='food-container' width={8} >
                                <img src={foodLog} alt='foodlog' className='food-log-image'/>
                                <div className='ui vertical animated large button black add-food-btn' tabindex="0">
                                <div className='visible content add-content'>Add Food</div>
                                <div class="hidden content">
                                <Link to='/activateme/foodForm' className='add-food-link'><i class="right arrow icon"></i></Link>
                                </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column className='exercise-container' width={8}>
                                
                                <img src={exerciseLog} alt='exerciselog' className='exercise-log-image'/>
                                <div className='ui vertical animated large button black add-exercise-btn' tabindex="0">
                                <div className='visible content add-content'>Add Activity</div>
                                <div class="hidden content">
                                <Link to='/activateme/exerciseForm' className='add-exercise-link'><i class="right arrow icon"></i></Link>
                                </div>
                                </div>
                                
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
 
                <div className='food-logs'>
                    <Grid columns={7} divided className='ui grid container'>
                        <Grid.Row>
                        <Grid.Column><strong>FOOD ITEM</strong></Grid.Column>
                        <Grid.Column className='center aligned'><img src={bread} alt='carbs' className='emoji'/></Grid.Column>
                        <Grid.Column className='center aligned'><img src={fat} alt='fats' className='emoji'/></Grid.Column>
                        <Grid.Column className='center aligned'><img src={pro} alt='protein' className='emoji'/></Grid.Column>
                        <Grid.Column className='center aligned'><img src={points} alt='earned points' className='emoji'/></Grid.Column>
                        <Grid.Column className='center aligned'><img src={calories} alt='calories from food item' className='emoji'/></Grid.Column>
                        <Grid.Column><strong>DELETE</strong></Grid.Column>
                        </Grid.Row>
                        <hr className='ui container'/>
                        {foodLogs.map((foodLog) => <FoodLogCard key={foodLog.id} food={foodLog} deleteLog={this.deleteLog}/>)}
                    </Grid>
                </div>
                <div>
                    <Grid columns={5} divided className='ui grid container'>
                    <Grid.Row>
                        <Grid.Column><strong>ACTIVITY</strong></Grid.Column>
                        <Grid.Column className='center aligned'><img src={calories} alt='calories from food item' className='emoji'/></Grid.Column>
                        <Grid.Column className='center aligned'><img src={points} alt='earned points' className='emoji'/></Grid.Column>
                        <Grid.Column><strong>DELETE</strong></Grid.Column>
                        </Grid.Row>
                        <hr className='ui container'/>
                    {exerciseLogs.map((exerciseLog) => <ExerciseLogCard key={exerciseLog.id} exercise={exerciseLog} deleteExercise={this.deleteExercise}/>)}
                    </Grid>
                </div>
            </div>
         );
    }
}
 
export default FoodLogPage;

