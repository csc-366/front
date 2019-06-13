import {
    GET_PENDING_OBSERVATION,
    GET_PENDING_OBSERVATION_COUNT,
    GET_PENDING_OBSERVATIONS,
    PURGE,
} from "../actions/types";

const initialState = {
    pending: [],
    currentPending: null,
    pendingCount: 0,
};

export function observationsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PENDING_OBSERVATIONS:
            return {
                ...state,
                pending: action.payload.observations
            };
        case GET_PENDING_OBSERVATION:
            return {
                ...state,
                currentPending: action.payload.observation,
            };
        case GET_PENDING_OBSERVATION_COUNT:
            return {
                ...state,
                pendingCount: action.payload.count
            };
        case PURGE:
            return initialState;
        default:
            return state;
    }
}
