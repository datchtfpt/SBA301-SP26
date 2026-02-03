import { useState, useMemo } from 'react';
import { Form, Table, Button, Card } from 'react-bootstrap';
import { mockNews, mockCategories, mockTags } from '../data/mockData';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';

export default function NewsManagement() {
  const [list, setList] = useState([...mockNews]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    NewsTitle: '',
    Headline: '',
    NewsContent: '',
    NewsSource: '',
    CategoryID: '',
    NewsStatus: 1,
    tagIds: [],
  });

  const filteredList = useMemo(() => {
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (n) =>
        n.NewsTitle.toLowerCase().includes(q) ||
        (n.Headline && n.Headline.toLowerCase().includes(q)) ||
        (n.NewsContent && n.NewsContent.toLowerCase().includes(q))
    );
  }, [list, search]);

  const getCategoryName = (id) => mockCategories.find((c) => c.CategoryID === id)?.CategoryName || '-';

  const openCreate = () => {
    setEditingItem(null);
    setForm({
      NewsTitle: '',
      Headline: '',
      NewsContent: '',
      NewsSource: 'FU News',
      CategoryID: mockCategories[0]?.CategoryID || '',
      NewsStatus: 1,
      tagIds: [],
    });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      NewsTitle: item.NewsTitle,
      Headline: item.Headline || '',
      NewsContent: item.NewsContent || '',
      NewsSource: item.NewsSource || '',
      CategoryID: item.CategoryID,
      NewsStatus: item.NewsStatus,
      tagIds: [...(item.tagIds || [])],
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.NewsTitle.trim()) return;
    const payload = {
      ...form,
      CategoryID: +form.CategoryID || list[0]?.CategoryID,
    };
    if (editingItem) {
      setList((prev) =>
        prev.map((n) =>
          n.NewsArticleID === editingItem.NewsArticleID
            ? { ...n, ...payload, tagIds: form.tagIds }
            : n
        )
      );
    } else {
      const newId = Math.max(0, ...list.map((n) => n.NewsArticleID)) + 1;
      setList((prev) => [
        ...prev,
        {
          NewsArticleID: newId,
          CreatedDate: new Date().toISOString().slice(0, 19),
          CreatedByID: 1,
          ...payload,
        },
      ]);
    }
    setModalOpen(false);
  };

  const toggleTag = (tagId) => {
    setForm((f) => ({
      ...f,
      tagIds: f.tagIds.includes(tagId)
        ? f.tagIds.filter((id) => id !== tagId)
        : [...f.tagIds, tagId],
    }));
  };

  const openDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) setList((prev) => prev.filter((n) => n.NewsArticleID !== deleteId));
    setConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <div>
      <h1 className="mb-4">News Article Management</h1>
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex gap-2 mb-3 flex-wrap">
            <Form.Control
              className="flex-grow-1"
              style={{ minWidth: '200px' }}
              placeholder="Tìm theo tiêu đề, tóm tắt, nội dung..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="primary" onClick={openCreate}>
              Thêm bài viết
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Tóm tắt</th>
                <th>Danh mục</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((n) => (
                <tr key={n.NewsArticleID}>
                  <td>{n.NewsArticleID}</td>
                  <td>{n.NewsTitle}</td>
                  <td>{n.Headline || '-'}</td>
                  <td>{getCategoryName(n.CategoryID)}</td>
                  <td>{n.NewsStatus === 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => openEdit(n)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => openDelete(n.NewsArticleID)}
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
        title={editingItem ? 'Cập nhật bài viết' : 'Thêm bài viết'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Form.Group className="mb-3">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            value={form.NewsTitle}
            onChange={(e) => setForm((f) => ({ ...f, NewsTitle: e.target.value }))}
            placeholder="Tiêu đề bài viết"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tóm tắt / Headline</Form.Label>
          <Form.Control
            type="text"
            value={form.Headline}
            onChange={(e) => setForm((f) => ({ ...f, Headline: e.target.value }))}
            placeholder="Tóm tắt ngắn"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={form.NewsContent}
            onChange={(e) => setForm((f) => ({ ...f, NewsContent: e.target.value }))}
            placeholder="Nội dung chi tiết"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nguồn</Form.Label>
          <Form.Control
            type="text"
            value={form.NewsSource}
            onChange={(e) => setForm((f) => ({ ...f, NewsSource: e.target.value }))}
            placeholder="Nguồn tin"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Danh mục</Form.Label>
          <Form.Select
            value={form.CategoryID}
            onChange={(e) => setForm((f) => ({ ...f, CategoryID: e.target.value }))}
          >
            {mockCategories.map((c) => (
              <option key={c.CategoryID} value={c.CategoryID}>
                {c.CategoryName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <div className="d-flex flex-wrap gap-3">
            {mockTags.map((t) => (
              <Form.Check
                key={t.TagID}
                type="checkbox"
                id={`tag-${t.TagID}`}
                label={t.TagName}
                checked={form.tagIds.includes(t.TagID)}
                onChange={() => toggleTag(t.TagID)}
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select
            value={form.NewsStatus}
            onChange={(e) => setForm((f) => ({ ...f, NewsStatus: +e.target.value }))}
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
        message="Bạn có chắc muốn xóa bài viết này?"
        onConfirm={handleDelete}
        onCancel={() => { setConfirmOpen(false); setDeleteId(null); }}
      />
    </div>
  );
}
