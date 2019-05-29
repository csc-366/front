import {ERROR, CLEAR_ERROR} from '../actions/types';

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
        default:
            return state
    }
}