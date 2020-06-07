import React from "react";
import { Modal, Button, Form, Input, Alert } from "antd";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export const CreateOrEditEmployee = (props) => {
  return (
    <Modal
      title={props.title}
      width="500px"
      visible={props.visible}
      confirmLoading={props.confirmLoading}
      onCancel={props.handleCancel}
      footer={[
        <Button key="back" onClick={props.handleCancel}>
          Return
        </Button>,
      ]}
    >
      <Alert
        message="Information"
        description="Employee will be able to login in their particular panel using the password."
        type="success"
      />
      <br></br>
      <Form
        {...layout}
        name="Employee"
        onFinish={props.handleOk}
        ref={props.formRef}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        {props.data.id === "new" ? (
          <Form.Item
            label="Password(123456)"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        ) : (
          ""
        )}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {props.data.id === "new" ? "CREATE" : "UPDATE"} EMPLOYEE
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
