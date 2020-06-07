import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Alert,
  Card,
  Table,
  Input,
  Spin,
  InputNumber,
  Popconfirm,
  Form,
} from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? <InputNumber /> : <Input key={dataIndex} />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
export const SubmitReview = (props) => {
  const [form] = Form.useForm();
  const propsData = props.data;
  const [data, setData] = useState(propsData);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    setData(propsData);
  }, [propsData]);

  const isEditing = (record) => record.id === editingKey;

  const columns = [
    {
      title: "Performance",
      dataIndex: "name",
    },
    {
      title: "Review",
      width: "25%",
      dataIndex: "review",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];
  const edit = (record) => {
    form.setFieldsValue({
      review: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);

        props.handleOk(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Modal
      title={props.title}
      width="50%"
      visible={props.visible}
      onCancel={props.handleCancel}
      footer={[
        <Button key="back" onClick={props.handleCancel}>
          Return
        </Button>,
      ]}
    >
      {props.reviewEmp !== -1 ? (
        <span>
          <Alert
            message="Information"
            description="Submit your review to the particular employee."
            type="info"
          />
          <br></br>
          <code>
            <h3>Reviewing for {props.reviewEmp.name}</h3>
          </code>
          {props.reviewSubmitLoading ? <Spin /> : ""}
          <Form form={form} component={false}>
            <Table
              rowKey="id"
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              columns={mergedColumns}
              rowClassName="editable-row"
              dataSource={data}
            />
          </Form>
        </span>
      ) : (
        <Card>
          <Alert
            message="Information"
            description="No employee selected for review "
            type="errorß"
          />
        </Card>
      )}
    </Modal>
  );
};
