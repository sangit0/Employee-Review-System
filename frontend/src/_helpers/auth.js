export function authHeader() {
  // return authorization header with basic auth credentials
  let performance_app_token = JSON.parse(
    localStorage.getItem("performance_app_token")
  );
  let performance_app_user = JSON.parse(
    localStorage.getItem("performance_app_user")
  );

  if (performance_app_user && performance_app_token) {
    return { Authorization: "Bearer " + performance_app_token.accessToken };
  } else {
    return {};
  }
}

export function getUser() {
  let performance_app_user = JSON.parse(
    localStorage.getItem("performance_app_user")
  );

  if (performance_app_user) {
    return performance_app_user;
  } else {
    return {};
  }
}

export function checkAuth() {
  // return authorization header with basic auth credentials
  let user = JSON.parse(localStorage.getItem("performance_app_user"));
  let token = JSON.parse(localStorage.getItem("performance_app_token"));

  if (user && token) {
    return true;
  } else {
    return false;
  }
}

export function checkRole(roles) {
  if (!roles || roles.length === 0) {
    return true;
  }

  // return authorization header with basic auth credentials
  let user = JSON.parse(localStorage.getItem("performance_app_user"));
  if (!user) {
    return false;
  }
  let index = roles.findIndex((e) => e === user.role);
  if (index !== -1) {
    return true;
  } else return false;
}
