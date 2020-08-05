import React from 'react';
import WorkoutLogShape from '../../../helpers/propz/workoutLogShape';
import { Grid } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';

import './WorkoutLogCard.scss';

class WorkoutLogCard extends React.Component {
    static propTypes = {
        workoutLog: WorkoutLogShape.workoutLogShape,
        deleteWorkoutLog: PropTypes.func,
    }

    deleteWorkoutLogEvent = (e) => {
        e.preventDefault();
        const {workoutLog, deleteWorkout} = this.props;
        deleteWorkout(workoutLog.id)
    }

    render() { 
        const {workoutLog} = this.props;
        
        return ( 
            <Grid.Row>
                <Grid.Column>
                    <p className='food-name log-items'>{workoutLog.name.toLowerCase()}</p>
                    <p className='quantity-grams log-items'>{workoutLog.time} minutes</p>
                </Grid.Column>
                <Grid.Column className='center aligned log-items'>{workoutLog.calories}</Grid.Column>
                <Grid.Column className='center aligned log-items'>{workoutLog.points}</Grid.Column>
                <Grid.Column>
                    <FontAwesomeIcon onClick={this.deleteWorkoutLogEvent} icon={faTrash} className='log-items'/>
                </Grid.Column>
              </Grid.Row>
         );
    }
}
 
export default WorkoutLogCard;