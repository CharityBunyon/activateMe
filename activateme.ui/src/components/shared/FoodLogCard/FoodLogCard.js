import React from 'react';
import FoodShape from '../../../helpers/propz/foodLogShape';
// import foodLogData from '../../../helpers/data/foodLogData';
import { Grid } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './FoodLogCard.scss';
import { PropTypes } from 'prop-types';


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
                    <p className='food-name'>{food.name.toLowerCase()}</p>
                    <p className='quantity-grams'>{food.quantity} grams</p>
                  </Grid.Column>
                  <Grid.Column>{food.carbs}</Grid.Column>
                  <Grid.Column>{food.fats}</Grid.Column>
                  <Grid.Column>{food.protein}</Grid.Column>
                  <Grid.Column>{food.points}</Grid.Column>
                  <Grid.Column>{food.calories}</Grid.Column>
                  <Grid.Column><button onClick={this.deleteFoodEvent}><FontAwesomeIcon icon={faTrash}/></button></Grid.Column>
              </Grid.Row>
         );
    }
}
 
export default FoodLogCard;