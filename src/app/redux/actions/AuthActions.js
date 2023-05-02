import { API, setAuthToken } from '../../../config/API.js';

export function sendDaftar(params) {
    return API.post('register', params);
}
export function sendVerifyEmail(email, token, expires, bearer) {
    setAuthToken(bearer);
    return API.get(`email/verify/${email}/${token}/${expires}`);
}
