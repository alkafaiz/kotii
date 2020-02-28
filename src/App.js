import React from "react";
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

const history = createBrowserHistory();

function App() {
  const appTheme = responsiveFontSizes(createMuiTheme(style));

  return (
    <ThemeProvider theme={appTheme}>
      <Router history={history}>
        <Switch>
          <Route path={ROUTES.LOGIN.path} component={ROUTES.LOGIN.component} />
          <Route path={ROUTES.MAIN.path} component={ROUTES.MAIN.component} />
          <Route
            path={ROUTES.SIGNUP.path}
            component={ROUTES.SIGNUP.component}
          />
          <PrivateRoute
            path={ROUTES.LANDING.path}
            component={() => <h3>Home</h3>}
          />
          {/* <Redirect from={ROUTES.LANDING.path} to={ROUTES.LOGIN.path} /> */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
