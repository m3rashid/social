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
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  FORGOT_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  SERVER_ROOT_URL,
  CLEAR_ERRORS,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_FAIL,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
  UPDATE_BIO_SUCCESS,
  UPDATE_BIO_FAIL,
  UPDATE_WEBSITE_SUCCESS,
  UPDATE_WEBSITE_FAIL,
  UPDATE_DOB_SUCCESS,
  UPDATE_DOB_FAIL,
} from "../constants";
import { configContentType } from "../constants/configs";
import {
  LoginUserType,
  RegisterOneUserType,
  RegisterTwoUserType,
  ResetPasswordType,
} from "../constants/types";
import { clearErrors, returnErrors } from "./error.action";
import axios from "axios";
import compress from "../../components/utils/compress";
import handleFileUpload from "../../components/utils/fileUpload";

// logout user action
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// load user action
export const userLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// forgot password action
export const forgotPassword = ({ username, email }: RegisterOneUserType) => {
  return {
    type: FORGOT_PASSWORD,
    payload: { username, email },
  };
};

// function to set token to the auth header
export const tokenConfig = (getState: Function) => {
  // get token from localstorage
  const token = getState().auth.token;
  // if there is token, add to headers
  if (token) {
    configContentType.headers["authorization"] = token;
  }
  // no token found, send the usual headers
  return configContentType;
};

// load user action
export const loadUser = () => (dispatch: Function, getState: Function) => {
  // set user loading
  dispatch(userLoading());

  // get request for the user to the server
  axios
    // take the token from the localstorage
    .get(`${SERVER_ROOT_URL}/user`, tokenConfig(getState))
    .then((res) => {
      // if the request is successful, dispatch the user loaded action
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // if the request is unsuccessful, dispatch the auth error action
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// function to register user phase one
export const registerOne =
  ({ username, email }: RegisterOneUserType) =>
  (dispatch: Function) => {
    // set user loading
    dispatch(userLoading());

    // get username and email data to be sent to the server
    const body = JSON.stringify({ username, email });
    axios
      // post request to the server for the registration phase one
      .post(`${SERVER_ROOT_URL}/user/register-one`, body, configContentType)
      .then((res) => {
        // if the request is successful, dispatch the register one success action
        dispatch({
          type: REGISTER_ONE_SUCCESS,
          payload: { ...res.data, username, email },
        });
      })
      .catch((err: any) => {
        // if the request is unsuccessful, dispatch the register one fail action and auth error action
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            REGISTER_ONE_FAIL
          )
        );
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };

// function to register user phase two
export const registerTwo =
  ({
    username,
    email,
    name,
    password,
    confirmPassword,
    otp,
  }: RegisterTwoUserType) =>
  (dispatch: Function) => {
    // set user loading
    dispatch(userLoading());

    // get username, email, name, password, confirm password and otp data to be sent to the server
    const body = JSON.stringify({
      username,
      email,
      name,
      password,
      confirmPassword,
      otp,
    });
    axios
      // post request to the server for the registration phase two
      .post(`${SERVER_ROOT_URL}/user/register-two`, body, configContentType)
      .then((res) => {
        // if the request is successful, dispatch the register two success action and clear errors action
        dispatch({
          type: REGISTER_TWO_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CLEAR_ERRORS,
        });
      })
      .catch((err: any) => {
        // if the request is unsuccessful, dispatch the register two fail action and auth error action
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            REGISTER_TWO_FAIL
          )
        );
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };

// function to login the user
export const login =
  ({ username, password }: LoginUserType) =>
  (dispatch: Function) => {
    // set user loading
    dispatch(userLoading());

    // get username and password data to be sent to the server
    const body = JSON.stringify({ username, password });
    axios
      // post request to the server for the login
      .post(`${SERVER_ROOT_URL}/user/login`, body, configContentType)
      .then((res) => {
        // if the request is successful, dispatch the login success action and clear errors action
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CLEAR_ERRORS,
        });
      })
      .catch((err: any) => {
        // if the request is unsuccessful, dispatch the login fail action and login fail action
        dispatch(
          returnErrors(err.response.data, err.response.status, LOGIN_FAIL)
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

// function to delete the user permanently
export const deleteUser =
  ({ username, password }: LoginUserType) =>
  (dispatch: Function) => {
    // set user loading
    dispatch(userLoading());

    // get username and password data to be sent to the server
    const body = JSON.stringify({ username, password });
    axios
      // post request to the server for the delete user
      .post(`${SERVER_ROOT_URL}/user/delete`, body, configContentType)
      .then((res) => {
        dispatch({
          // if the request is successful, dispatch the delete user success action
          type: DELETE_USER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err: any) => {
        // if the request is unsuccessful, dispatch the delete user fail action
        dispatch(
          returnErrors(
            err.resposnse.data,
            err.response.status,
            DELETE_USER_FAIL
          )
        );
      });
  };

// function to reset the user password
export const resetPassword =
  ({ username, password, confirmPassword, otp }: ResetPasswordType) =>
  (dispatch: Function) => {
    // set user loading
    dispatch(userLoading());

    // get username, password, confirm password and otp data to be sent to the server
    const body = JSON.stringify({ username, password, confirmPassword, otp });
    axios
      // post request to the server for the reset password
      .post(`${SERVER_ROOT_URL}/user/delete`, body, configContentType)
      .then((res) => {
        // if the request is successful, dispatch the reset password success action
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((err: any) => {
        // if the request is unsuccessful, dispatch the reset password fail action
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            RESET_PASSWORD_FAIL
          )
        );
      });
  };

export const updateName =
  (name: string) => (dispatch: Function, getState: Function) => {
    dispatch(userLoading());
    axios
      .post(
        `${SERVER_ROOT_URL}/user/update-name`,
        { name: name },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({
          type: UPDATE_NAME_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, UPDATE_NAME_FAIL)
        );
      });
  };

export const updateAvatar =
  (avatar: File) => async (dispatch: Function, getState: Function) => {
    dispatch(userLoading());
    if (!avatar) return;

    const token = getState().auth.token;
    if (!token) {
      dispatch(returnErrors("Unauthorized", 401));
      return;
    }

    const compressedImage = await compress(avatar);
    if (!compressedImage) {
      dispatch(returnErrors("Error", 400, UPDATE_AVATAR_FAIL));
      return;
    }
    // handle the file upload to s3
    const imageUrl = await handleFileUpload(token, compressedImage);
    if (!imageUrl) {
      dispatch(
        returnErrors("Error in uploading image", 500, UPDATE_AVATAR_FAIL)
      );
      return;
    }
    const data = await axios
      .post(
        `${SERVER_ROOT_URL}/user/update-avatar`,
        {
          avatar: imageUrl,
        },
        tokenConfig(getState)
      )
      .then((res) => res.data);
    if (data.error) {
      dispatch(returnErrors(data.error, 500, UPDATE_AVATAR_FAIL));
      return;
    }
    dispatch(clearErrors());
    dispatch({
      type: UPDATE_AVATAR_SUCCESS,
      payload: data,
    });
  };

export const updateBio =
  (bio: string) => (dispatch: Function, getState: Function) => {
    dispatch(userLoading());
    axios
      .post(
        `${SERVER_ROOT_URL}/user/update-bio`,
        { bio: bio },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({
          type: UPDATE_BIO_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, UPDATE_BIO_FAIL)
        );
      });
  };

export const updateWebsite =
  (website: string) => (dispatch: Function, getState: Function) => {
    dispatch(userLoading());
    axios
      .post(
        `${SERVER_ROOT_URL}/user/update-website`,
        { website: website },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({
          type: UPDATE_WEBSITE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            UPDATE_WEBSITE_FAIL
          )
        );
      });
  };

export const updateDob =
  (dob: any) => (dispatch: Function, getState: Function) => {
    dispatch(userLoading());
    axios
      .post(
        `${SERVER_ROOT_URL}/user/update-dob`,
        { dob: dob },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({
          type: UPDATE_DOB_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, UPDATE_DOB_FAIL)
        );
      });
  };
