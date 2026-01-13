import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import SearchSort from "./SearchSort";

function Header({ onSearchChange }) {
  return (
    <header>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            HDPE STORE
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          <SearchSort onSearchChange={onSearchChange} />
        </Container>
      </Navbar>

      <h1>Welcome to Le Thanh Dat Orchid Website</h1>
    </header>
  );
}

export default Header;
