import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand as={NavLink} to="/">
          Surveyrus
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default Header;
