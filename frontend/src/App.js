import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { HomePage } from "./components/home";
import { Employee } from "./components/employee/index.employee";
import { ReviewSubmit } from "./components/review-submit/index.review";
import { Performance } from "./components/performance/index.performance";

import { PrivateRoute } from "./_helpers/PrivateRoute";
import { PublicRoute } from "./_helpers/PublicRoute";
import { checkAuth } from "./_helpers/auth";
import { withRouter } from "react-router-dom";
import { UserNavBar } from "./components/layout/userNavBar";
import { NoPermission } from "./components/layout/403";

import { roles } from "./_helpers/role";

import {
  HeaderContent,
  FooterContent,
} from "./components/layout/header-footer";

import { Layout } from "antd";

const { Content } = Layout;
const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: checkAuth(),
    };
  }
  componentWillMount() {
    // console.log(this.state.isAuthenticated);

    if (this.state.isAuthenticated !== checkAuth()) {
      this.setState({ isAuthenticated: checkAuth() });
    }
  }
  render() {
    return (
      <div>
        <Layout>
          <UserNavBar
            location={this.props.location}
            history={this.props.history}
            isAuthenticated={this.state.isAuthenticated}
          />

          <Layout className="site-layout">
            <HeaderContent />

            <Content style={{ margin: "24px 16px 0" }}>
              <Switch>
                <PrivateRoute exact path="/" component={withRouter(HomePage)} />
                <PrivateRoute
                  exact
                  path="/employee"
                  role={roles.ADMIN}
                  component={withRouter(Employee)}
                />
                <PrivateRoute
                  exact
                  path="/performances"
                  role={roles.ADMIN}
                  component={withRouter(Performance)}
                />
                <PrivateRoute
                  exact
                  path="/review-submit"
                  role={roles.ALL_USER}
                  component={withRouter(ReviewSubmit)}
                />
                <PublicRoute exact path="/login" component={Login} />
                <Route exact path="/403" component={NoPermission} />
                <PublicRoute exact path="/register" component={Register} />
                <Route component={NoMatch} />
              </Switch>
              <FooterContent />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
