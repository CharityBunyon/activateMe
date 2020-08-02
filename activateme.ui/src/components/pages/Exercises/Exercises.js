import React from 'react';
import exerciseData from '../../../helpers/data/exerciseData';
import ExerciseCard from '../../shared/ExerciseCard/ExerciseCard';
import girlsWorkout from '../../../assets/nudge1.png';

import './Exercises.scss';

class Exercise extends React.Component {
    state = { 
        exercises: [],
   
     }

     componentDidMount(){
        exerciseData.getAllExercises()
         .then((exercises) => {
             this.setState({ exercises })
         })
         .catch((error) => console.error(error, 'error from getting recipes'));
     }

    

    render() { 
        const {  exercises } = this.state;
      
        return ( 
            <div>
                <img src={girlsWorkout} alt='girls working out' className='girls-workout'/>
                    
                <div className='ui container center aligned'>
                    <h1 className='exercise-title ui container'>Get Your Sweat On With One Of These Workouts!</h1>
                    <div className=' ui grid'>
                        { exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} />)}
                    </div>

                </div>
            </div>
         );
    }
}
 
export default Exercise;