import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import ConfirmModal from "../components/ConfirmModal.jsx";

function Contact() {
  const [validated, setValidated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gmail: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity()) {
      setShowConfirm(true);
    }
    setValidated(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirm(false);
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gmail: "",
      agreeToTerms: false,
    });
    setValidated(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <Container className="contact-page">
      <Card className="contact-card shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Contact Us</h2>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
                <Form.Control.Feedback type="invalid">
                  First name is required
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Gmail</Form.Label>
                <Form.Control
                  required
                  name="gmail"
                  value={formData.gmail}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-4">
              <Form.Check
                required
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                label="I agree to the terms and conditions"
              />
            </Form.Group>

            <div className="text-center">
              <Button type="submit" size="lg">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <ConfirmModal
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        title="Confirm Submission"
        body={
          <div>
            <p><strong>First Name:</strong> {formData.firstName}</p>
            <p><strong>Last Name:</strong> {formData.lastName}</p>
            <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
            <p><strong>Email:</strong> {formData.gmail}</p>
            <p>
              <strong>Agreed to Terms:</strong>{" "}
              {formData.agreeToTerms ? "Yes" : "No"}
            </p>
          </div>
        }
        onConfirm={handleConfirmSubmit}
      />

    </Container>
  );
}

export default Contact;
