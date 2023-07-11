import {
  GET_RIWAYAT_PEMBELIAN,
  GET_TOTAL_PEMBELIAN,
  GET_RIWAYAT_TOPUP,
  GET_TOTAL_TOPUP,
  GET_DETAIL_TOPUP,
  GET_DETAIL_PEMBELIAN,
  GET_USERS_TOPUP,
  GET_DETAIL_USER_TOPUP,
  SET_USER_SALDO,
} from "../constant.js";

const initialState = {
  dataRiwayatPembelian: [],
  totalPembelian: {},
  dataRiwayatTopup: [],
  totalTopup: {},
  detailTopup: {},
  detailPembelian: {},
  dataUsersTopup: [],
  detailUserTopup: [],
  userSaldo: {},
};

const TransactionReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_RIWAYAT_PEMBELIAN: {
      return {
        ...state,
        dataRiwayatPembelian: action.payload,
      };
    }
    case GET_TOTAL_PEMBELIAN: {
      return {
        ...state,
        totalPembelian: action.payload,
      };
    }
    case GET_RIWAYAT_TOPUP: {
      return {
        ...state,
        dataRiwayatTopup: action.payload,
      };
    }
    case GET_TOTAL_TOPUP: {
      return {
        ...state,
        totalTopup: action.payload,
      };
    }
    case GET_DETAIL_TOPUP: {
      return {
        ...state,
        detailTopup: action.payload,
      };
    }
    case GET_DETAIL_PEMBELIAN: {
      return {
        ...state,
        detailPembelian: action.payload,
      };
    }
    case GET_USERS_TOPUP: {
      return {
        ...state,
        dataUsersTopup: action.payload,
      };
    }
    case GET_DETAIL_USER_TOPUP: {
      // console.log("action.payload", action.payload);
      return {
        ...state,
        detailUserTopup: action.payload,
      };
    }
    case SET_USER_SALDO: {
      return {
        ...state,
        userSaldo: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default TransactionReducer;
