import "../index.css";
import "../responsive.css";
import "../styles/utilities/_input.css";
import "../styles/utilities/_sweetalert.css";
import "../styles/utilities/_pagestyle.css";
import React from "react";
import { Provider } from "react-redux";
import { Router, Switch } from "react-router-dom";

import history from "../history.js";
import { MatxSuspense } from "../matx";
import GlobalCss from "../styles/GlobalCss";
import AppContext from "./appContext";
import Auth from "./auth/Auth";
import AuthGuard from "./auth/AuthGuard";
import MatxLayout from "./MatxLayout/MatxLayoutSFC";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import { Store } from "./redux/Store";
import routes from "./RootRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <MatxTheme>
          <GlobalCss>
            <Router history={history}>
              <Auth>
                <MatxSuspense>
                  <Switch>
                    {sessionRoutes.map((item, ind) => (
                      <AuthGuard
                        key={ind}
                        path={item.path}
                        component={item.component}
                        isPrivate={false}
                      />
                    ))}
                    <AuthGuard
                      path="/"
                      component={MatxLayout}
                      isPrivate={true}
                    />
                  </Switch>
                </MatxSuspense>
              </Auth>
            </Router>
          </GlobalCss>
        </MatxTheme>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
