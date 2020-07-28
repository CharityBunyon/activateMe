import axios from 'axios';
import { baseUrl } from '../constants.json';

const getAllExercises = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/exercises`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

export default { getAllExercises }