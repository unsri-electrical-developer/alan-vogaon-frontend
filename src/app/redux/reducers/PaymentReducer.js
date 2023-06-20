import {
  GET_PAYMENT_GATEWAY,
  GET_DETAIL_PAYMENT_GATEWAY,
  GET_PAYMENT_METHOD,
  GET_DETAIL_PAYMENT_METHOD,
} from '../constant.js';

const initialState = {
  dataPaymentGateway: [],
  detailPaymentGateway: {},
  dataPaymentMethod: [],
  detailPaymentMethod: {},
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
    case GET_PAYMENT_METHOD: {
      return {
        ...state,
        dataPaymentMethod: action?.payload,
      };
    }
    case GET_DETAIL_PAYMENT_METHOD: {
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
