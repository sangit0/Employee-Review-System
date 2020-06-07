import React from "react";
import { Card, Button, Space, Table, notification } from "antd";
import { CreateOrEditPerformance } from "./createORedit.performance";
import { performanceService } from "../../_services/performance.service";
import { EditOutlined } from "@ant-design/icons";

class Performance extends React.Component {
  formRef = React.createRef();
  fields = {
    id: "new",
    name: "",
  };
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      visible: false,
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => this.editMode(record)}
          />
          {/* <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => this.deleteRecord(record)}
          /> */}
        </Space>
      ),
    },
  ];

  handleOk = (values) => {
    // console.log(values);

    this.setState({
      confirmLoading: true,
      loading: true,
    });
    if (this.state.dataModel.id === "new") {
      performanceService.create(values).then((response) => {
        this.setState({
          confirmLoading: true,
          visible: false,
        });
        this.loadData();
        notification.success({
          message: "Success",
          description: "Performance Created!",
        });
      });
    } else {
      performanceService
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
            description: "Performance Updated!",
          });
        });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    this.loadData();
  }

  showModal = () => {
    this.setState({
      dataModel: {
        ...this.fields,
      },
      visible: true,
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
    this.setState({
      loading: true,
    });
    performanceService.remove(record).then((response) => {
      this.loadData();
    });
  };
  loadData = () => {
    this.setState({
      loading: true,
    });
    performanceService.getAll().then((response) => {
      this.setState({
        data: response.data["Performances"],
        loading: false,
      });
    });
  };

  render() {
    return (
      <Card style={{ width: "100%" }} className="site-layout-background ">
        <Button
          type="primary"
          onClick={this.showModal}
          loading={this.state.loading}
        >
          Create Performance Reviews
        </Button>
        <hr></hr>

        <CreateOrEditPerformance
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          visible={this.state.visible}
          formRef={this.formRef}
          data={this.state.dataModel}
          confirmLoading={this.state.confirmLoading}
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

export { Performance };
