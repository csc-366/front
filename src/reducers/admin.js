import {GET_ALL_USERS, PURGE, SET_MANAGED_USER} from "../actions/types";

const initialState = {
    managedUser: null,
    users: []
};

export function adminReducer(state=initialState, action) {
    switch(action.type) {
        case SET_MANAGED_USER:
            return {
                ...state,
                managedUser: action.payload.managedUser
            };
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload.users
            };
        case PURGE:
            return initialState;
        default:
            return state;
    }
}