import { GET_ADMIN, SET_LOADING_ADMIN, SET_PAGINATION_ADMIN } from '../constant';

const initialState = {
  admin: [],
  adminPagination: 0,
  loadingAdmin: false,
  totalAdmin: 0,
};

const adminReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_ADMIN: {
      return {
        ...state,
        loadingAdmin: action?.payload,
      };
    }
    case SET_PAGINATION_ADMIN: {
      return {
        ...state,
        adminPagination: action?.payload,
      };
    }
    case GET_ADMIN: {
      return {
        ...state,
        admin: action?.payload?.data || [],
        totalAdmin: action?.payload?.total,
        loadingAdmin: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default adminReducer;
