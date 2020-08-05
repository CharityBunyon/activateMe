import axios from 'axios';
import { baseUrl } from '../constants.json';

const getWorkoutLogsById = (id) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/workoutLogs/${id}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getCaloriesBurned = (id) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/workoutCalories/${id}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const addWorkout = (workoutToAdd) => axios.post(`${baseUrl}/workoutToAdd`, workoutToAdd);


const deleteWorkoutLog = (id) => axios.delete(`${baseUrl}/removeWorkoutLog/${id}`);


export default { getWorkoutLogsById, addWorkout, deleteWorkoutLog, getCaloriesBurned};