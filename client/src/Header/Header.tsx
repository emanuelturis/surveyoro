import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Surveyrus</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/" exact>
            Dashboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/surveys" exact>
            Surveys
          </Nav.Link>
          <Nav.Link as={NavLink} to="/settings" exact>
            Settings
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
