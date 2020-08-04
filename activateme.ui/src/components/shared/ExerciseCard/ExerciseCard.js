import React from 'react';
import ExerciseShape from '../../../helpers/propz/recipeShape';
import { Card, Image, } from 'semantic-ui-react'
import './ExerciseCard.scss';

class ExerciseCard extends React.Component {
    static propTypes = {
        exercise: ExerciseShape.exerciseShape,
    }

    render() { 
        const {exercise} = this.props;
        
        return ( 
            <div className='four wide column'>
                <a href={exercise.link} target="_blank">
                    <Card>
                    <Image src={exercise.imageUrl} wrapped ui={false} alt={exercise.name}/>
                    <Card.Content>
                    <Card.Header className='ui center aligned grid'>{exercise.name}</Card.Header>
                    </Card.Content>
                    </Card>
                </a>
          </div>
         );
    }
}
 
export default ExerciseCard;