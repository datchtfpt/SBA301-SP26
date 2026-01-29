import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";

function ActionModal({ show, onClose,title, orchid, onSave, categories }) {
    
    const emptyForm = {
        orchidName: "",
        description: "",
        category: "",
        price: "",
        image: "",
        isSpecial: false
    };

    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        if (orchid) {
            setForm(orchid);
        } else if(show) {
            setForm(emptyForm);
        }
    }, [orchid, show]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Control
                    className="mb-2"
                    name="orchidName"
                    value={form.orchidName}
                    onChange={handleChange}
                    placeholder="Orchid Name"
                />

                <Form.Control
                    className="mb-2"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                />

                <Form.Select
                    className="mb-2"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                >
                    
                    {categories.map((c, index) => (
                        <option key={index} value={c}>
                            {c}
                        </option>
                    ))}
                </Form.Select>


                <Form.Control
                    className="mb-2"
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                />

                <Form.Control
                    className="mb-2"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                />

                <Form.Check
                    type="checkbox"
                    label="Special Orchid"
                    name="isSpecial"
                    checked={form.isSpecial}
                    onChange={handleChange}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={() => onSave(form)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ActionModal;
