import {PURGE} from '../actions/types';

const initialState = {
    success: null
};

export function purgeReducer(state=initialState, action) {
    if (action.type === PURGE) {
        return {
            ...state,
            success: action.payload.success
        }
    }
    return state;
}
