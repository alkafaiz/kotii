import React, { useEffect, useState } from "react";
import "./App.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as ROUTES from "./routes";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from "@material-ui/core/styles";
import style from "./assets/jss/theme";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRoute from "./components/PrivateRoute";
import { getAuthState } from "./firebase";
const history = createBrowserHistory();

function App() {
  const appTheme = responsiveFontSizes(createMuiTheme(style));
  const [isAuth, setIsAuth] = useState(false);

  const handleAuth = res => {
    if (res === null || res === undefined) {
      setIsAuth(false);
    }
  };
  getAuthState(handleAuth);

  return (
    <ThemeProvider theme={appTheme}>
      <Router history={history}>
        <Switch>
          <Route path={ROUTES.LOGIN.path} component={ROUTES.LOGIN.component} />
          <PrivateRoute
            path={ROUTES.MAIN.path}
            component={ROUTES.MAIN.component}
          />
          <PrivateRoute
            path={ROUTES.INVITE.path}
            component={ROUTES.INVITE.component}
          />
          <Route
            path={ROUTES.SIGNUP.path}
            component={ROUTES.SIGNUP.component}
          />
          <Route
            path={ROUTES.SECRET_SIGNUP.path}
            component={ROUTES.SECRET_SIGNUP.component}
          />
          <Redirect from={ROUTES.LANDING.path} to={ROUTES.LOGIN.path} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
