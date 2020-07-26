import axios from 'axios';
import { baseUrl } from '../constants.json';

const getFoodLogsById = (id) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/foodLogs/${id}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const addFood = (foodToAdd) => axios.post(`${baseUrl}/foodToAdd`, foodToAdd);


export default { getFoodLogsById, addFood};

