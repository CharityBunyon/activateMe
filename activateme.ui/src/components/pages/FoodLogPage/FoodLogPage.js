import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import foodLogData from '../../../helpers/data/foodLogData';
import authData from '../../../helpers/data/authData';
import LogCard from '../../shared/LogCard/LogCard';
import { Link } from 'react-router-dom';
import './FoodLogPage.scss';


class FoodLogPage extends React.Component {
    state = { 
        user: {},
        email: '',
        foodLogs: [],
     }


     componentDidMount() {
        const userId = sessionStorage.getItem('userId');
        foodLogData.getFoodLogsById(userId)
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

    


    render() { 
        const {foodLogs} = this.state;

        return ( 
            <div>
                <div>
                    <Link to='/activateme/foodForm'>Add Food</Link>
                </div>
                <div>
                    {foodLogs.map((foodLog) => <LogCard key={foodLog.id} food={foodLog} />)}
                </div>
            </div>
         );
    }
}
 
export default FoodLogPage;

