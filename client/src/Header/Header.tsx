import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/core";

const Header: React.FC = () => {
  return (
    <div>
      <Navbar
        css={css`
          background-color: #183642;
        `}
        variant="dark"
      >
        <Navbar.Brand
          css={css`
            font-size: 35px;
          `}
          as={NavLink}
          to="/"
        >
          surveyoro
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default Header;
