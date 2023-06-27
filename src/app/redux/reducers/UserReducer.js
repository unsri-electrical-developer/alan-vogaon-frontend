import {
  REMOVE_USER_DATA,
  SET_USER_DATA,
  USER_LOGGED_OUT,
  GET_ALL_USERS,
  GET_DETAIL_USER,
  GET_PROFILE,
} from "../actions/UserActions";

const initialState = {};

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data,
      };
    }
    case GET_PROFILE: {
      return {
        ...state,
        ...action.data,
      };
    }
    case REMOVE_USER_DATA: {
      return {
        ...state,
      };
    }
    case USER_LOGGED_OUT: {
      return {};
    }
    case GET_ALL_USERS: {
      return {
        ...state,
        allData: action.payload,
      };
    }
    case GET_DETAIL_USER: {
      return {
        ...state,
        detailUser: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
