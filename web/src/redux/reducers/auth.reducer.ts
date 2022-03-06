import {
  AUTH_ERROR,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_ONE_SUCCESS,
  REGISTER_TWO_SUCCESS,
  REGISTER_ONE_FAIL,
  REGISTER_TWO_FAIL,
  // DELETE_USER_SUCCESS,
  // DELETE_USER_FAIL,
  // FORGOT_PASSWORD,
  // RESET_PASSWORD_SUCCESS,
  // RESET_PASSWORD_FAIL,
  // SERVER_ROOT_URL,
} from "../constants";

const initialState = {
  registerOne: {
    username: "",
    email: "",
    success: false,
  },
  // getting the token from local storage
  token: window.localStorage.getItem("social-token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const AuthReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };

    case REGISTER_ONE_SUCCESS:
      return {
        ...state,
        registerOne: {
          ...state.registerOne,
          username: action.payload.username,
          email: action.payload.email,
          success: true,
        },
      };

    case REGISTER_ONE_FAIL:
      return {
        ...state,
        registerOne: {
          ...state.registerOne,
          username: "",
          email: "",
          success: false,
        },
      };
    case LOGIN_SUCCESS:
    case REGISTER_TWO_SUCCESS:
      // set token to local storage
      localStorage.setItem("social-token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_TWO_FAIL:
      // remove token from local storage
      localStorage.removeItem("social-token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
