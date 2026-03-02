// Trang Register với form đăng ký cho khách hàng
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    telephone: '',
    emailAddress: '',
    birthday: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect nếu đã đăng nhập
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/customer/dashboard');
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
    
    if (!formData.fullName) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
    }
    
    if (!formData.telephone) {
      newErrors.telephone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.telephone)) {
      newErrors.telephone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.emailAddress) {
      newErrors.emailAddress = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Email không hợp lệ';
    }
    
    if (!formData.birthday) {
      newErrors.birthday = 'Vui lòng chọn ngày sinh';
    } else {
      const birthDate = new Date(formData.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18 || age > 100) {
        newErrors.birthday = 'Bạn phải từ 18 đến 100 tuổi';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
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
    setRegisterError('');
    
    try {
      const result = await register({
        fullName: formData.fullName,
        telephone: formData.telephone,
        emailAddress: formData.emailAddress,
        birthday: formData.birthday,
        password: formData.password
      });
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setRegisterError(result.error || 'Đăng ký thất bại');
      }
    } catch (error) {
      setRegisterError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="card-custom shadow-lg">
              <Card.Body className="text-center p-5">
                <div className="text-success mb-3">
                  <h1>✅</h1>
                </div>
                <h3 className="text-success mb-3">Đăng ký thành công!</h3>
                <p className="text-muted">
                  Tài khoản của bạn đã được tạo thành công.<br />
                  Sẽ chuyển đến trang đăng nhập trong giây lát...
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={7} xl={6}>
          <Card className="card-custom shadow-lg">
            <Card.Header className="card-header-custom text-center">
              <h3 className="mb-0">Đăng ký tài khoản</h3>
              <p className="mb-0 mt-2">Tạo tài khoản khách hàng mới</p>
            </Card.Header>
            <Card.Body className="p-4">
              {registerError && (
                <Alert variant="danger" className="alert-danger-custom">
                  {registerError}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">
                    Họ và tên
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-control-custom ${errors.fullName ? 'is-invalid' : ''}`}
                    placeholder="Nhập họ và tên đầy đủ"
                    disabled={loading}
                  />
                  {errors.fullName && (
                    <Form.Text className="text-danger">
                      {errors.fullName}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">
                    Số điện thoại
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className={`form-control-custom ${errors.telephone ? 'is-invalid' : ''}`}
                    placeholder="Nhập số điện thoại"
                    disabled={loading}
                  />
                  {errors.telephone && (
                    <Form.Text className="text-danger">
                      {errors.telephone}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className={`form-control-custom ${errors.emailAddress ? 'is-invalid' : ''}`}
                    placeholder="Nhập email"
                    disabled={loading}
                  />
                  {errors.emailAddress && (
                    <Form.Text className="text-danger">
                      {errors.emailAddress}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">
                    Ngày sinh
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className={`form-control-custom ${errors.birthday ? 'is-invalid' : ''}`}
                    disabled={loading}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.birthday && (
                    <Form.Text className="text-danger">
                      {errors.birthday}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">
                    Mật khẩu
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-control-custom ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                    disabled={loading}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      {errors.password}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="form-label-custom">
                    Xác nhận mật khẩu
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-control-custom ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Nhập lại mật khẩu"
                    disabled={loading}
                  />
                  {errors.confirmPassword && (
                    <Form.Text className="text-danger">
                      {errors.confirmPassword}
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
                      Đang đăng ký...
                    </>
                  ) : (
                    'Đăng ký tài khoản'
                  )}
                </Button>
              </Form>

              <div className="text-center">
                <p className="mb-0">
                  Đã có tài khoản?{' '}
                  <Link to="/login" className="text-decoration-none">
                    Đăng nhập ngay
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

export default Register;
