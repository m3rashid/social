import { GET_ERRORS, CLEAR_ERRORS } from "../constants";

// function to return errors
export const returnErrors = (
  msg: string | any,
  status: number,
  id: any = null
) => {
  // return an action with type of GET_ERRORS
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

// action to clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
