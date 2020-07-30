import React from 'react';
import ExerciseShape from '../../../helpers/propz/exerciseLogShape';
import { Grid } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';

import './ExerciseLogCard.scss';

class ExerciseLogCard extends React.Component {
    static propTypes = {
        exercise: ExerciseShape.exerciseShape,
        deleteExercise: PropTypes.func,
    }

    deleteExerciseEvent = (e) => {
        e.preventDefault();
        const {exercise, deleteExercise} = this.props;
        deleteExercise(exercise.id)
    }

    render() { 
        const {exercise} = this.props;
        
        return ( 
            <Grid.Row>
                  <Grid.Column>
                    <p className='food-name'>{exercise.name.toLowerCase()}</p>
                    <p className='quantity-grams'>{exercise.time} minutes</p>
                  </Grid.Column>
                  <Grid.Column className='center aligned'>{exercise.calories}</Grid.Column>
                  <Grid.Column className='center aligned'>{exercise.points}</Grid.Column>
                  <Grid.Column><FontAwesomeIcon onClick={this.deleteExerciseEvent} icon={faTrash}/></Grid.Column>
              </Grid.Row>
         );
    }
}
 
export default ExerciseLogCard;