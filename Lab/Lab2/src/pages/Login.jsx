import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { users } from "../data/users.js";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const foundUser = users.find(
            u => u.username === username && u.password === password
        );

        if (foundUser) {
            navigate("/orchids");
        } else {
            setError("Invalid username or password");
        }
    };

    const handleCancel = () => {
        setUsername("");
        setPassword("");
        setError("");
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100 justify-content-center">
                <Col xs={11} sm={8} md={6} lg={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">
                                Login
                            </Card.Title>

                            {error && (
                                <div className="text-danger text-center mb-3">
                                    {error}
                                </div>
                            )}

                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter username"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between">
                                    <Button type="submit" variant="primary">
                                        Login
                                    </Button>
                                    <Button variant="outline-secondary" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
