import * as actionTypes from "../constants/inputConstants"
const INPUT_INITIAL_STATE = {
  input: {},
};

export const inputReducer = (state = INPUT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SAVE_INPUT:
      console.log('reducer',action.payload);
      return {
        ...state,
        input: action.payload
      };
    case actionTypes.RESET_INPUT:
      return {
        ...state,
        input: {},
      };
    default:
      return state;
  }
};