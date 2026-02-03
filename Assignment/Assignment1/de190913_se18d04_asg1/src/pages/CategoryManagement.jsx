import { useState, useMemo } from 'react';
import { Form, Table, Button, Card } from 'react-bootstrap';
import { mockCategories } from '../data/mockData';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';

export default function CategoryManagement() {
  const [list, setList] = useState([...mockCategories]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    CategoryName: '',
    CategoryDesciption: '',
    IsActive: 1,
  });

  const filteredList = useMemo(() => {
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (c) =>
        c.CategoryName.toLowerCase().includes(q) ||
        (c.CategoryDesciption && c.CategoryDesciption.toLowerCase().includes(q))
    );
  }, [list, search]);

  const openCreate = () => {
    setEditingItem(null);
    setForm({ CategoryName: '', CategoryDesciption: '', IsActive: 1 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      CategoryName: item.CategoryName,
      CategoryDesciption: item.CategoryDesciption || '',
      IsActive: item.IsActive,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.CategoryName.trim()) return;
    if (editingItem) {
      setList((prev) =>
        prev.map((c) =>
          c.CategoryID === editingItem.CategoryID
            ? { ...c, ...form }
            : c
        )
      );
    } else {
      const newId = Math.max(0, ...list.map((c) => c.CategoryID)) + 1;
      setList((prev) => [...prev, { CategoryID: newId, ParentCategoryID: null, ...form }]);
    }
    setModalOpen(false);
  };

  const openDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) setList((prev) => prev.filter((c) => c.CategoryID !== deleteId));
    setConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <div>
      <h1 className="mb-4">Category Management</h1>
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex gap-2 mb-3 flex-wrap">
            <Form.Control
              className="flex-grow-1"
              style={{ minWidth: '200px' }}
              placeholder="Tìm theo tên hoặc mô tả..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="primary" onClick={openCreate}>
              Thêm danh mục
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((c) => (
                <tr key={c.CategoryID}>
                  <td>{c.CategoryID}</td>
                  <td>{c.CategoryName}</td>
                  <td>{c.CategoryDesciption || '-'}</td>
                  <td>{c.IsActive === 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => openEdit(c)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => openDelete(c.CategoryID)}
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
        title={editingItem ? 'Cập nhật danh mục' : 'Thêm danh mục'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Form.Group className="mb-3">
          <Form.Label>Tên danh mục</Form.Label>
          <Form.Control
            type="text"
            value={form.CategoryName}
            onChange={(e) => setForm((f) => ({ ...f, CategoryName: e.target.value }))}
            placeholder="Nhập tên danh mục"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            type="text"
            value={form.CategoryDesciption}
            onChange={(e) => setForm((f) => ({ ...f, CategoryDesciption: e.target.value }))}
            placeholder="Mô tả (tùy chọn)"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select
            value={form.IsActive}
            onChange={(e) => setForm((f) => ({ ...f, IsActive: +e.target.value }))}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </Form.Select>
        </Form.Group>
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
        message="Bạn có chắc muốn xóa danh mục này?"
        onConfirm={handleDelete}
        onCancel={() => { setConfirmOpen(false); setDeleteId(null); }}
      />
    </div>
  );
}
