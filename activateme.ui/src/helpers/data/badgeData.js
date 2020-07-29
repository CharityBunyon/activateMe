import axios from 'axios';
import { baseUrl } from '../constants.json';

const getAllBadges = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/badges`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getEarnedBadges = (id) => new Promise((resolve, reject) =>{
    axios.get(`${baseUrl}/badges/${id}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
})

export default { getAllBadges, getEarnedBadges }