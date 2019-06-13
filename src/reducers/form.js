import { LOAD_PENDING } from "../actions/types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_PENDING:
      return {
        ...state,
        data: action.payload.data
      };
    default:
      return state;
  }
};

export const loadPending = data => ({ type: LOAD_PENDING, payload: { data } });
export default reducer;
