import {ERROR, CLEAR_ERROR, PURGE} from '../actions/types';

const initialState = {
    error: null
};

export function errorReducer(state=initialState, action) {
    switch(action.type) {
        case ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        case PURGE:
            return initialState;
        default:
            return state
    }
}