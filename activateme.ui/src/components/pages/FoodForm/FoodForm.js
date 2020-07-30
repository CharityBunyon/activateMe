import React from 'react';
import { Link } from 'react-router-dom';
import {Form, Button, Grid } from 'semantic-ui-react'
import foodLogData from '../../../helpers/data/foodLogData';
import bread from '../../../assets/carbs.png';
import fat from '../../../assets/oil.png';
import pro from '../../../assets/protein.png';
import './FoodForm.scss';


class FoodForm extends React.Component {
    state = { 
        foodItem: '',
        quantity: '',
        calories: '',
        value: '',
        carbs: '',
        fats: '',
        protein: '',
        user: sessionStorage.getItem('userId'),
     }

    

    
    addFoodLog = (e) => {
         e.preventDefault();
         const foodToAdd = {
             Name: this.state.foodItem,
             FoodTypeId: Number(this.state.value),
             Quantity: Number(this.state.quantity),
             Calories: Number(this.state.calories),
             Carbs: Number(this.state.carbs),
             Fats: Number(this.state.fats),
             Protein: Number(this.state.protein),
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

    proteinChange = (e) => {
        e.preventDefault();
        this.setState({ protein: e.target.value });
    };

    fatsChange = (e) => {
        e.preventDefault();
        this.setState({ fats: e.target.value });
    };

    carbsChange = (e) => {
        e.preventDefault();
        this.setState({ carbs: e.target.value });
    };

    handleChange = (e) => {
        const {value, name } = e.target;
        this.setState({ [name]: value}); //dynamically setting the state
    }

    
    

    render() { 
        const { protein, fats, carbs, foodItem, quantity, calories } = this.state;

        return ( 
            <div className='food-form-container ui container'>
                <h1 className='food-form-name'>Create Food</h1>
                <div>
                <Form>
                <Form.Field width={8}>
                    <label id='weight'>Food Item</label>
                    <input 
                    type='text' 
                    placeholder='Food item' 
                    value={foodItem}
                    onChange={this.foodChange}
                    required
                    />
                </Form.Field>

                <Form.Field width={8}>
                    <label id='weight'>Quantity (grams)</label>
                    <input 
                    type='text' 
                    placeholder='Quantity'
                    value={quantity}
                    onChange={this.quantityChange}
                    required 
                    />
                </Form.Field>

                <Form.Field width={8}>
                    <label id='weight'>Calories</label>
                    <input 
                    type='text' 
                    placeholder='Calories'
                    value={calories}
                    onChange={this.calorieChange}
                    required />
                </Form.Field>
                
                <Form.Group inline>
                <label id='weight'>Category:</label>
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

                <span className='CreateFoodView-nutrition-separator'>NUTRITION</span>

                <Form.Field width={8}>
                    <label id='labels'>Carbohydrates</label>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column width={2}>
                                <img src={bread} alt='bread' className='emoji'/>
                            </Grid.Column>
                            <Grid.Column>
                                <input
                                type='text' 
                                placeholder='50g'
                                value={carbs}
                                onChange={this.carbsChange}
                                required />
                            </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Form.Field>

                <Form.Field width={8}>
                    <label id='labels'>Fat</label>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column width={2}>
                                <img src={fat} alt='fat' className='emoji'/>
                            </Grid.Column>
                            <Grid.Column>
                                <input
                                type='text' 
                                placeholder='16g'
                                value={fats}
                                onChange={this.fatsChange}
                                required />
                            </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Form.Field>


                <Form.Field width={8}>
                    <label id='labels'>Protein</label>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column width={2}>
                                <img src={pro} alt='protein' className='emoji'/>
                            </Grid.Column>
                            <Grid.Column>
                                <input
                                type='text' 
                                placeholder='33g'
                                value={protein}
                                onChange={this.proteinChange}
                                required />
                            </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Form.Field>


                <Button className='ui large submit button teal' onClick={this.addFoodLog}>Add Food</Button>
                <Link to='/activateme/log' className='cancel-link'>Cancel</Link>
                </Form>
                </div>
         
            </div>


         );
    }
}
 
export default FoodForm;