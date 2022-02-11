import {
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  POSTS_LOADING,
  POSTS_LOADED,
} from "../constants";

const initialState = {
  posts: [],
  savedPosts: [],
  loading: false,
  userPosts: [],
};

const postReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POSTS_LOADED:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case ADD_POST_FAIL:
      return state;
    default:
      return state;
  }
};

export default postReducer;
