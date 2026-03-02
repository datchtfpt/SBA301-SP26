// Trang Login với form đăng nhập và validation
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect nếu đã đăng nhập
  React.useEffect(() => {
    if (isAuthenticated) {
      const userRole = JSON.parse(localStorage.getItem('user'))?.role;
      if (userRole === 'STAFF') {
        navigate('/staff/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    }
  }, [isAuthenticated, navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setLoginError('');
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Redirect dựa trên role
        if (result.user?.role === 'STAFF') {
          navigate('/staff/dashboard');
        } else {
          navigate('/customer/dashboard');
        }
      } else {
        setLoginError(result.error || 'Đăng nhập thất bại');
      }
    } catch (error) {
      setLoginError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={5} xl={4}>
          <Card className="card-custom shadow-lg">
            <Card.Header className="card-header-custom text-center">
              <h3 className="mb-0">Đăng nhập</h3>
              <p className="mb-0 mt-2">Hotel Booking System</p>
            </Card.Header>
            <Card.Body className="p-4">
              {loginError && (
                <Alert variant="danger" className="alert-danger-custom">
                  {loginError}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control-custom ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Nhập email của bạn"
                    disabled={loading}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">
                      {errors.email}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="form-label-custom">
                    Mật khẩu
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-control-custom ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Nhập mật khẩu"
                    disabled={loading}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      {errors.password}
                    </Form.Text>
                  )}
                </Form.Group>

                <Button
                  type="submit"
                  className="btn-primary-custom w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>
              </Form>

              <div className="text-center">
                <p className="mb-0">
                  Chưa có tài khoản?{' '}
                  <Link to="/register" className="text-decoration-none">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
