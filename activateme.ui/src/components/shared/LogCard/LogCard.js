import React from 'react';
import FoodShape from '../../../helpers/propz/foodLogShape';
import './LogCard.scss';

class LogCard extends React.Component {
    static propTypes = {
        food: FoodShape.foodLogShape,
    }

    render() { 
        const {food} = this.props;

        return ( 
            <div className='ui grid container'>
                <div className='six wide column'>
                    <div>{food.name}</div>
                    <div>{food.foodTypeId}</div>
                    <div>{food.quantity}</div>
                    <div>{food.calories}</div>
                    <div>{food.points}</div>
                </div>

            </div>
         );
    }
}
 
export default LogCard;