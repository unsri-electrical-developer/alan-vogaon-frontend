import { API, setAuthToken } from '../../../config/API.js';
import {
  GET_SLIDERS,
  ADD_SLIDERS,
  EDIT_SLIDERS,
  DELETE_SLIDERS,
} from '../constant.js';

export const getSliders = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem('jwt_token');
    setAuthToken(token);
    API.get(`/sliders`)
      .then((res) => {
        dispatch({
          type: GET_SLIDERS,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_SLIDERS,
          payload: [],
        });
      });
  };
};
