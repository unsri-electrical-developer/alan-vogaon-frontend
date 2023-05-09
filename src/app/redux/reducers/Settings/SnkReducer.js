import { GET_SNK } from '../../constant.js';

const initialState = {
  dataSnk: [],
};

const SnkReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_SNK: {
      return {
        ...state,
        dataSnk: action?.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default SnkReducer;
