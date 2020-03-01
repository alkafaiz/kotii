import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";
import { getAuthState, getCurrentUser } from "../firebase";

export default function PrivateRoute({ component: Component, ...rest }) {
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  console.log(isAuth);

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth) {
          console.log(isAuth);
          return <Component {...props} cUser={{ ...isAuth }} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}
