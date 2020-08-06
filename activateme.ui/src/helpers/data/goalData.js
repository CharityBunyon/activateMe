import axios from 'axios';
import { baseUrl } from '../constants.json';

const getDailyGoalsById = (id) => new Promise((resolve, reject) =>{
    axios.get(`${baseUrl}/dailyGoal/${id}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
})

const updateDailyGoals = (updatedGoal) => axios.put(`${baseUrl}/updateGoal`, updatedGoal);

export default {getDailyGoalsById, updateDailyGoals};
