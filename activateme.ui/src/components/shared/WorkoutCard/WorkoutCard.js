import React from 'react';
import WorkoutShape from '../../../helpers/propz/workoutShape';
import { Card, Image, } from 'semantic-ui-react';

import './WorkoutCard.scss';

class ExerciseCard extends React.Component {
    static propTypes = {
        workout: WorkoutShape.workoutShape,
    }

    render() { 
        const {workout} = this.props;
        
        return ( 
            <div className='four wide column'>
                <a href={workout.link} target="_blank">
                    <Card>
                        <Image src={workout.imageUrl} wrapped ui={false} alt={workout.name}/>
                        <Card.Content>
                        <Card.Header className='ui center aligned grid'>{workout.name}</Card.Header>
                        </Card.Content>
                    </Card>
                </a>
          </div>
         );
    }
}
 
export default ExerciseCard;