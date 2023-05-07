import { API, setAuthToken } from '../../../../config/API.js';
import {
  GET_DETAIL_PAYMENT_GATEWAY,
  GET_PAYMENT_GATEWAY,
} from '../../constant.js';

export const getPaymentGateway = () => {
  return (dispatch) => {
    const token = localStorage.getItem('jwt_token');
    setAuthToken(token);
    API.get(`/payment_gateway`)
      .then((res) => {
        dispatch({
          type: GET_PAYMENT_GATEWAY,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_PAYMENT_GATEWAY,
          payload: [],
        });
      });
  };
};

export const addPaymentGateway = (body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.post('/payment_gateway', body);
  // body: pg_name : Doku
};

export const updatePaymentGateway = (params, body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.patch('/payment_gateway/' + params, body);
  // body: pg_name : Faspay
};

export const deletePaymentGateway = (params) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.delete('/payment_gateway/' + params);
};

export const getDetailPaymentGateway = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem('jwt_token');
    setAuthToken(token);
    API.get('/payment_gateway/' + params)
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_DETAIL_PAYMENT_GATEWAY,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_DETAIL_PAYMENT_GATEWAY,
          payload: [],
        });
      });
  };
};
