import React from "react";
import { Card, Button, Space, Table, notification } from "antd";
import { employeeService } from "../../_services/employee.service";
import { performanceService } from "../../_services/performance.service";
import { UserAddOutlined } from "@ant-design/icons";
import { SubmitReview } from "../../components/review-submit/submit-review";
import { getUser } from "../../_helpers";
import { reviewService } from "../../_services/review.service";

class ReviewSubmit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      visible: false,
      dataLoading: false,
      reviewSubmitLoading: false,
      performances: [],
      mappedPerformance: [],

      reviewing_id: -1,
      confirmLoading: false,
    };
  }

  columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <p>{record.employee_id.name}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<UserAddOutlined />}
            loading={this.state.dataLoading}
            onClick={() => this.getPerformanceAndReview(record)}
          >
            Submit Review
          </Button>
        </Space>
      ),
    },
  ];

  handleOk = (values) => {
    let user = getUser();

    if (user && this.state.reviewing_id !== -1) {
      this.setState({
        reviewSubmitLoading: true,
      });
      let performance_reviews = values.map((e) => {
        return {
          performance_type: e.name,
          performance: e.id,
          feedback: e.review ? e.review : "",
        };
      });
      reviewService
        .addEmployeeReview({
          feedback_from_employee_id: user.id,
          feedback_to_employee_id: this.state.reviewing_id.id,
          performance_reviews: performance_reviews,
        })
        .then((response) => {
          this.setState({
            reviewSubmitLoading: false,
          });
          notification.success({
            message: "Success",
            description: "Review Submitted!",
          });
        });
    }
  };
  getPerformanceAndReview = (values) => {
    // console.log(values);
    this.setState({
      dataLoading: true,
    });
    let user = getUser();
    if (user) {
      reviewService
        .getEmployeeReviewSubmittedByParticularUser(
          user.id,
          values.employee_id.id
        )
        .then((dataReview) => {
          // console.log(dataReview);
          let previousReview = dataReview["data"]["EmployeeReview"]
            ? dataReview["data"]["EmployeeReview"]["performance_reviews"]
            : [];
          let mappedPerformance = this.state.performances.map((element) => {
            let index = previousReview.findIndex(
              (e) => e.performance === element.id
            );

            if (index !== -1) {
              return {
                ...element,
                review: previousReview[index].feedback,
              };
            } else return element;
          });

          this.setState({
            dataLoading: false,
            reviewing_id: values.employee_id,
            mappedPerformance: mappedPerformance,
          });
          this.showModal();
        });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      reviewing_id: -1,
    });
  };

  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    this.setState({
      loading: true,
    });
    let user = getUser();
    if (user) {
      employeeService
        .getAllAssignedEmployeeFeedbackFilter(user.id, false)
        .then((response) => {
          let data = [];
          if (response.data["UserAssignedEmployeeOnlyFeedBack"][0]) {
            data =
              response.data["UserAssignedEmployeeOnlyFeedBack"][0][
                "assigned_employee"
              ];
          }

          this.setState({
            data: data,
            loading: false,
          });
          performanceService.getAll().then((response) => {
            this.setState({
              performances: response.data["Performances"],
            });
          });
        });
    }
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  render() {
    return (
      <Card style={{ width: "100%" }} className="site-layout-background ">
        <Card>
          <code>
            {this.state.data.length
              ? ""
              : "No employee assigned yet to review."}
          </code>
        </Card>
        <SubmitReview
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          reviewEmp={this.state.reviewing_id}
          reviewSubmitLoading={this.state.reviewSubmitLoading}
          visible={this.state.visible}
          data={this.state.mappedPerformance}
        />
        <Table
          rowKey="_id"
          key={"reviewTable"}
          columns={this.columns}
          dataSource={this.state.data}
          loading={this.state.loading}
        />
      </Card>
    );
  }
}

export { ReviewSubmit };
