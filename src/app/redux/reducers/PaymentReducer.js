import {
  GET_PAYMENT_GATEWAY,
  GET_DETAIL_PAYMENT_GATEWAY,
} from '../constant.js';

const initialState = {
  dataPaymentGateway: [],
  detailPaymentGateway: {},
  dataPaymentMethod: [],
};

const PaymentReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENT_GATEWAY: {
      return {
        ...state,
        dataPaymentGateway: action?.payload,
      };
    }
    case GET_DETAIL_PAYMENT_GATEWAY: {
      return {
        ...state,
        detailPaymentGateway: action?.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default PaymentReducer;
