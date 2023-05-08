import { GET_GENERAL_INFO } from '../../constant.js';

const initialState = {
  dataGeneralInfo: [],
};

const GeneralInfoReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_GENERAL_INFO: {
      return {
        ...state,
        dataGeneralInfo: action?.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default GeneralInfoReducer;
