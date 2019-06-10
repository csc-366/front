import {
    SET_USER_INFORMATION,
    LOG_IN,
    REGISTER,
    LOG_OUT, ERROR,
} from "./types";
import {backend} from "../apis/backend";
import history from '../history';
import {camelCaseObject} from "../util/db";

export const setUserInformation = (userInformation) => {
    return {
        type: SET_USER_INFORMATION,
        payload: {
            user: userInformation
        }
    }
};

export const login = (username, password) => async (dispatch) => {
    // TODO: Get Actual User Information
    const userAccount = {username, password};

    try {
        const response = camelCaseObject((await backend.post('/sessions/login', userAccount)).data.data);
        dispatch({
            type: LOG_IN,
            payload: {
                user: response,
                logInError: null
            }
        });
        history.push('/dashboard')
    } catch (e) {
        const response = e.response.data.message;
        dispatch({
            type: ERROR,
            payload: {message: response}
        })
    }
};

export const logout = () => async (dispatch) => {
    try {
        await backend.delete('/sessions');
        dispatch({
            type: LOG_OUT
        });
    } catch (e) {
        dispatch({
            type: LOG_OUT
        });
    }
    history.push('/');
};

export const register = (firstName, lastName, email, username, password, confirmPassword) => async (dispatch) => {
    const userAccount = {firstName, lastName, email, username, password, confirmPassword};

    try {
        const response = camelCaseObject((await backend.post('/users/register', {
            ...userAccount,
            role: 'Citizen Scientist'
        })).data.data);
        dispatch({
            type: REGISTER,
            payload: {
                user: response
            }
        });
        history.push('/dashboard')
    } catch (e) {
        let response = e.response.data.message;
        if (typeof response !== 'string') {
            response = 'Unknown Error'
        }
        dispatch({
            type: ERROR,
            payload: {message: response}
        })
    }
};