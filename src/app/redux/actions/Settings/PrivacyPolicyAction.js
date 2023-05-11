import { API, setAuthToken } from '../../../../config/API.js';
import { GET_PRIVACY_POLICY } from '../../constant.js';

export const getPrivacyPolicy = () => {
  return (dispatch) => {
    const token = localStorage.getItem('jwt_token');
    setAuthToken(token);
    API.get('/privacy_policy')
      .then((res) => {
        dispatch({
          type: GET_PRIVACY_POLICY,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_PRIVACY_POLICY,
          payload: [],
        });
      });
  };
};

export const savePrivacyPolicy = (body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.post('/privacy_policy', body);
  /*
    		- body :
			- privacy_policy: <p>isi privacy policy</p>
  */
};
