import React from "react";
import { userService } from "../../_services/user.service";
import { Layout, Menu, Avatar, Popover, Divider } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  ExperimentOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { roles } from "../../_helpers/role";
import { checkRole } from "../../_helpers/auth";
import { Tag } from "antd";
import { getUser } from "../../_helpers/auth";

const { Sider } = Layout;

const routeLink = [
  {
    url: "/",
    name: "Home",
    icon: <HomeOutlined />,
  },
  {
    url: "/employee",
    name: "Employee",
    role: roles.ADMIN,
    icon: <UserOutlined />,
  },
  {
    url: "/performances",
    name: "Performances",
    role: roles.ADMIN,
    icon: <ExperimentOutlined />,
  },
  {
    url: "/review-submit",
    name: "Submit Review",
    icon: <FormOutlined />,
  },
];
const userMenuOptions = (props) => (
  <Menu>
    <Menu.Item onClick={() => userService.logout()}>Logout</Menu.Item>
  </Menu>
);
export const UserNavBar = (props) => {
  if (props.isAuthenticated) {
    return (
      <Sider className="main-container">
        <hr></hr>
        <span className="logo">PERFORMANCE REVIEW</span>
        <hr></hr>

        <div style={{ textAlign: "center", marginTop: "10%" }}>
          <Popover
            placement="bottom"
            style={{ cursor: "pointer" }}
            content={userMenuOptions(props)}
            trigger="hover"
          >
            <span>
              <Avatar
                icon={
                  <UserOutlined
                    style={{ textAlign: "center", cursor: "pointer" }}
                  />
                }
              />
            </span>
          </Popover>
          <br></br>
          <br></br>
          <Tag color="green">{getUser().email}</Tag>
          <Divider></Divider>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          {routeLink.map((element) => {
            return checkRole(element.role) ? (
              <Menu.Item key={element.name} icon={element.icon}>
                <Link to={element.url}>{element.name}</Link>
              </Menu.Item>
            ) : (
              ""
            );
          })}
        </Menu>
      </Sider>
    );
  } else {
    return <GuestNavBar location={props.location} />;
  }
};

export const GuestNavBar = (props) => {
  return <span></span>;
};
