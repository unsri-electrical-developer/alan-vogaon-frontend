import { API, setAuthToken } from "../../../config/API.js";
import {
  GET_CRUD_ADMIN,
  SET_LOADING_CRUD_ADMIN,
  SET_PAGINATION_CRUD_ADMIN,
} from "../constant.js";

{
  /*
Route::get('/admin', [AdminController::class, 'getAdmin']);
Route::get('/admin/{code}', [AdminController::class, 'getDetailAdmin']);
Route::post('/admin/add', [AdminController::class, 'addAdmin']);
Route::patch('/admin/edit', [AdminController::class, 'editAdmin']);
Route::delete('/admin/{code}', [AdminController::class, 'deleteAdmin']);
*/
}

export const getCrudAdmin = (params) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt_token");
    setAuthToken(token);
    dispatch({
      type: SET_LOADING_CRUD_ADMIN,
      payload: true,
    });
    API.get(`admin?search=${params}`)
      .then((res) => {
        dispatch({
          type: GET_CRUD_ADMIN,
          payload: res.data.data || [],
        });
        dispatch({
          type: SET_PAGINATION_CRUD_ADMIN,
          payload: res?.data?.data?.last_page,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_CRUD_ADMIN,
          payload: [],
        });
        dispatch({
          type: SET_PAGINATION_CRUD_ADMIN,
          payload: 0,
        });
      });
  };
};

export const addCrudAdmin = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/add", params);
};

export const getDetailCrudAdmin = (id) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.get("admin/" + id);
};

export const updateCrudAdmin = (params) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.post("admin/edit", params);
};

export const delCrudAdmin = (code) => {
  const token = localStorage.getItem("jwt_token");
  setAuthToken(token);
  return API.delete("admin/delete/" + code);
};
