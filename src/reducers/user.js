import {LOG_OUT, LOG_IN, REGISTER, SET_USER_INFORMATION, PURGE} from '../actions/types';

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
            return initialState;
        case PURGE:
            return initialState;
        default:
            return state
    }
}