import axios from 'axios';
import { baseUrl } from '../constants.json';

const getAllWorkouts = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/workouts`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});



export default { getAllWorkouts}