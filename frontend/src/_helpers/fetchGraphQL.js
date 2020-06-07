import React from "react";
import { notification } from "antd";
import { authHeader } from "./auth";

const fetchGraphQL = (query, variableMode = false, variables = {}) => {
  let requestOptions = {};

  if (variableMode) {
    requestOptions = {
      method: "POST",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
        Accept: `application/json`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    };
  } else {
    requestOptions = {
      method: "POST",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
        Accept: `application/json`,
      },
      body: JSON.stringify({
        query,
      }),
    };
  }

  return fetch(`${process.env.REACT_APP_API_URL}`, requestOptions)
    .then((res) => res.json())
    .then((response) => {
      if (response.errors) {
        notification.error({
          message: "GRAPHQL ERROR",
          description: response.errors.map((e) => <p>{e.message}</p>),
        });
        return Promise.reject(response.errors);
      }
      return response;
    });
};

export default fetchGraphQL;
