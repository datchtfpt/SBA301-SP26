import { Button } from "react-bootstrap";
import { Container, Nav, Navbar } from "react-bootstrap";
import React from "react";
import SearchSort from "./SearchSort";

function Header({onSearchChange}) {

    return (
        <>

            <header>
                <Navbar bg="primary" data-bs-theme="dark">
                    <Container>
                        
                        <Navbar.Brand href="#home">HDPE STORE</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                        <SearchSort onSearchChange={onSearchChange} />
                    </Container>
                </Navbar>
                <h1>Welcome to Le Thanh Dat Orchid Website</h1>
            </header>
        </>
    );
}
export default Header;