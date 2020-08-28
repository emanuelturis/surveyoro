import React from "react";
import { Container } from "react-bootstrap";
import { css } from "@emotion/core";

const Layout: React.FC = ({ children }) => {
  return (
    <Container
      css={css`
        margin-top: 15px;
      `}
    >
      {children}
    </Container>
  );
};

export default Layout;
