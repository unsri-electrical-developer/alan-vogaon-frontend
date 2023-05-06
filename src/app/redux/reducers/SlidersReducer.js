import {
  GET_SLIDERS,
  ADD_SLIDERS,
  EDIT_SLIDERS,
  DELETE_SLIDERS,
} from '../constant.js';

const initialState = {
  dataSliders: [],
};

const SlidersReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_SLIDERS: {
      return {
        ...state,
        dataSliders: action?.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default SlidersReducer;
