import { API, setAuthToken } from '../../../config/API.js';
import { GET_SLIDERS } from '../constant.js';

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

export const addSlider = (body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.post('/sliders', body);
  // body: image: data:/image/base64
};

export const updateSlider = (params, body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.patch('/sliders/' + params, body);
  // body: image: data:/image/base64
};

export const deleteSlider = (params) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.delete('/sliders/' + params);
};
