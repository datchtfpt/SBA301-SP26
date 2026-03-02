// Trang quản lý khách hàng cho Staff
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { handleApiError, staffAPI } from '../../services/api';

const emptyForm = {
  customerId: null,
  fullName: '',
  telephone: '',
  emailAddress: '',
  birthday: '',
  password: '',
  status: 'ACTIVE',
};

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const sortedCustomers = useMemo(() => {
    return [...customers].sort((a, b) => (a.customerId || 0) - (b.customerId || 0));
  }, [customers]);

  const loadCustomers = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await staffAPI.getAllCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(handleApiError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const openCreate = () => {
    setIsEdit(false);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (c) => {
    setIsEdit(true);
    setForm({
      customerId: c.customerId,
      fullName: c.fullName || '',
      telephone: c.telephone || '',
      emailAddress: c.emailAddress || '',
      birthday: c.birthday || '',
      password: '',
      status: c.status || 'ACTIVE',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(emptyForm);
    setIsEdit(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        fullName: form.fullName,
        telephone: form.telephone,
        emailAddress: form.emailAddress,
        birthday: form.birthday || null,
        ...(form.password ? { password: form.password } : {}),
      };

      if (isEdit) {
        await staffAPI.updateCustomer(form.customerId, payload);
      } else {
        await staffAPI.createCustomer({ ...payload, password: form.password });
      }

      closeModal();
      await loadCustomers();
    } catch (e2) {
      setError(handleApiError(e2));
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Xóa khách hàng này?')) return;
    setError('');
    setLoading(true);
    try {
      await staffAPI.deleteCustomer(id);
      await loadCustomers();
    } catch (e) {
      setError(handleApiError(e));
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setError('');
    setLoading(true);
    try {
      await staffAPI.updateCustomerStatus(id, status);
      await loadCustomers();
    } catch (e) {
      setError(handleApiError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <Card className="card-custom">
        <Card.Header className="card-header-custom d-flex justify-content-between align-items-center">
          <div>Quản lý khách hàng</div>
          <div className="d-flex gap-2">
            <Button className="btn-secondary-custom" disabled={loading} onClick={loadCustomers}>
              Tải lại
            </Button>
            <Button className="btn-primary-custom" disabled={loading} onClick={openCreate}>
              Tạo mới
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {error && <Alert className="alert-danger-custom">{error}</Alert>}

          <div className="table-responsive">
            <Table hover className="table-custom">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>SĐT</th>
                  <th>Ngày sinh</th>
                  <th>Trạng thái</th>
                  <th style={{ width: 220 }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {sortedCustomers.map((c) => (
                  <tr key={c.customerId}>
                    <td>{c.customerId}</td>
                    <td>{c.fullName}</td>
                    <td>{c.emailAddress}</td>
                    <td>{c.telephone}</td>
                    <td>{c.birthday || ''}</td>
                    <td>
                      <Form.Select
                        size="sm"
                        value={c.status || 'ACTIVE'}
                        disabled={loading}
                        onChange={(e) => updateStatus(c.customerId, e.target.value)}
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                        <option value="DELETED">DELETED</option>
                      </Form.Select>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" disabled={loading} onClick={() => openEdit(c)}>
                          Sửa
                        </Button>
                        <Button variant="outline-danger" size="sm" disabled={loading} onClick={() => remove(c.customerId)}>
                          Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && sortedCustomers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-4">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Cập nhật khách hàng' : 'Tạo khách hàng'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Họ tên</Form.Label>
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
                  <Form.Label className="form-label-custom">Email</Form.Label>
                  <Form.Control className="form-control-custom" type="email" name="emailAddress" value={form.emailAddress} onChange={onChange} required disabled={isEdit} />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Mật khẩu</Form.Label>
                  <Form.Control
                    className="form-control-custom"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder={isEdit ? 'Để trống nếu không đổi' : ''}
                    required={!isEdit}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={closeModal} disabled={loading}>
                Hủy
              </Button>
              <Button className="btn-primary-custom" type="submit" disabled={loading}>
                Lưu
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomerManagement;
