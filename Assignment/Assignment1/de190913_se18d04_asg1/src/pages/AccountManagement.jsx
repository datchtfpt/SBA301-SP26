import { useState, useMemo } from 'react';
import { Form, Table, Button, Card } from 'react-bootstrap';
import { mockAccounts } from '../data/mockData';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';

const ROLE_LABELS = { 1: 'Admin', 2: 'Staff' };

export default function AccountManagement() {
  const [list, setList] = useState([...mockAccounts]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    AccountName: '',
    AccountEmail: '',
    AccountRole: 2,
  });

  const filteredList = useMemo(() => {
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (a) =>
        a.AccountName.toLowerCase().includes(q) ||
        (a.AccountEmail && a.AccountEmail.toLowerCase().includes(q))
    );
  }, [list, search]);

  const openCreate = () => {
    setEditingItem(null);
    setForm({ AccountName: '', AccountEmail: '', AccountRole: 2 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      AccountName: item.AccountName,
      AccountEmail: item.AccountEmail || '',
      AccountRole: item.AccountRole,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.AccountName.trim()) return;
    if (editingItem) {
      setList((prev) =>
        prev.map((a) =>
          a.AccountID === editingItem.AccountID ? { ...a, ...form } : a
        )
      );
    } else {
      const newId = Math.max(0, ...list.map((a) => a.AccountID)) + 1;
      setList((prev) => [...prev, { AccountID: newId, ...form }]);
    }
    setModalOpen(false);
  };

  const openDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) setList((prev) => prev.filter((a) => a.AccountID !== deleteId));
    setConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <div>
      <h1 className="mb-4">Account Management (Users)</h1>
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex gap-2 mb-3 flex-wrap">
            <Form.Control
              className="flex-grow-1"
              style={{ minWidth: '200px' }}
              placeholder="Tìm theo tên hoặc email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="primary" onClick={openCreate}>
              Thêm tài khoản
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên tài khoản</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((a) => (
                <tr key={a.AccountID}>
                  <td>{a.AccountID}</td>
                  <td>{a.AccountName}</td>
                  <td>{a.AccountEmail || '-'}</td>
                  <td>{ROLE_LABELS[a.AccountRole] ?? a.AccountRole}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => openEdit(a)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => openDelete(a.AccountID)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal
        title={editingItem ? 'Cập nhật tài khoản' : 'Thêm tài khoản'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Form.Group className="mb-3">
          <Form.Label>Tên tài khoản</Form.Label>
          <Form.Control
            type="text"
            value={form.AccountName}
            onChange={(e) => setForm((f) => ({ ...f, AccountName: e.target.value }))}
            placeholder="Username / Tên hiển thị"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={form.AccountEmail}
            onChange={(e) => setForm((f) => ({ ...f, AccountEmail: e.target.value }))}
            placeholder="email@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Vai trò</Form.Label>
          <Form.Select
            value={form.AccountRole}
            onChange={(e) => setForm((f) => ({ ...f, AccountRole: +e.target.value }))}
          >
            <option value={1}>Admin</option>
            <option value={2}>Staff</option>
          </Form.Select>
        </Form.Group>
        <p className="text-muted small">Mật khẩu sẽ do BE xử lý khi kết nối API.</p>
        <div className="d-flex justify-content-end gap-2 pt-2">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </div>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Xác nhận xóa"
        message="Bạn có chắc muốn xóa tài khoản này?"
        onConfirm={handleDelete}
        onCancel={() => { setConfirmOpen(false); setDeleteId(null); }}
      />
    </div>
  );
}
