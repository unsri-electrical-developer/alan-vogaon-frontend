import {REMOVE_USER_DATA, SET_USER_DATA, USER_LOGGED_OUT, GET_ALL_USERS, GET_DETAIL_USER} from '../actions/UserActions';

const initialState = {
    data:[]
};

const userReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CATEGORIES: {
            return {
                ...state,
                ...action.data
            };
        }
          
        case GET_DETAIL_CATEGORY: {
            return {
                ...state,
                ...action.data
            };
        }

         case DELETE_CATEGORY: {
             let cat = state.data.filter(
                (item) => item.category_code !== action.payload.category_code
            );
            return {
                ...state,
                data: cat
            };
        }

        default: {
            return state;
        }
    }
};

export default userReducer;
