import React from 'react';
import {Form, Button } from 'semantic-ui-react'
import foodLogData from '../../../helpers/data/foodLogData';
import './FoodForm.scss';


class FoodForm extends React.Component {
    state = { 
        foodItem: '',
        quantity: '',
        calories: '',
        value: '',
        user: sessionStorage.getItem('userId'),
     }

    

    
    addFoodLog = (e) => {
         e.preventDefault();
         const foodToAdd = {
             Name: this.state.foodItem,
             FoodTypeId: Number(this.state.value),
             Quantity: Number(this.state.quantity),
             Calories: Number(this.state.calories),
             UserId: Number(this.state.user),
         };
         foodLogData.addFood(foodToAdd)
         .then(() => this.props.history.push('/activateme/log'))
     }
    

  
   
    foodChange = (e) => {
        e.preventDefault();
        this.setState({ foodItem: e.target.value });
    };

    quantityChange = (e) => {
        e.preventDefault();
        this.setState({ quantity: e.target.value });
    };

    calorieChange = (e) => {
        e.preventDefault();
        this.setState({ calories: e.target.value });
    };

    categoryChange = (e) => {
        e.preventDefault();
        this.setState({ category: e.target.value });
    };
    handleChange = (e) => {
        const {value, name } = e.target;
        this.setState({ [name]: value}); //dynamically setting the state
    }

    // handleChange = (e, { value }) => this.setState({ value })
    
    

    render() { 
        const { value, foodItem, quantity, calories } = this.state;

        return ( 
            <div className='food-form-container ui container'>
                <Form>
                <Form.Field>
                    <label>Food Item</label>
                    <input 
                    type='text' 
                    placeholder='Food item' 
                    value={foodItem}
                    onChange={this.foodChange}
                    required
                    />
                </Form.Field>

                <Form.Field>
                    <label>Quantity (grams)</label>
                    <input 
                    type='text' 
                    placeholder='Quantity'
                    value={quantity}
                    onChange={this.quantityChange}
                    required 
                    />
                </Form.Field>

                <Form.Field>
                    <label>Calories</label>
                    <input 
                    type='text' 
                    placeholder='Calories'
                    value={calories}
                    onChange={this.calorieChange}
                    required />
                </Form.Field>
                
                <Form.Group inline>
                <label>Category</label>
                <Form.Field
                    label='Vegetable'
                    control='input'
                    type='radio'
                    value='3'
                    name='value'
                    onChange={this.handleChange}

                />
                <Form.Field
                    label='Fruit'
                    control='input'
                    type='radio'
                    value= '2'
                    name='value'
                    onChange={this.handleChange}
                />
                <Form.Field
                    label='Whole Grains'
                    control='input'
                    type='radio'
                    value= '1'
                    name='value'
                    onChange={this.handleChange}
                />
                <Form.Field
                    label='Legumes'
                    control='input'
                    type='radio'
                    value= '3'
                    name='value'
                    onChange={this.handleChange}
                />
                <Form.Field
                    label='Nuts & Seeds'
                    control='input'
                    type='radio'
                    value= '2'
                    name='value'
                    onChange={this.handleChange}
                />
                </Form.Group>
                <Button onClick={this.addFoodLog}>Add Food</Button>
                </Form>
            </div>
         
        


         );
    }
}
 
export default FoodForm;