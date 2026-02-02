import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import { Button, Form, Image, Modal } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { confirm } from "react-confirm-box";

const categoriesUrl = (import.meta.env.VITE_API_URL || "").replace("/orchids", "/categories");

export default function ListOfOrchids() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [api, setAPI] = useState([]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      isNatural: false,
      isAttractive: false
    }
  });

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(categoriesUrl, { timeout: 10000 });
      if (Array.isArray(res.data)) setCategories(res.data);
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  };

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(baseUrl, {
        timeout: 10000, // 10 seconds timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        const sortedData = response.data.sort(
          (a, b) => b.orchidID - a.orchidID
        );
        setAPI(sortedData);
      } else {
        setAPI([]);
        toast.error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timeout! Please check if backend is running.");
      } else if (error.response) {
        // Server responded with error status
        toast.error(`Server error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Cannot connect to backend server! Please make sure backend is running on http://localhost:8080");
      } else {
        toast.error(`Error: ${error.message}`);
      }
      setAPI([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      fetchData();
      toast.success("Orchid deleted successfully!");
    } catch (error) {
      console.error("Error deleting orchid:", error);
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timeout! Please check if backend is running.");
      } else if (error.response) {
        toast.error(`Delete failed: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        toast.error("Cannot connect to backend server! Please make sure backend is running.");
      } else {
        toast.error(`Delete failed: ${error.message}`);
      }
    }
  };

  // ================= ADD =================
  const onSubmit = async (data) => {
    try {
      data.isNatural = !!data.isNatural;
      data.isAttractive = !!data.isAttractive;
      data.category = { categoryID: Number(data.categoryID) };
      delete data.categoryID;

      await axios.post(baseUrl, data, {
        timeout: 10000,
        headers: { "Content-Type": "application/json" }
      });

      handleClose();
      fetchData();
      reset();
      toast.success("Orchid added successfully!");
    } catch (error) {
      console.error("Error adding orchid:", error);
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timeout! Please check if backend is running.");
      } else if (error.response) {
        toast.error(`Add failed: ${error.response.status} - ${error.response.statusText}`);
        if (error.response.data) {
          console.error("Server response:", error.response.data);
        }
      } else if (error.request) {
        toast.error("Cannot connect to backend server! Please make sure backend is running on http://localhost:8080");
      } else {
        toast.error(`Add failed: ${error.message}`);
      }
    }
  };

  return (
    <Container>
      <Toaster />

      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Orchid List</h2>
        <Button onClick={handleShow} className="btn btn-primary">
          <i className="bi bi-node-plus"></i> Add new orchid
        </Button>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading orchids...</p>
        </div>
      ) : api.length === 0 ? (
        <div className="alert alert-info text-center my-5">
          <p>No orchids found. Please add a new orchid or check if backend is running.</p>
        </div>
      ) : (
        <Table striped bordered hover className="my-5">
          <thead>
            <tr>
              <th>Image</th>
              <th>Orchid Name</th>
              <th>Category</th>
              <th>Origin</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {api.map((a) => (
            <tr key={a.orchidID}>
              <td>
                <Image src={a.orchidURL} width={40} rounded />
              </td>
              <td>{a.orchidName}</td>
              <td>{a.category?.categoryName ?? "-"}</td>
              <td>
                {a.isNatural ? (
                  <span className="badge bg-success">Natural</span>
                ) : (
                  <span className="badge bg-warning">Industry</span>
                )}
              </td>
              <td>
                <Link to={`edit/${a.orchidID}`}>
                  <i className="bi bi-pencil-square"> Edit</i>
                </Link>
                {" | "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (confirm("Are you sure?")) {
                      handleDelete(a.orchidID);
                    }
                  }}
                >
                  <i className="bi bi-trash"> Delete</i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      )}

      {/* ================= MODAL ================= */}
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Orchid</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("orchidName", { required: true })}
              />
              {errors.orchidName && (
                <p className="text-danger">Name is required</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                {...register("orchidDescription", { required: true })}
                as="textarea"
                rows={3}
              />
              {errors.orchidDescription && (
                <p className="text-danger">Description is required</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select {...register("categoryID", { required: true })}>
                <option value="">-- Choose category --</option>
                {categories.map((c) => (
                  <option key={c.categoryID} value={c.categoryID}>
                    {c.categoryName}
                  </option>
                ))}
              </Form.Select>
              {errors.categoryID && (
                <p className="text-danger">Category is required</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                {...register("orchidURL", { required: true })}
              />
              {errors.orchidURL && (
                <p className="text-danger">Image URL is required</p>
              )}
            </Form.Group>

            <Form.Check
              type="switch"
              label="Natural"
              {...register("isNatural")}
            />

            <Form.Check
              type="switch"
              label="Attractive"
              {...register("isAttractive")}
            />

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
