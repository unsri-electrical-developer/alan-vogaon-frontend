import {
  GET_CRUD_ADMIN,
  SET_LOADING_CRUD_ADMIN,
  SET_PAGINATION_CRUD_ADMIN,
} from "../constant";

const initialState = {
  admin: [],
  adminPagination: 0,
  loadingAdmin: false,
};

const CrudAdminReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_CRUD_ADMIN: {
      return {
        ...state,
        loadingAdmin: action?.payload,
      };
    }
    case SET_PAGINATION_CRUD_ADMIN: {
      return {
        ...state,
        adminPagination: action?.payload,
      };
    }
    case GET_CRUD_ADMIN: {
      return {
        ...state,
        admin: action?.payload || [],
        loadingAdmin: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default CrudAdminReducer;
