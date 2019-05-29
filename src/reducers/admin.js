import {SET_MANAGED_USER} from "../actions/types";

const initialState = {
    managedUser: null
};

export function adminReducer(state=initialState, action) {
    switch(action.type) {
        case SET_MANAGED_USER:
            return {
                ...state,
                managedUser: action.payload.managedUser
            };
        default:
            return state;
    }
}