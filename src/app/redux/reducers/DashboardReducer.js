import { GET_RIWAYAT_PEMBELIAN, GET_DASHBOARD } from "../constant";

const initialState = {
  dataDashboard: {},
};

const DashboardReducer = function (state = initialState, action) {
  switch (action.type) {
    // case GET_RIWAYAT_PEMBELIAN: {
    //   return {
    //     ...state,
    //     dataRiwayatPembelian: action?.payload,
    //   };
    // }
    case GET_DASHBOARD: {
      return {
        ...state,
        dataDashboard: action?.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default DashboardReducer;
