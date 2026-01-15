import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "123456") {
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
        <Card style={{ width: "400px", margin: "120px auto" }}>
            <Card.Body>
                <Card.Title className="text-center mb-4">
                    Login
                </Card.Title>

                {error && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
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
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Login;
