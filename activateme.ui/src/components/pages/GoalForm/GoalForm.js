import React from 'react';
import goalData from '../../../helpers/data/goalData';
import {Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import './GoalForm.scss';

class GoalForm extends React.Component {
    state = { 
        userId: Number(sessionStorage.getItem('userId')),
        calories: '',
        carbs: '',
        fats: '',
        protein: '',
        fiber: '',
        sugar: '',
        sodium: '',
     }

     editGoals = (e) => {
         e.preventDefault();
         const {userId, calories, carbs, fats, protein, fiber, sugar, sodium} = this.state;
         const updatedGoal = {
             UserId: Number(userId),
             Calories: Number(calories),
             Carbs: Number(carbs),
             Fats: Number(fats),
             Protein: Number(protein),
             Fiber: Number(fiber),
             Sugar: Number(sugar),
             Sodium: Number(sodium)
         };
         goalData.updateDailyGoals(updatedGoal)
         .then(() => this.props.history.push('/activateme/dashboard'))
     }

     handleChange = (event) => {
        const { value, name } = event.target;
  
        this.setState({ [name]: value });
      };

      
    render() { 
        const {calories, carbs, fats, protein, fiber, sugar, sodium} = this.state;
        return ( 
            <div className='goal-form-background'>
                <div className='ui container'>
                    <h1 className='food-form-name'>Update Your Daily Goals</h1>
                    <div>
                    <Form>
                    <Form.Field width={8}>
                        <label id='weight'>Calories</label>
                        <input
                        id='whoa'
                        name='calories'
                        type='text' 
                        placeholder='3000' 
                        value={calories}
                        onChange={this.handleChange}
                        required
                        />
                    </Form.Field>

                    <Form.Field width={8}>
                        <label id='weight'>Carbohydrates (g)</label>
                        <input
                        id='whoa'
                        name='carbs'
                        type='text' 
                        placeholder='140'
                        value={carbs}
                        onChange={this.handleChange}
                        required 
                        />
                    </Form.Field>

                    <Form.Field width={8}>
                        <label id='weight'>Fat (g)</label>
                        <input
                        id='whoa'
                        name='fats'
                        type='text' 
                        placeholder='80'
                        value={fats}
                        onChange={this.handleChange}
                        required />
                    </Form.Field>

                    <Form.Field width={8}>
                        <label id='weight'>Protein (g)</label>
                        <input
                        id='whoa'
                        name='protein'
                        type='text' 
                        placeholder='245'
                        value={protein}
                        onChange={this.handleChange}
                        required />
                    </Form.Field>

                    <Form.Field width={8}>
                        <label id='weight'>Fiber (g)</label>
                        <input
                        id='whoa'
                        name='fiber'
                        type='text' 
                        placeholder='20'
                        value={fiber}
                        onChange={this.handleChange}
                        required />
                    </Form.Field>

                    <Form.Field width={8}>
                        <label id='weight'>Sugar (g)</label>
                        <input
                        id='whoa'
                        name='sugar'
                        type='text' 
                        placeholder='400'
                        value={sugar}
                        onChange={this.handleChange}
                        required />
                    </Form.Field>

                    <Form.Field width={8}>
                        <label id='weight'>Sodium (mg)</label>
                        <input
                        id='whoa'
                        name='sodium'
                        type='text' 
                        placeholder='2200'
                        value={sodium}
                        onChange={this.handleChange}
                        required />
                    </Form.Field>
                    
                

                    <Button className='ui large submit button teal' onClick={this.editGoals}> Save</Button>
                    <Link to='/activateme/dashboard' className='cancel-link'>Cancel</Link>
                    </Form>
                    </div>
            </div>
         </div>
         );
    }
}
 
export default GoalForm;