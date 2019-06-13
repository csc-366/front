import { DECREMENT_FIELD, INCREMENT_FIELD } from "./types";

export const decrementField = fieldType => {
  return {
    type: DECREMENT_FIELD,
    payload: { fieldType }
  };
};

export const incrementField = fieldType => {
  return {
    type: INCREMENT_FIELD,
    payload: { fieldType }
  };
};
