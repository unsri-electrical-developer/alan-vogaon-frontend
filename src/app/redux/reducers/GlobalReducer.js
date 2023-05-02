import {
  GET_GLOBAL_DATA,
  SET_LOADING_GLOBAL,
  SET_PAGINATION_GLOBAL,
} from "../constant";

const initialState = {
  data: [],
  globalPagination: 0,
  loadingGlobal: false,
  totalData: 0,
};

const globalReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_GLOBAL: {
      return {
        ...state,
        loadingGlobal: action?.payload,
      };
    }
    case SET_PAGINATION_GLOBAL: {
      return {
        ...state,
        globalPagination: action?.payload,
      };
    }
    case GET_GLOBAL_DATA: {
      return {
        ...state,
        data: action?.payload?.data || [],
        totalData: action?.payload?.total,
        loadingGlobal: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default globalReducer;
