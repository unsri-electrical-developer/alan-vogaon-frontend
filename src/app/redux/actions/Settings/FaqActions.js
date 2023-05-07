import { API, setAuthToken } from '../../../../config/API.js';
import { GET_FAQ } from '../../constant.js';

export const getFaq = () => {
  return (dispatch) => {
    const token = localStorage.getItem('jwt_token');
    setAuthToken(token);
    API.get(`/faq`)
      .then((res) => {
        dispatch({
          type: GET_FAQ,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_FAQ,
          payload: [],
        });
      });
  };
};

export const addFaq = (body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.post('/faq', body);
};

/*
body: {
    "faq" : [
        {
            "pertanyaan" : "pertanyaan 1",
            "jawaban" : "jawaban 1"
        },
        {
            "pertanyaan" : "pertanyaan 2",
            "jawaban" : "jawaban 2"
        },
        {
            "pertanyaan" : "pertanyaan 3",
            "jawaban" : "jawaban 3"
        }
    ]
}
*/
