import axios from 'axios';
import { baseUrl } from '../constants.json';

const getAllRecipes = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/recipes`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

export default { getAllRecipes }