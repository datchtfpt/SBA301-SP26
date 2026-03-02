// Trang tạo đặt phòng mới cho khách hàng
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { customerAPI, handleApiError } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CreateBooking = () => {
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState([]);
  const [bookingDate, setBookingDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const total = useMemo(() => {
    const map = new Map(rooms.map((r) => [r.roomId, r]));
    return selected.reduce((sum, id) => sum + (map.get(id)?.roomPricePerDay || 0), 0);
  }, [rooms, selected]);

  const loadRooms = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await customerAPI.getAvailableRoomsPublic();
      setRooms(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(handleApiError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const toggle = (roomId) => {
    setSelected((prev) => {
      if (prev.includes(roomId)) return prev.filter((x) => x !== roomId);
      return [...prev, roomId];
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (selected.length === 0) {
      setError('Vui lòng chọn ít nhất 1 phòng');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        bookingDate,
        roomIds: selected,
      };

      await customerAPI.createBooking(payload);
      setSuccess('Tạo đặt phòng thành công');
      setSelected([]);
      setTimeout(() => navigate('/customer/bookings'), 800);
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
          <div>Đặt phòng mới</div>
          <Button className="btn-secondary-custom" disabled={loading} onClick={loadRooms}>
            Tải lại
          </Button>
        </Card.Header>
        <Card.Body>
          {error && <Alert className="alert-danger-custom">{error}</Alert>}
          {success && <Alert className="alert-success-custom">{success}</Alert>}

          <Form onSubmit={submit}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="form-label-custom">Ngày đặt</Form.Label>
                  <Form.Control className="form-control-custom" type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={8} className="d-flex align-items-end justify-content-end">
                <div>
                  <div className="text-muted">Tổng tiền dự kiến</div>
                  <div className="fw-bold" style={{ fontSize: 18 }}>{total}</div>
                </div>
              </Col>
            </Row>

            <div className="table-responsive">
              <Table hover className="table-custom">
                <thead>
                  <tr>
                    <th style={{ width: 70 }}>Chọn</th>
                    <th>ID</th>
                    <th>Số phòng</th>
                    <th>Sức chứa</th>
                    <th>Giá / ngày</th>
                    <th>Loại phòng</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((r) => (
                    <tr key={r.roomId}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={selected.includes(r.roomId)}
                          disabled={loading}
                          onChange={() => toggle(r.roomId)}
                        />
                      </td>
                      <td>{r.roomId}</td>
                      <td>{r.roomNumber}</td>
                      <td>{r.roomMaxCapacity}</td>
                      <td>{r.roomPricePerDay}</td>
                      <td>{r.roomType?.roomTypeId ?? ''}</td>
                      <td>{r.status}</td>
                    </tr>
                  ))}
                  {!loading && rooms.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center text-muted py-4">
                        Không có phòng trống
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-end">
              <Button className="btn-primary-custom" type="submit" disabled={loading}>
                Tạo đặt phòng
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateBooking;
