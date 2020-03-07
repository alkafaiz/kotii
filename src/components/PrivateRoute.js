import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";
import { getAuthState, getCurrentUser } from "../firebase";

export default function PrivateRoute({ component: Component, ...rest }) {
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const couple = JSON.parse(localStorage.getItem("coupleInfo"));
  const id = localStorage.getItem("id");

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth) {
          return (
            <Component
              {...props}
              cUser={{ ...isAuth }}
              cCouple={{ id, couple }}
            />
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}
