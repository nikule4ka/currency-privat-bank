import React from "react";
import { Footer as AntdFooter } from "antd/lib/layout/layout";
import { Button, Row, Typography } from "antd";
import { format } from "date-fns";
import { LinkedinOutlined, GithubOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 100,
  paddingInline: 50,
  lineHeight: "64px"
};

const Footer = () => {
  return (
    <AntdFooter style={footerStyle}>
      <Row align="middle" justify="center">
        <Button
          type="link"
          href="https://www.linkedin.com/in/nika-yavtushenko-220452200/"
          target="_blank"
          icon={<LinkedinOutlined />}
        />

        <Button
          icon={<GithubOutlined />}
          type="link"
          href="https://github.com/nikule4ka"
          target="_blank"
        />
      </Row>
      <Row align="middle" justify="center">
        <Paragraph>
          Nika © {format(new Date(), "yyyy")} All rights reserved
        </Paragraph>
      </Row>
    </AntdFooter>
  );
};

export default Footer;
