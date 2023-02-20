import React from "react";
import { Layout, Row, Typography } from "antd";
import Logo from "./logo.png";

const { Title } = Typography;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 90,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#3D248A"
};

const titleStyle: React.CSSProperties = {
  color: "white",
  margin: 0
};

const Header = () => {
  return (
    <Layout.Header style={headerStyle}>
      <Row justify="space-between" align="middle">
        <img src={Logo} alt="Logo" />

        <Title level={5} style={titleStyle}>
          Currency
        </Title>
      </Row>
    </Layout.Header>
  );
};

export default Header;
