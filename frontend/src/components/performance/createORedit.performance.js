import React from "react";
import { Modal, Button, Form, Input, Alert } from "antd";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export const CreateOrEditPerformance = (props) => {
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
        description="Here you can manipulate the data of Performance."
        type="success"
      />
      <br></br>
      <Form
        {...layout}
        name="Performance"
        onFinish={props.handleOk}
        ref={props.formRef}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {props.data.id === "new" ? "CREATE" : "UPDATE"} PERFORMANCE
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
