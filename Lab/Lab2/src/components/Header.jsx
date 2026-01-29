import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import SearchSort from "./SearchSort.jsx";
import CarouselBanner from "./CarouselBanner.jsx";
import { bannersData } from "../data/banners.js";
import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext.jsx";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header({ onSearchChange }) {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <CarouselBanner banners={bannersData} />

      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/orchids" className="fw-bold">
            HDPE STORE
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/orchids">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>

            {state.isAuthenticated && (
              <Button
                variant="outline-light"
                onClick={() => {
                  dispatch({ type: "LOGOUT" });
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            )}

            <SearchSort onSearchChange={onSearchChange} />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h1 className="text-center my-5 fw-semibold">
        Welcome to Le Thanh Dat Orchid Website
      </h1>
    </>
  );
}

export default Header;
