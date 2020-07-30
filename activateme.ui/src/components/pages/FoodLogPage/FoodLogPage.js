import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import foodLogData from '../../../helpers/data/foodLogData';
import authData from '../../../helpers/data/authData';
import FoodLogCard from '../../shared/FoodLogCard/FoodLogCard';
import { Link } from 'react-router-dom';
import { Grid, Button } from 'semantic-ui-react'
import './FoodLogPage.scss';


class FoodLogPage extends React.Component {
    state = { 
        user: {},
        email: '',
        foodLogs: [],
        userId: sessionStorage.getItem('userId'),
     }


     componentDidMount() {
        foodLogData.getFoodLogsById(this.state.userId)
        .then((foodLogs) => {
            this.setState({foodLogs})
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

    render() { 
        const {foodLogs} = this.state;

        return ( 
            <div>
                <div className='ui container'>
                    <Link to='/activateme/foodForm' className='ui large button teal ' >Add Food</Link>
                </div>
                <div>
                    <Grid columns={7} divided className='ui grid container'>
                        <Grid.Row>
                        <Grid.Column>FOOD ITEM</Grid.Column>
                        <Grid.Column>CARBS</Grid.Column>
                        <Grid.Column>FATS</Grid.Column>
                        <Grid.Column>PROTEINS</Grid.Column>
                        <Grid.Column>POINTS</Grid.Column>
                        <Grid.Column>CALORIES</Grid.Column>
                        <Grid.Column>DELETE</Grid.Column>
                        </Grid.Row>
                        {foodLogs.map((foodLog) => <FoodLogCard key={foodLog.id} food={foodLog} deleteLog={this.deleteLog}/>)}
                    </Grid>
                </div>
            </div>
         );
    }
}
 
export default FoodLogPage;

