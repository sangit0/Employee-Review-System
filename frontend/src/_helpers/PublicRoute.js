import React from "react";
import { Route, Redirect } from "react-router-dom";
import { checkAuth } from "../_helpers/auth";

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);
