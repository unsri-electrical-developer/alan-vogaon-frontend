import { GET_PRIVACY_POLICY } from '../../constant.js';

const initialState = {
  dataPrivacyPolicy: [],
};

const PrivacyPolicyReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_PRIVACY_POLICY: {
      return {
        ...state,
        dataPrivacyPolicy: action?.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default PrivacyPolicyReducer;
