import { API, setAuthToken } from '../../../../config/API.js';
import { GET_SNK } from '../../constant.js';

export const getSnk = () => {
  return (dispatch) => {
    const token = localStorage.getItem('jwt_token');
    setAuthToken(token);
    API.get('/syarat_ketentuan')
      .then((res) => {
        dispatch({
          type: GET_SNK,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_SNK,
          payload: [],
        });
      });
  };
};

export const saveSnk = (body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.post('/syarat_ketentuan', body);
  /*
    		- body :
			- syarat_ketentuan : <p>papapappapapapap</p>
  */
};
