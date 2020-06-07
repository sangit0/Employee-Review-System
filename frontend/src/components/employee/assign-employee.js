import React, { useState, useEffect } from "react";
import { Modal, Button, Alert, Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",

    dataIndex: "email",
  },
];
export const AssignEmployee = (props) => {
  const data = props.data;
  const [selectedRowsState, setSelectedRowsState] = useState(data);

  const rowSelection = {
    selectedRowKeys: [...selectedRowsState],
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowsState(selectedRowKeys);
    },
  };
  const submitData = () => {
    props.handleOk(selectedRowsState);
  };
  // const mounted = useRef();
  useEffect(() => {
    setSelectedRowsState(data);
  }, [data]);
  const hasSelected = selectedRowsState.length > 0;

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
      <Alert
        message="Information"
        description="You will assign employee here. And the assigned employee will be able to feedback to the employees."
        type="success"
      />
      <br></br>

      <Button onClick={submitData} block type="primary">
        Submit Assigned Employee
      </Button>
      <br></br>
      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Selected ${selectedRowsState.length} items` : ""}
      </span>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        rowKey="id"
        columns={columns}
        dataSource={props.employee}
      />
    </Modal>
  );
};
