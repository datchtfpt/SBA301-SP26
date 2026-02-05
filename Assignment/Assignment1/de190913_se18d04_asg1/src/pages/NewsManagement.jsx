import { useState, useEffect, useMemo } from 'react';
import { Form, Table, Button, Card, Alert } from 'react-bootstrap';
import { newsAPI, categoryAPI, tagAPI } from '../services/api';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';

export default function NewsManagement() {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
    tags: [],
  });

  // Load data on component mount
  useEffect(() => {
    // Set default role for demo
    localStorage.setItem('userRole', '2');
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [newsData, categoriesData, tagsData] = await Promise.all([
        newsAPI.getAll(),
        categoryAPI.getAll(),
        tagAPI.getAll()
      ]);
      setList(newsData);
      setCategories(categoriesData);
      setTags(tagsData);
      setError('');
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Load data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredList = useMemo(() => {
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (n) =>
        n.newsTitle?.toLowerCase().includes(q) ||
        (n.headline && n.headline.toLowerCase().includes(q)) ||
        (n.newsContent && n.newsContent.toLowerCase().includes(q))
    );
  }, [list, search]);

  const getCategoryName = (id) => categories.find((c) => c.categoryId === id)?.categoryName || '-';

  const openCreate = () => {
    setEditingItem(null);
    setForm({
      NewsTitle: '',
      Headline: '',
      NewsContent: '',
      NewsSource: 'FU News',
      CategoryID: categories[0]?.categoryId || '',
      NewsStatus: 1,
      tags: [],
    });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      NewsTitle: item.newsTitle,
      Headline: item.headline || '',
      NewsContent: item.newsContent || '',
      NewsSource: item.newsSource || '',
      CategoryID: item.category?.categoryId || '',
      NewsStatus: item.newsStatus,
      tags: item.tags?.map(tag => tag.tagID) || [],
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.NewsTitle.trim()) return;
    
    try {
      const payload = {
        newsTitle: form.NewsTitle,
        headline: form.Headline,
        newsContent: form.NewsContent,
        newsSource: form.NewsSource,
        category: { categoryId: +form.CategoryID },
        newsStatus: form.NewsStatus,
        tags: tags.filter(tag => form.tags.includes(tag.tagID)),
        createdBy: { accountId: 1 }, // Default user, should come from auth context
        updatedBy: { accountId: 1 },
        createdDate: new Date(),
        modifiedDate: new Date(),
      };

      if (editingItem) {
        await newsAPI.update(editingItem.newsArticleID, payload);
      } else {
        await newsAPI.create(payload);
      }
      
      await loadData(); // Reload data
      setModalOpen(false);
    } catch (err) {
      setError('Failed to save news article. Please try again.');
      console.error('Save error:', err);
    }
  };

  const toggleTag = (tagId) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tagId)
        ? f.tags.filter((id) => id !== tagId)
        : [...f.tags, tagId],
    }));
  };

  const openDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (deleteId) {
        await newsAPI.delete(deleteId);
        await loadData(); // Reload data
      }
      setConfirmOpen(false);
      setDeleteId(null);
    } catch (err) {
      setError('Failed to delete news article. Please try again.');
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-4">News Article Management</h1>
      
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      
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
                <tr key={n.newsArticleID}>
                  <td>{n.newsArticleID}</td>
                  <td>{n.newsTitle}</td>
                  <td>{n.headline || '-'}</td>
                  <td>{getCategoryName(n.category?.categoryId)}</td>
                  <td>{n.newsStatus === 1 ? 'Active' : 'Inactive'}</td>
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
                      onClick={() => openDelete(n.newsArticleID)}
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
            {categories.map((c) => (
              <option key={c.categoryId} value={c.categoryId}>
                {c.categoryName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <div className="d-flex flex-wrap gap-3">
            {tags.map((t) => (
              <Form.Check
                key={t.tagID}
                type="checkbox"
                id={`tag-${t.tagID}`}
                label={t.tagName}
                checked={form.tags.includes(t.tagID)}
                onChange={() => toggleTag(t.tagID)}
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
