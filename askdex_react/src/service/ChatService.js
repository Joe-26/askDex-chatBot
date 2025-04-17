import axios from 'axios';

const REST_API_URL = "http://localhost:8080/api";

export const getAnswer = (query) => axios.get(REST_API_URL + '/chat' + '?message=' + query);

export const deleteVectorDb = () => axios.delete(REST_API_URL + '/delDb');
