import { API, setAuthToken } from '../../../../config/API.js';
import {
  GET_PAYMENT_METHOD,
  GET_DETAIL_PAYMENT_METHOD,
} from '../../constant.js';

export const getPaymentMethod = (query = '') => {
  return (dispatch) => {
    const token = localStorage.getItem('jwt_token');
    setAuthToken(token);
    API.get(`/payment_method`+query)
      .then((res) => {
        dispatch({
          type: GET_PAYMENT_METHOD,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_PAYMENT_METHOD,
          payload: [],
        });
      });
  };
};

export const addPaymentMethod = (body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.post('/payment_method', body);
  /*
    -body: 
      pm_title: JAGO
			pm_code: jago-3
			pm_logo: base64
			from: PG-2346278892 : payment gateway code
    */
};

export const updatePaymentMethod = (params, body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.patch('/payment_method/' + params, body);
  // params : pm_code
  /*
    - body :
		-pm_title : Apple Pay
		-pm_logo : base64
		-from : dana : payment gateway code
		-pm_code : apple-pay
  */
};

export const deletePaymentMethod = (params) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.delete('/payment_method/' + params);
  //params : pm_code
};

export const getDetailPaymentMethod = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem('jwt_token');
    setAuthToken(token);
    API.get('/payment_method/' + params)
      // params = pm_code
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_DETAIL_PAYMENT_METHOD,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_DETAIL_PAYMENT_METHOD,
          payload: [],
        });
      });
  };
};

export const togglePaymentStatus = (params, body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.post('/payment_method/' + params, body);
  /*
    -params: pm_code
    -body:  isActive : 1 / 0
        1 -> aktif, 0 -> nonaktif
			
    */
};
