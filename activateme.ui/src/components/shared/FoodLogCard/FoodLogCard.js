import React from 'react';
import { PropTypes } from 'prop-types';
import FoodShape from '../../../helpers/propz/foodLogShape';
import { Grid } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './FoodLogCard.scss';

class FoodLogCard extends React.Component {
    static propTypes = {
        food: FoodShape.foodLogShape,
        deleteLog: PropTypes.func,
    }

    deleteFoodEvent = (e) => {
        e.preventDefault();
        const {food, deleteLog} = this.props;
        deleteLog(food.id)
    }

    render() { 
        const {food} = this.props;

        return ( 
              <Grid.Row>
                    <Grid.Column>
                        <p className='food-name log-items'>{food.name.toLowerCase()}</p>
                        <p className='quantity-grams log-items'>{food.quantity} grams</p>
                    </Grid.Column>
                    <Grid.Column className='center aligned log-items'>{food.carbs}</Grid.Column>
                    <Grid.Column className='center aligned log-items'>{food.fats}</Grid.Column>
                    <Grid.Column className='center aligned log-items'>{food.protein}</Grid.Column>
                    <Grid.Column className='center aligned log-items'>{food.points}</Grid.Column>
                    <Grid.Column className='center aligned log-items'>{food.calories}</Grid.Column>
                    <Grid.Column>
                        <FontAwesomeIcon onClick={this.deleteFoodEvent}icon={faTrash} className='log-items'/>
                    </Grid.Column>
              </Grid.Row>
         );
    }
}
 
export default FoodLogCard;