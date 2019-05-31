import axios from 'axios';

export const backend = axios.create({
    baseURL: (process.env.REACT_APP_DEBUG ? 'http://localhost:3001' : '54.201.211.58'),
    withCredentials: true
});