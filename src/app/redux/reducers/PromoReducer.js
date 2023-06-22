import { GET_PROMO, SET_LOADING_PROMO, SET_PAGINATION_PROMO } from '../constant';

const initialState = {
  promo: [],
  promoPagination: 0,
  loadingPromo: false,
};

const PromoReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_PROMO: {
      return {
        ...state,
        loadingPromo: action?.payload,
      };
    }
    case SET_PAGINATION_PROMO: {
      return {
        ...state,
        promoPagination: action?.payload,
      };
    }
    case GET_PROMO: {
      return {
        ...state,
        promo: action?.payload || [],
        loadingPromo: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default PromoReducer;
