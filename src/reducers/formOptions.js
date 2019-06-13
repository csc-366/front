import {
  DELETE_VALUE,
  GET_PRESET_DATA,
  PURGE,
  UPDATE_PRESET_DATA,
  INCREMENT_FIELD,
  DECREMENT_FIELD
} from "../actions/types";

const initialState = {
  locations: [],
  positions: [],
  colors: [],
  rookeries: [],
  ageClasses: [],
  affiliations: [],
  counts: {
    marks: 0,
    fieldLeaders: 1,
    tags: 0,
    measurements: 0
  }
};

export function formOptionsReducer(state = initialState, action) {
  switch (action.type) {
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
    case DECREMENT_FIELD: {
      const { fieldType } = action.payload;
      const { counts } = state;
      const newCounts = {
        ...counts,
        [fieldType]:
          counts[fieldType] > 0 ? counts[fieldType] - 1 : counts[fieldType]
      };
      return {
        ...state,
        counts: newCounts
      };
    }
    case INCREMENT_FIELD: {
      const { fieldType } = action.payload;
      const { counts } = state;
      const newCounts = {
        ...counts,
        [fieldType]:
          counts[fieldType] < 4 ? counts[fieldType] + 1 : counts[fieldType]
      };
      return {
        ...state,
        counts: newCounts
      };
    }
    case PURGE:
      return initialState;
    default:
      return state;
  }
}
