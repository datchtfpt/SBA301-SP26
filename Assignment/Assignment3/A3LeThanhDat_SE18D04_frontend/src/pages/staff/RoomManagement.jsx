// Trang quản lý phòng cho Staff
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { handleApiError, staffAPI } from '../../services/api';

const emptyForm = {
  roomId: null,
  roomNumber: '',
  roomDetailDescription: '',
  roomMaxCapacity: '',
  roomPricePerDay: '',
  status: 'AVAILABLE',
  roomTypeId: '',
};

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showTypeModal, setShowTypeModal] = useState(false);
  const [typeForm, setTypeForm] = useState({ roomTypeName: '', typeDescription: '', typeNote: '' });

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const sortedRooms = useMemo(() => {
    return [...rooms].sort((a, b) => (a.roomId || 0) - (b.roomId || 0));
  }, [rooms]);

  const loadRooms = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await staffAPI.getAllRooms();
      setRooms(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(handleApiError(e));
    } finally {
      setLoading(false);
    }
  };

  const openCreateType = () => {
    setTypeForm({ roomTypeName: '', typeDescription: '', typeNote: '' });
    setShowTypeModal(true);
  };

  const createType = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await staffAPI.createRoomType(typeForm);
      setShowTypeModal(false);
      await loadRoomTypes();
    } catch (e2) {
      setError(handleApiError(e2));
    } finally {
      setLoading(false);
    }
  };

  const loadRoomTypes = async () => {
    try {
      const data = await staffAPI.getRoomTypes();
      setRoomTypes(Array.isArray(data) ? data : []);
    } catch {
      setRoomTypes([]);
    }
  };

  useEffect(() => {
    loadRooms();
    loadRoomTypes();
  }, []);

  const openCreate = () => {
    setIsEdit(false);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (r) => {
    setIsEdit(true);
    setForm({
      roomId: r.roomId,
      roomNumber: r.roomNumber ?? '',
      roomDetailDescription: r.roomDetailDescription || '',
      roomMaxCapacity: r.roomMaxCapacity ?? '',
      roomPricePerDay: r.roomPricePerDay ?? '',
      status: r.status || 'AVAILABLE',
      roomTypeId: r.roomType?.roomTypeId ?? '',
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
        roomNumber: form.roomNumber ? Number(form.roomNumber) : null,
        roomDetailDescription: form.roomDetailDescription,
        roomMaxCapacity: form.roomMaxCapacity ? Number(form.roomMaxCapacity) : null,
        roomPricePerDay: form.roomPricePerDay ? Number(form.roomPricePerDay) : null,
        roomStatus: form.status,
        roomTypeId: Number(form.roomTypeId),
      };

      if (isEdit) {
        await staffAPI.updateRoom(form.roomId, payload);
      } else {
        await staffAPI.createRoom(payload);
      }

      closeModal();
      await loadRooms();
    } catch (e2) {
      setError(handleApiError(e2));
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Xóa phòng này?')) return;
    setError('');
    setLoading(true);
    try {
      await staffAPI.deleteRoom(id);
      await loadRooms();
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
      await staffAPI.updateRoomStatus(id, status);
      await loadRooms();
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
          <div>Quản lý phòng</div>
          <div className="d-flex gap-2">
            <Button className="btn-secondary-custom" disabled={loading} onClick={loadRooms}>
              Tải lại
            </Button>
            <Button className="btn-primary-custom" disabled={loading} onClick={openCreate}>
              Tạo mới
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {error && <Alert className="alert-danger-custom">{error}</Alert>}

          {roomTypes.length === 0 && (
            <Alert variant="info" className="alert-custom d-flex justify-content-between align-items-center">
              <div>Chưa có RoomType. Bạn cần tạo RoomType trước khi tạo phòng.</div>
              <Button className="btn-primary-custom" disabled={loading} onClick={openCreateType}>
                Tạo RoomType
              </Button>
            </Alert>
          )}

          <div className="table-responsive">
            <Table hover className="table-custom">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Số phòng</th>
                  <th>Loại phòng</th>
                  <th>Sức chứa</th>
                  <th>Giá / ngày</th>
                  <th>Trạng thái</th>
                  <th style={{ width: 220 }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {sortedRooms.map((r) => (
                  <tr key={r.roomId}>
                    <td>{r.roomId}</td>
                    <td>{r.roomNumber}</td>
                    <td>{r.roomType?.roomTypeId ?? ''}</td>
                    <td>{r.roomMaxCapacity}</td>
                    <td>{r.roomPricePerDay}</td>
                    <td>
                      <Form.Select
                        size="sm"
                        value={r.status || 'AVAILABLE'}
                        disabled={loading}
                        onChange={(e) => updateStatus(r.roomId, e.target.value)}
                      >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="OCCUPIED">OCCUPIED</option>
                        <option value="MAINTENANCE">MAINTENANCE</option>
                      </Form.Select>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" disabled={loading} onClick={() => openEdit(r)}>
                          Sửa
                        </Button>
                        <Button variant="outline-danger" size="sm" disabled={loading} onClick={() => remove(r.roomId)}>
                          Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && sortedRooms.length === 0 && (
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
          <Modal.Title>{isEdit ? 'Cập nhật phòng' : 'Tạo phòng'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Số phòng</Form.Label>
                  <Form.Control className="form-control-custom" name="roomNumber" value={form.roomNumber} onChange={onChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">RoomTypeId</Form.Label>
                  <Form.Select className="form-control-custom" name="roomTypeId" value={form.roomTypeId} onChange={onChange} required>
                    <option value="">Chọn loại phòng</option>
                    {roomTypes.map((t) => (
                      <option key={t.roomTypeId} value={t.roomTypeId}>
                        {t.roomTypeName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Sức chứa</Form.Label>
                  <Form.Control className="form-control-custom" name="roomMaxCapacity" value={form.roomMaxCapacity} onChange={onChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Giá / ngày</Form.Label>
                  <Form.Control className="form-control-custom" name="roomPricePerDay" value={form.roomPricePerDay} onChange={onChange} required />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Mô tả</Form.Label>
                  <Form.Control as="textarea" rows={3} className="form-control-custom" name="roomDetailDescription" value={form.roomDetailDescription} onChange={onChange} />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Trạng thái</Form.Label>
                  <Form.Select className="form-control-custom" name="status" value={form.status} onChange={onChange}>
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="OCCUPIED">OCCUPIED</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                  </Form.Select>
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

      <Modal show={showTypeModal} onHide={() => setShowTypeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tạo RoomType</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createType}>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-custom">Tên loại phòng</Form.Label>
              <Form.Control
                className="form-control-custom"
                value={typeForm.roomTypeName}
                onChange={(e) => setTypeForm((p) => ({ ...p, roomTypeName: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-custom">Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="form-control-custom"
                value={typeForm.typeDescription}
                onChange={(e) => setTypeForm((p) => ({ ...p, typeDescription: e.target.value }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-custom">Ghi chú</Form.Label>
              <Form.Control
                className="form-control-custom"
                value={typeForm.typeNote}
                onChange={(e) => setTypeForm((p) => ({ ...p, typeNote: e.target.value }))}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowTypeModal(false)} disabled={loading}>
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

export default RoomManagement;
