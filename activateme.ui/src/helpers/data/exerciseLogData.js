import axios from 'axios';
import { baseUrl } from '../constants.json';

const getExerciseLogsById = (id) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/exerciseLogs/${id}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const addExercise = (exerciseToAdd) => axios.post(`${baseUrl}/exerciseToAdd`, exerciseToAdd);


const deleteExerciseLog = (id) => axios.delete(`${baseUrl}/removeExerciseLog/${id}`);


export default { getExerciseLogsById, addExercise, deleteExerciseLog};