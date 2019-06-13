import axios from 'axios';

export const backend = axios.create({
    //baseURL: (process.env.REACT_APP_DEBUG ? 'http://localhost:3001' : '54.201.211.58'),
    baseURL: 'http://localhost:3001',
    withCredentials: true
});

export const validateFormData = async (data) => {
    const validationData = (await backend.post('/observations/validateObservation', {
        data
    }));

    return validationData;
};

export default backend;