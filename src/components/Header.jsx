import { Button } from "react-bootstrap";
import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
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
                    </Container>
                </Navbar>
                <h1>Welcome to Le Thanh Dat Website</h1>
                <Button variant="primary">View more details</Button>
            </header>
        </>
    );
}
export default Header;