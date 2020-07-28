import React from 'react';
import exerciseData from '../../../helpers/data/exerciseData';
import ExerciseCard from '../../shared/ExerciseCard/ExerciseCard';
import './Exercises.scss';

class Recipes extends React.Component {
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
                <h1>Exercises Page</h1>
                <div className='ui grid container'>
                <div className=' ui grid'>
                    { exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} />)}
                </div>
                </div>
            </div>
         );
    }
}
 
export default Recipes;