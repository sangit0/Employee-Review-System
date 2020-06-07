import React from "react";
import { Card } from "antd";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="site-layout-background ">
        <Card>
          <h1>Welcome to employee performance review app </h1>
          <p>
            You're logged in! You can submit your review to another assigned
            employee with this app.
          </p>
        </Card>
      </div>
    );
  }
}

export { HomePage };
