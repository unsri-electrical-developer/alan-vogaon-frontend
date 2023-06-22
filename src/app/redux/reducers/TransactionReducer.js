import {
  GET_RIWAYAT_PEMBELIAN,
  GET_TOTAL_PEMBELIAN,
  GET_RIWAYAT_TOPUP,
  GET_TOTAL_TOPUP,
  GET_DETAIL_TOPUP,
  GET_DETAIL_PEMBELIAN,
} from "../constant.js";

const initialState = {
  dataRiwayatPembelian: [],
  totalPembelian: {},
  dataRiwayatTopup: [],
  totalTopup: {},
  detailTopup: {},
  detailPembelian: {},
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
    default: {
      return state;
    }
  }
};

export default TransactionReducer;
