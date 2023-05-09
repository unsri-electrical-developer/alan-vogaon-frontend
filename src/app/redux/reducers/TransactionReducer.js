import { GET_RIWAYAT_PEMBELIAN, GET_TOTAL_PEMBELIAN } from "../constant.js";

const initialState = {
  dataRiwayatPembelian: [],
  totalPembelian: {},
};

const TransactionReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_RIWAYAT_PEMBELIAN: {
      return {
        ...state,
        dataRiwayatPembelian: action?.payload,
      };
    }
    case GET_TOTAL_PEMBELIAN: {
      return {
        ...state,
        totalPembelian: action?.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default TransactionReducer;
