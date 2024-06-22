import * as actionTypes from '../constants/inputConstants';

export const saveInput = (result) => async (dispatch) => {
  console.log('action',result);
  dispatch({
    type: actionTypes.SAVE_INPUT,
    payload: {result},
  });
};

export const resetInput = () => async (dispatch) => {

  dispatch({
    type: actionTypes.RESET_INPUT,
    payload: {},
  });
};