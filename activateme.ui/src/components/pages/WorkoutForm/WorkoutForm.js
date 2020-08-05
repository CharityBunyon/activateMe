import React from 'react';
import { Link } from 'react-router-dom';
import {Form, Button } from 'semantic-ui-react'
import workoutLogData  from '../../../helpers/data/workoutLogData';

import './WorkoutForm.scss'

class WorkoutForm extends React.Component {
    state = { 
        name: '',
        time: '',
        calories: '',
        value: '',
        user: sessionStorage.getItem('userId'),
     }

    addExerciseLog = (e) => {
        e.preventDefault();
        const workoutToAdd = {
            Name: this.state.name,
            WorkoutTypeId: Number(this.state.value),
            Time: Number(this.state.time),
            Calories: Number(this.state.calories),
            UserId: Number(this.state.user),
        };
        workoutLogData.addWorkout(workoutToAdd)
        .then(() => this.props.history.push('/activateme/log'))
    }

    nameChange = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    };

    timeChange = (e) => {
        e.preventDefault();
        this.setState({ time: e.target.value });
    };

    caloriesChange = (e) => {
        e.preventDefault();
        this.setState({ calories: e.target.value });
    };

    handleChange = (e) => {
        const {value, name } = e.target;
        this.setState({ [name]: value}); //dynamically setting the state
    }



    render() { 
        const {name, time, calories } = this.state;

        return ( 
            <div className='exercise-form-background'>
                <div className='ui container'>
                    <h1 className='food-form-name'>Log Workout</h1>
                    <div>
                    <Form>
                    <Form.Field width={8}>
                        <label id='weight'>Activity Name</label>
                        <input
                         id='whoa'
                        type='text' 
                        placeholder='Yoga' 
                        value={name}
                        onChange={this.nameChange}
                        required
                        />
                    </Form.Field>

                    <Form.Field width={8}>
                        <label id='weight'>Duration (minutes)</label>
                        <input
                         id='whoa' 
                        type='text' 
                        placeholder='60'
                        value={time}
                        onChange={this.timeChange}
                        required 
                        />
                    </Form.Field>

                    <Form.Field width={8}>
                        <label id='weight'>Calories</label>
                        <input
                        id='whoa'
                        type='text' 
                        placeholder='245'
                        value={calories}
                        onChange={this.caloriesChange}
                        required />
                    </Form.Field>
                    
                    <Form.Group inline>
                    <label id='weight'>Category:</label>
                    <Form.Field
                        label='Endurance'
                        control='input'
                        type='radio'
                        value='3'
                        name='value'
                        onChange={this.handleChange}

                    />
                    <Form.Field
                        label='Strength'
                        control='input'
                        type='radio'
                        value= '3'
                        name='value'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        label='Flexibility'
                        control='input'
                        type='radio'
                        value= '2'
                        name='value'
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        label='Balance'
                        control='input'
                        type='radio'
                        value= '1'
                        name='value'
                        onChange={this.handleChange}
                    />
                    </Form.Group>

                    <Button className='ui large submit button teal' onClick={this.addExerciseLog}>Add Activity</Button>
                    <Link to='/activateme/log' className='cancel-link'>Cancel</Link>
                    </Form>
                    </div>
            </div>
         </div>
         );
    }
}
 
export default WorkoutForm;