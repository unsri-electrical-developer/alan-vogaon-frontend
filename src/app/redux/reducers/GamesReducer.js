import {
  REMOVE_USER_DATA,
  SET_USER_DATA,
  USER_LOGGED_OUT,
  GET_ALL_USERS,
  GET_DETAIL_USER,
} from "../actions/UserActions";

import {
  GET_GAMES_VOUCHER,
  GET_ALL_CATEGORIES,
  GET_DETAIL_CATEGORY,
  DELETE_CATEGORY,
  GET_ALL_GAMES_VOUCHER,
} from "../actions/GamesActions";

const initialState = {
  data: [],
  gameVoucher: {},
  gameVoucherAll: [],
};

const gamesReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES: {
      return {
        ...state,
        ...action.data,
      };
    }

    case GET_GAMES_VOUCHER: {
      return {
        ...state,

        gameVoucher: action.payload,
      };
    }

    case GET_ALL_GAMES_VOUCHER: {
      return {
        ...state,
        gameVoucherAll: action.payload,
      };
    }

    case GET_DETAIL_CATEGORY: {
      return {
        ...state,
        ...action.data,
      };
    }

    case DELETE_CATEGORY: {
      let cat = state.data.filter(
        (item) => item.category_code !== action.payload.category_code
      );
      return {
        ...state,
        data: cat,
      };
    }

    default: {
      return state;
    }
  }
};

export default gamesReducer;
