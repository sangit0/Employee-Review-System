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

export const Register = () => {
  const onFinish = (values) => {
    userService.register({ ...values }).then(
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
        <Card title="REGISTER">
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
                REGISTER
              </Button>
            </Form.Item>
          </Form>
          <Link to="/login">Already registered? Login Here</Link>
        </Card>
      </Col>
    </Row>
  );
};
