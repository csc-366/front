import {LOG_OUT, LOG_IN, REGISTER, SET_USER_INFORMATION} from '../actions/types';
import history from "../history";

const initialState = {
    username: null,
    password: null,
    logInError: null,
    registerError: null,
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    loginTime: null,
    lastUsed: null
};

export function userReducer(state=initialState, action) {
    switch(action.type) {
        case LOG_IN:
        case REGISTER:
        case SET_USER_INFORMATION:
            return {
                ...state,
                ...action.payload.user
            };
        case LOG_OUT:
            history.push('/');
            return initialState;
        default:
            return state
    }
}