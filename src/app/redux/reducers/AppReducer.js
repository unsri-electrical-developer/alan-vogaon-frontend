import {
  DASHBOARD_DATA,
  GET_CHART_CHART_LINE,
  GET_CHART_CHART_PIE,
  LOADING_DASHBOARD,
  SET_LOADING_CHART_LINE,
  SET_LOADING_CHART_PIE,
} from '../constant';

const initialState = {
  dashboard: {
    asset: 0,
    hotel: 0,
    portfolio: 0,
    property: 0,
  },
  loadingDashboard: false,
  pieData: [],
  loadingPie: false,
  lineData: {
    data: [],
    label: [],
  },
  loadingLine: false,
};

const appReducer = function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DASHBOARD: {
      return {
        ...state,
        loadingDashboard: action.payload,
      };
    }
    case DASHBOARD_DATA: {
      return {
        ...state,
        dashboard: action.payload,
        loadingDashboard: false,
      };
    }
    case SET_LOADING_CHART_PIE: {
      return {
        ...state,
        loadingPie: action.payload,
      };
    }
    case GET_CHART_CHART_PIE: {
      return {
        ...state,
        pieData: action.payload,
        loadingPie: false,
      };
    }
    case SET_LOADING_CHART_LINE: {
      return {
        ...state,
        loadingLine: action.payload,
      };
    }
    case GET_CHART_CHART_LINE: {
      return {
        ...state,
        lineData: action.payload,
        loadingLine: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
