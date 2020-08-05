import React from 'react';
import workoutData from '../../../helpers/data/workoutData';
import WorkoutCard from '../../shared/WorkoutCard/WorkoutCard';
import girlsWorkout from '../../../assets/nudge1.png';

import './Workout.scss';

class Exercise extends React.Component {
    state = { 
        workouts: [],
     }

    componentDidMount(){
        workoutData.getAllWorkouts()
        .then((workouts) => {
            this.setState({ workouts })
        })
        .catch((error) => console.error(error, 'error from getting recipes'));
     }

    

    render() { 
        const {  workouts } = this.state;
      
        return ( 
            <div>
                <img src={girlsWorkout} alt='girls working out' className='girls-workout'/>   
                <div className='ui container center aligned'>
                    <h1 className='exercise-title ui container'>Get Your Sweat On With One Of These Workouts!</h1>
                    <div className=' ui grid'>
                        { workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Exercise;