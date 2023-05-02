import { GET_SERTIFIKAT, SET_LOADING_SERTIFIKAT, SET_PAGINATION_SERTIFIKAT } from '../constant';

const initialState = {
  sertifikat: [],
  sertifikatPagination: 0,
  loadingSertifikat: false,
  totalSertifikat: 0,
};

const sertifikatReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_SERTIFIKAT: {
      return {
        ...state,
        loadingSertifikat: action?.payload,
      };
    }
    case SET_PAGINATION_SERTIFIKAT: {
      return {
        ...state,
        sertifikatPagination: action?.payload,
      };
    }
    case GET_SERTIFIKAT: {
      return {
        ...state,
        sertifikat: action?.payload?.data || [],
        totalSertifikat: action?.payload?.total,
        loadingSertifikat: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default sertifikatReducer;
