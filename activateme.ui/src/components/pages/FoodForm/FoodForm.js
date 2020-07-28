import React from 'react';
import {Form, Radio } from 'semantic-ui-react'
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
             FoodTypeId: this.state.value,
             Quantity: this.state.quantity,
             Calories: this.state.calories,
             UserId: this.state.user,
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
    // handleChange = (e) => {
    //     const {value, name } = e.target;
    //     this.setState({ [name]: value}); //dynamically setting the state
    // }
    
    

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
                <div className="inline fields">
                   
                    <label>Category</label>
                    <Form.Field>
                        <Radio
                        label='Vegetable'
                        name='category'
                        value={parseInt('3')}
                        checked={value  === '2'}
                        onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                        label='Fruit'
                        name='category'
                      
                        value={parseInt('2')}
                        checked={value  === '2'}
                        onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='Whole Grains'
                        name='category'
                     
                        value={parseInt('2')}
                        checked={value  === '2'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='Legumes'
                        name='category'
                   
                        value={parseInt('3')}
                        checked={value  === '2'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='Nuts & Seeds'
                        name='category' 
                        value={parseInt('2')}
                        checked={value  === '2'}
                        onChange={this.handleChange}
                    />
                    </Form.Field> 
                    </div>
                    
                    </Form.Group>

                </Form>
            </div>
         
        


         );
    }
}
 
export default FoodForm;