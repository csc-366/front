import {
    SET_USER_INFORMATION,
    LOG_IN,
    REGISTER,
    LOG_OUT, ERROR,
} from "./types";
import {backend} from "../apis/backend";
import history from '../history';

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
        let response = (await backend.post('/sessions/login', userAccount)).data.data;
        response = Object.entries(response).map(([key, value]) => {
            return [key.replace(/^([A-Z])(.+)/, ((match, p1, p2) => `${p1.toLowerCase()}${p2}`)), value]
        }).reduce((agg, [key,value]) => { return {...agg, [key]: value}},{});
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

export const logout = () => {
    return {
        type: LOG_OUT
    }
};

export const register = (firstName, lastName, email, username, password, confirmPassword) => async (dispatch) => {
    const userAccount = {firstName, lastName, email, username, password, confirmPassword};

    try {
        const response = await backend.post('/users/register', {
            ...userAccount,
            role: 'Citizen Scientist'
        });
        dispatch({
            type: REGISTER,
            payload: {
                user: response.data.data
            }
        })
    } catch (e) {
        let response = e.response.data.message;
        console.log(typeof response);
        if (typeof response === Array) {
            response = response.map(item => `${item.param} ${item.msg}`).join('\n')
        }
        console.log(response);
        dispatch({
            type: ERROR,
            payload: {message: response}
        })
    }
};