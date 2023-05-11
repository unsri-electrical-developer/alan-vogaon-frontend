import { combineReducers } from "redux";

import adminReducer from "./AdminReducer";
import appReducer from "./AppReducer";
import globalReducer from "./GlobalReducer";
import NavigationReducer from "./NavigationReducer";
import LayoutReducer from "./LayoutReducer";
import LoginReducer from "./LoginReducer";
import sertifikatReducer from "./SertifikatReducer";
import UserReducer from "./UserReducer";
import SlidersReducer from "./SlidersReducer";
import PaymentReducer from "./PaymentReducer";
import {
  FaqReducer,
  GeneralInfoReducer,
  PrivacyPolicyReducer,
  SnkReducer,
} from "./Settings";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  navigations: NavigationReducer,
  app: appReducer,
  admin: adminReducer,
  sertifikat: sertifikatReducer,
  global: globalReducer,
  sliders: SlidersReducer,
  payment: PaymentReducer,
  generalInfo: GeneralInfoReducer,
  transaction: TransactionReducer,
  dashboard: DashboardReducer,
  faq: FaqReducer,
  snk: SnkReducer,
  privacyPolicy: PrivacyPolicyReducer,
});

export default RootReducer;
