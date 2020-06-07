import { authHeader } from "../_helpers";
import fetchGraphQL from "../_helpers/fetchGraphQL";

export const userService = {
  login,
  logout,
  register,
};

function login({ email, password }) {
  return fetchGraphQL(`
            mutation {
                login(email:"${email}",password:"${password}"){
                token {
                  tokenType
                  accessToken
                }
                user {
                  id name role email
                }
            }
      }
    `).then((response) => {
    // login successful if there's a user in the response
    // store user details and basic auth credentials in local storage
    // to keep user logged in between page refreshes
    localStorage.setItem(
      "performance_app_user",
      JSON.stringify(response.data.login.user)
    );
    localStorage.setItem(
      "performance_app_token",
      JSON.stringify(response.data.login.token)
    );
    window.location.reload();
    return response.data.login.user;
  });
}

function register({ email, password }) {
  return fetchGraphQL(`
    mutation {
        register(userInput:{email:"${email}",password:"${password}"}){
        token {
          tokenType
          accessToken
        }
        user {
          id name role email
        }
      }
    }
`).then((response) => {
    // login successful if there's a user in the response
    localStorage.setItem(
      "performance_app_user",
      JSON.stringify(response.data.register.user)
    );
    localStorage.setItem(
      "performance_app_token",
      JSON.stringify(response.data.register.token)
    );
    window.location.reload();
    return response.data.register.user;
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("performance_app_token");
  localStorage.removeItem("performance_app_user");
  window.location.reload();
}
