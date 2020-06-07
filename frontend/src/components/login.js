import React from "react";
import { Form, Input, Button, Card, Row, Col } from "antd";
import { userService } from "../_services/user.service";
import { Link } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const Login = () => {
  const onFinish = (values) => {
    userService.login({ ...values }).then(
      (user) => {
        const { from } = this.props.location.state || {
          from: { pathname: "/" },
        };
        this.props.history.push(from);
      },
      (error) => console.log(error)
    );
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "80vh" }}
    >
      <Col>
        <Card title="LOGIN">
          <h3>EMPLOYEE PERFORMANCE APP</h3>
          <hr></hr>
          <Form {...layout} name="Login" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                LOGIN
              </Button>
            </Form.Item>
          </Form>
          <Link to="/register">Don't have ID? Register Here</Link>
        </Card>
      </Col>
    </Row>
  );
};
