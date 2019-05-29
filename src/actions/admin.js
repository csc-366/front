import {ERROR, GET_ALL_USERS, SET_MANAGED_USER} from './types';
import {backend} from "../apis/backend";

export const getAllUsers = () => async (dispatch) => {
    try {
        const response = await backend.get('/users')

        dispatch({
            type: GET_ALL_USERS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: {message: e.response.data.message}
        })
    }
};

export const setManagedUser = (managedUser) => {
    return {
        type: SET_MANAGED_USER,
        payload: {
            managedUser
        }
    }
};
