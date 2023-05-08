import { API, setAuthToken } from '../../../../config/API.js';
import { GET_GENERAL_INFO } from '../../constant.js';

export const getGeneralInfo = () => {
  return (dispatch) => {
    const token = localStorage.getItem('jwt_token');
    setAuthToken(token);
    API.get(`/general_info`)
      .then((res) => {
        dispatch({
          type: GET_GENERAL_INFO,
          payload: res.data.data || [],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_GENERAL_INFO,
          payload: [],
        });
      });
  };
};

export const addGeneralInfo = (body) => {
  const token = localStorage.getItem('jwt_token');
  setAuthToken(token);
  return API.post('/general_info', body);
};

/*
body: {
    "about" : "<p>Isi about</p>",
    "contact" : [
        {
            "contact_code" : "whatsapp",
            "contact_url" : "08578343643"
        },
        {
            "contact_code" : "telegram",
            "contact_url" : "t.me/vogaon"
        },
        {
            "contact_code" : "email",
             "contact_url" : "vogaon@gmail.com"
        },
        {
            "contact_code" : "message",
            "contact_url" : "08547563"
        }
    ],
    "social_contact" : [
        {
            "social_contact_code": "facebook",
            "social_contact_url" : "facebook.com/vogaon"
        },
        {
            "social_contact_code": "tiktok",
            "social_contact_url" : "tiktok.com/vogaon"
        },
        {
            "social_contact_code": "instagram",
            "social_contact_url" : "instagram.com/vogaon"
        }
    ]
}
*/
