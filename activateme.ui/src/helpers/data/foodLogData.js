import axios from 'axios';
import { baseUrl } from '../constants.json';

const getFoodLogsById = (id) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/foodLogs/${id}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getCaloriesEaten = (id) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/calories/${id}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getCarbs = (id) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/carbs/${id}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getFats = (id) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/fats/${id}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getProtein = (id) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/protein/${id}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const addFood = (foodToAdd) => axios.post(`${baseUrl}/foodToAdd`, foodToAdd);


const deleteLog = (id) => axios.delete(`${baseUrl}/removeFoodLog/${id}`);


export default { getFoodLogsById, addFood, deleteLog, getCaloriesEaten, getCarbs, getFats, getProtein};

