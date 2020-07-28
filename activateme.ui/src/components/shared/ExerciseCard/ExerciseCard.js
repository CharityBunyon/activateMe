import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseShape from '../../../helpers/propz/exerciseShape';
import { Card, Image, } from 'semantic-ui-react'
import './ExerciseCard.scss';

class ExerciseCard extends React.Component {
    static propTypes = {
        exercise: ExerciseShape.exerciseShape,
    }

    render() { 
        const {exercise} = this.props;
        
        return ( 
            <Card>
            <Image src={exercise.imageUrl} wrapped ui={false} alt={exercise.name}/>
            <Card.Content>
              <Card.Header>{exercise.name}</Card.Header>
            </Card.Content>
            <Card.Content extra>
            <a href={exercise.link}>View</a>
            </Card.Content>
          </Card>
         );
    }
}
 
export default ExerciseCard;