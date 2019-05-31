import {GET_LOCATIONS, GET_TAG_POSITIONS, GET_TAG_COLORS, PURGE} from "../actions/types";

const initialState = {
    locations: [],
    positions: [],
    colors: []
};

export function formOptionsReducer(state=initialState, action) {
    switch(action.type) {
        case GET_LOCATIONS:
            return {
                ...state,
                locations: action.payload.locations
            };
        case GET_TAG_COLORS:
            return {
                ...state,
                colors: action.payload.colors
            };
        case GET_TAG_POSITIONS:
            return {
                ...state,
                positions: action.payload.positions
            };
        case PURGE:
            return initialState;
        default:
            return state;
    }
}
