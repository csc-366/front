import {CLEAR_ERROR, ERROR} from './types';

export const setError = (message) => {
    return {
        type: ERROR,
        payload: {message}
    }
};

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
};
