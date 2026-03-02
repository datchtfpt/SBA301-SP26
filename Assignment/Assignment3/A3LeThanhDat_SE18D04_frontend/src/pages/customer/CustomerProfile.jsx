// trang quản lý hồ sơ khách hàng
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { customerAPI, handleApiError } from '../../services/api';

const CustomerProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    fullName: '',
    telephone: '',
    birthday: '',
    password: '',
  });

  const load = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const data = await customerAPI.getProfile();
      setProfile(data);
      setForm({
        fullName: data?.fullName || '',
        telephone: data?.telephone || '',
        birthday: data?.birthday || '',
        password: '',
      });
    } catch (e) {
      setError(handleApiError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const payload = {
        fullName: form.fullName,
        telephone: form.telephone,
        birthday: form.birthday || null,
        ...(form.password ? { password: form.password } : {}),
      };

      const updated = await customerAPI.updateProfile(payload);
      setProfile(updated);
      setForm((prev) => ({ ...prev, password: '' }));
      setSuccess('Cập nhật hồ sơ thành công');
    } catch (e2) {
      setError(handleApiError(e2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <Card className="card-custom">
        <Card.Header className="card-header-custom d-flex justify-content-between align-items-center">
          <div>Hồ sơ cá nhân</div>
          <Button className="btn-secondary-custom" disabled={loading} onClick={load}>
            Tải lại
          </Button>
        </Card.Header>
        <Card.Body>
          {error && <Alert className="alert-danger-custom">{error}</Alert>}
          {success && <Alert className="alert-success-custom">{success}</Alert>}

          {profile && (
            <Alert variant="info" className="alert-custom">
              Email đăng nhập: <strong>{profile.emailAddress}</strong>
            </Alert>
          )}

          <Form onSubmit={submit}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Họ và tên</Form.Label>
                  <Form.Control className="form-control-custom" name="fullName" value={form.fullName} onChange={onChange} required />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Số điện thoại</Form.Label>
                  <Form.Control className="form-control-custom" name="telephone" value={form.telephone} onChange={onChange} />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Ngày sinh</Form.Label>
                  <Form.Control className="form-control-custom" type="date" name="birthday" value={form.birthday || ''} onChange={onChange} />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Mật khẩu mới</Form.Label>
                  <Form.Control className="form-control-custom" type="password" name="password" value={form.password} onChange={onChange} placeholder="Để trống nếu không đổi" />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <Button className="btn-primary-custom" type="submit" disabled={loading}>
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomerProfile;
