import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const categoriesUrl = (import.meta.env.VITE_API_URL || "").replace("/orchids", "/categories");

export default function EditOrchid() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  const [api, setApi] = useState({});
  const [categories, setCategories] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();

  // ================= FETCH DETAIL =================
  const fetchOrchid = async () => {
    try {
      const res = await axios.get(`${baseUrl}/${id}`);
      // Backend trả về Optional<Orchid>, Spring Boot sẽ unwrap khi serialize
      const orchidData = res.data || {};
      if (!orchidData.orchidName) {
        toast.error("Orchid not found");
        navigate("/");
        return;
      }
      setApi(orchidData);
      reset({
        ...orchidData,
        categoryID: orchidData.category?.categoryID ?? "",
      });
    } catch (err) {
      toast.error("Failed to load orchid data");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchOrchid();
  }, [id]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(categoriesUrl, { timeout: 10000 });
        if (Array.isArray(res.data)) setCategories(res.data);
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    };
    load();
  }, []);

  // ================= SUBMIT =================
  const onSubmit = async (data) => {
    try {
      data.isNatural = !!data.isNatural;
      data.isAttractive = !!data.isAttractive;
      data.category = { categoryID: Number(data.categoryID) };
      delete data.categoryID;

      await axios.put(`${baseUrl}/${id}`, data, {
        headers: { "Content-Type": "application/json" }
      });
      toast.success("Update orchid successfully!");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <Container className="mt-4">
      <Toaster />
      <Row>
        <p className="lead text-primary">
          Edit the orchid: <strong>{api.orchidName}</strong>
        </p>
        <hr />
        <Col md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Orchid Name */}
            <Form.Group className="mb-3">
              <Form.Label>Orchid Name</Form.Label>
              <Controller
                name="orchidName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Control {...field} type="text" />
                )}
              />
              {errors.orchidName && (
                <p className="text-warning">Name is required</p>
              )}
            </Form.Group>

            {/* Orchid Description */}
            <Form.Group className="mb-3">
              <Form.Label>Orchid Description</Form.Label>
              <Controller
                name="orchidDescription"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Control {...field} as="textarea" rows={3} />
                )}
              />
              {errors.orchidDescription && (
                <p className="text-warning">Description is required</p>
              )}
            </Form.Group>

            {/* Orchid Category */}
            <Form.Group className="mb-3">
              <Form.Label>Orchid Category</Form.Label>
              <Controller
                name="categoryID"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Select {...field}>
                    <option value="">-- Choose category --</option>
                    {categories.map((c) => (
                      <option key={c.categoryID} value={c.categoryID}>
                        {c.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
              {errors.categoryID && (
                <p className="text-warning">Category is required</p>
              )}
            </Form.Group>

            {/* Image URL */}
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Controller
                name="orchidURL"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Form.Control {...field} type="text" />
                )}
              />
              {errors.orchidURL?.type === "required" && (
                <p className="text-warning">Image URL is required</p>
              )}
            </Form.Group>

            {/* Natural */}
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="isNatural"
                label="Natural"
                {...register("isNatural")}
              />
            </Form.Group>

            {/* Attractive */}
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="isAttractive"
                label="Attractive"
                {...register("isAttractive")}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
