import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({
  component: Component,
  to: To,
  ...rest
}) {
  const toRedirect = To !== undefined ? To : "/main";

  return (
    <Route
      {...rest}
      render={props => {
        const login = localStorage.getItem("isLoggedIn");

        if (login === "false" || login === null) {
          return <Component {...props} />;
        } else {
          return <Redirect to={toRedirect} />;
        }
      }}
    />
  );
}
