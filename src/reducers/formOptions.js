import {DELETE_VALUE, GET_PRESET_DATA, PURGE, UPDATE_PRESET_DATA} from "../actions/types";

const initialState = {
    locations: [],
    positions: [],
    colors: [],
    rookeries: [],
    ageClasses: [],
    affiliations: []
};

export function formOptionsReducer(state=initialState, action) {
    switch(action.type) {
        case GET_PRESET_DATA:
        case UPDATE_PRESET_DATA:
            return {
                ...state,
                ...action.payload
            };
        case DELETE_VALUE: {
            const [valueType, valueKey, value] = action.payload.value;
            const newGroup = state[valueType].filter(v => v[valueKey] !== value);
            return {
                ...state,
                [valueType]: newGroup
            };
        }
        case PURGE:
            return initialState;
        default:
            return state;
    }
}
