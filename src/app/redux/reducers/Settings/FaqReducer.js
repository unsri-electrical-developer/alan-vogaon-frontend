import { GET_FAQ } from '../../constant.js';

const initialState = {
  dataFaq: [],
};

const FaqReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_FAQ: {
      return {
        ...state,
        dataFaq: action?.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default FaqReducer;
