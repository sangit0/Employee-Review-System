import React from "react";
import { Layout } from "antd";
const { Header, Footer } = Layout;

export const HeaderContent = (props) => {
  return <Header className="site-layout-background" style={{ padding: 0 }} />;
};
export const FooterContent = (props) => {
  return (
    <Footer style={{ textAlign: "center", position: "sticky" }}>
      Sangit © 2020 Employee Performance Paypal Challange
    </Footer>
  );
};
