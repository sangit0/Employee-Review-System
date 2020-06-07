import React from "react";
import { Route, Redirect } from "react-router-dom";
import { checkAuth, checkRole } from "../_helpers/auth";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? (
          checkRole(rest.role) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/403", state: { from: props.location } }}
            />
          )
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
