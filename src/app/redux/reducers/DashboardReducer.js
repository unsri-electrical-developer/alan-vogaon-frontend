import {
  GET_DASHBOARD,
  GET_GRAFIK_PENDAFTARAN,
  GET_GRAFIK_PENDAPATAN,
  GET_GRAFIK_PENJUALAN,
} from "../constant.js";
const initialState = {
  dataDashboard: {},
  dataGrafikPendaftaran: [],
  dataGrafikPendapatan: [],
  dataGrafikPenjualan: [],
};

const DashboardReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_GRAFIK_PENDAFTARAN: {
      return {
        ...state,
        dataGrafikPendaftaran: action?.payload,
      };
    }
    case GET_GRAFIK_PENDAPATAN: {
      return {
        ...state,
        dataGrafikPendapatan: action?.payload,
      };
    }
    case GET_GRAFIK_PENJUALAN: {
      return {
        ...state,
        dataGrafikPenjualan: action?.payload,
      };
    }
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
