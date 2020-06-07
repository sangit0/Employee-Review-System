import React from "react";
import { Card, Button, Space, Table, notification } from "antd";
import { CreateOrEditEmployee } from "./createORedit.employee";
import { AssignEmployee } from "./assign-employee";
import { employeeService } from "../../_services/employee.service";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

class Employee extends React.Component {
  formRef = React.createRef();
  fields = {
    id: "new",
    name: "",
    email: "",
  };
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataAssignModelEmployee: [],
      assignEmployeeId: -1,
      dataAssignModel: [],
      loading: false,
      visible: false,
      visible_assign_modal: false,
      dataModel: {
        ...this.fields,
      },
      confirmLoading: false,
    };
  }

  columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => this.editMode(record)}
          />
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => this.deleteRecord(record)}
          />
          <Button
            icon={<UserAddOutlined />}
            onClick={() => this.getAssignEmployee(record)}
          >
            Assign Employee
          </Button>
        </Space>
      ),
    },
  ];
  componentDidMount() {
    this.loadData();
  }
  handleOk = (values) => {
    // console.log(values);

    this.setState({
      confirmLoading: true,
    });
    if (this.state.dataModel.id === "new") {
      employeeService.create(values).then((response) => {
        this.setState({
          confirmLoading: true,
          visible: false,
        });
        this.loadData();
        notification.success({
          message: "Success",
          description: "Employee Created!",
        });
      });
    } else {
      employeeService
        .update({ id: this.state.dataModel.id, ...values })
        .then((response) => {
          this.setState({
            confirmLoading: true,
            visible: false,
            dataModel: {
              ...this.fields,
            },
          });
          this.loadData();
          notification.success({
            message: "Success",
            description: "Employee Updated!",
          });
        });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  showModal = () => {
    this.setState({
      dataModel: {
        ...this.fields,
      },
      visible: true,
    });
  };
  handleOkAssignModal = (values) => {
    // console.log(values);
    if (this.state.assignEmployeeId === -1) {
      return;
    }
    const dataToSubmit = values.map((item) => {
      return { employee_id: item };
    });

    employeeService
      .assignEmployee(this.state.assignEmployeeId, dataToSubmit)
      .then((response) => {
        notification.success({
          message: "Success",
          description: "Employee Assigned Successful!",
        });
        this.handleCancelAssignModal();
      });
  };
  handleCancelAssignModal = () => {
    this.setState({
      visible_assign_modal: false,
      assignEmployeeId: -1,
    });
  };

  getAssignEmployee = (record) => {
    this.setState({
      loading: true,
    });
    employeeService.getAllAssignedEmployee(record.id).then((response) => {
      let data = [];

      if (response.data["UserAssignedEmployee"][0]) {
        data = response.data["UserAssignedEmployee"][0][
          "assigned_employee"
        ].map((e) => {
          return e.employee_id.id;
        });
      }
      // console.log(data);

      const employee = this.state.data.filter((e) => {
        if (e.id !== record.id) return true;
        return false;
      });

      this.setState({
        dataAssignModel: data,
        assignEmployeeId: record.id,
        dataAssignModelEmployee: employee,
        visible_assign_modal: true,
        loading: false,
      });
    });
  };

  editMode = (record) => {
    // this.showModal();
    this.setState(
      {
        dataModel: record,
        visible: true,
      },
      () => {
        if (this.formRef.current) {
          this.formRef.current.setFieldsValue({
            ...record,
          });
        } else {
          setTimeout(() => {
            this.formRef.current &&
              this.formRef.current.setFieldsValue({
                ...record,
              });
          }, 500);
        }
      }
    );
  };
  deleteRecord = (record) => {
    employeeService.remove(record).then((response) => {
      this.loadData();
    });
  };
  loadData = () => {
    this.setState({
      loading: true,
    });
    employeeService.getAll().then((response) => {
      this.setState({
        data: response.data["Employees"],
        loading: false,
      });
    });
  };

  render() {
    return (
      <Card style={{ width: "100%" }} className="site-layout-background ">
        <Button type="primary" onClick={this.showModal}>
          Create Employee
        </Button>
        <hr></hr>

        <CreateOrEditEmployee
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          visible={this.state.visible}
          formRef={this.formRef}
          data={this.state.dataModel}
          confirmLoading={this.state.confirmLoading}
        />
        <AssignEmployee
          handleCancel={this.handleCancelAssignModal}
          handleOk={this.handleOkAssignModal}
          visible={this.state.visible_assign_modal}
          data={this.state.dataAssignModel}
          employee={this.state.dataAssignModelEmployee}
        />

        <Table
          rowKey="id"
          columns={this.columns}
          dataSource={this.state.data}
          loading={this.state.loading}
        />
      </Card>
    );
  }
}

export { Employee };
