import {
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  POSTS_LOADING,
  SERVER_ROOT_URL,
  POSTS_LOADED,
} from "../constants";
import { clearErrors, returnErrors } from "./error.action";
import { tokenConfig } from "./auth.action";
import axios from "axios";
import compress from "../../components/utils/compress";
import handleFileUpload from "../../components/utils/fileUpload";

// function to send that post is loading
export const postsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};

// function to get posts
export const getPosts = () => (dispatch: Function, getState: Function) => {
  dispatch(postsLoading());
  axios
    .get(`${SERVER_ROOT_URL}/post`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: POSTS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// function to add post
export const addPost =
  ({ file, caption }: { file: File; caption: string }) =>
  async (dispatch: Function, getState: Function) => {
    // setting the post loading
    dispatch(postsLoading());
    // checking token (authorization)
    const token = getState().auth.token;
    if (!token) {
      dispatch(returnErrors("Unauthorized to post", 401, ADD_POST_FAIL));
      return;
    }
    // compress the image to be uploaded to s3
    const compressedImage = await compress(file);
    if (!compressedImage) {
      dispatch(returnErrors("Error", 400, ADD_POST_FAIL));
      return;
    }
    // handle the file upload to s3
    const imageUrl = await handleFileUpload(token, compressedImage);
    if (!imageUrl) {
      dispatch(returnErrors("Error in uploading image", 500, ADD_POST_FAIL));
      return;
    }
    // saving the url generated to the database
    const data = await axios
      .post(
        `${SERVER_ROOT_URL}/post/add`,
        {
          photo: imageUrl,
          caption: caption,
        },
        tokenConfig(getState)
      )
      .then((res) => res.data);
    if (data.error) {
      dispatch(returnErrors(data.error, 500, ADD_POST_FAIL));
      return;
    }
    dispatch(clearErrors());
    dispatch({
      type: ADD_POST_SUCCESS,
      payload: data,
    });
  };

// function to delete post
export const deletePost = () => ({});
