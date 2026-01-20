import React, { useState, useReducer, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { users } from "../data/users.js";
import { loginReducer } from "../stores/login/loginReducer.js";
import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext.jsx";


function Login() {

    // reducer quản lý auth
    const { state, dispatch } = useContext(AuthContext);

    // useState cho form input (đúng chuẩn)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});


    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const foundUser = users.find(
            u => u.username === username && u.password === password
        );

        if (foundUser) {
            setErrors({});
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: foundUser
            });
        } else {
            setErrors({
                username: "Invalid username or password",
                password: "Invalid username or password"
            });

            dispatch({
                type: "LOGIN_FAILURE",
                payload: "Invalid username or password"
            });
        }
    };


    const handleCancel = () => {
        setUsername("");
        setPassword("");
        dispatch({ type: "LOGOUT" });
    };

    // khi login thành công thì navigate
    useEffect(() => {
        if (state.isAuthenticated) {
            navigate("/orchids");
        }
    }, [state.isAuthenticated, navigate]);

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100 justify-content-center">
                <Col xs={11} sm={8} md={6} lg={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">
                                Login
                            </Card.Title>

                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        isInvalid={!!errors.username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            setErrors(prev => ({ ...prev, username: null }));
                                        }}
                                        placeholder="Enter username"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* PASSWORD */}
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        isInvalid={!!errors.password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setErrors(prev => ({ ...prev, password: null }));
                                        }}
                                        placeholder="Enter password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>



                                <div className="d-flex justify-content-between">
                                    <Button type="submit" variant="primary">
                                        Login
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={handleCancel}
                                    >
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
