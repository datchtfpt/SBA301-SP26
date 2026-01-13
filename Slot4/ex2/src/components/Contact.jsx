import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import ConfirmModal from './ConfirmModal';

function Contact() {
  const [validated, setValidated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gmail: '',
    agreeToTerms: false,
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      setShowConfirm(true);
    } else {
      setShowConfirm(false);
    }

    setValidated(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirm(false);
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gmail: '',
      agreeToTerms: false,
    });
    alert("Form submitted successfully!");
    setValidated(false); 
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };  
  

  return (
    <>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Please enter your first name.."
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide your first name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Please enter your last name.."
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide your last name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control 
          type="text" 
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Please enter your phone number.." 
          required />
          <Form.Control.Feedback type="invalid">
            Please provide your phone number.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Gmail</Form.Label>
          <Form.Control 
          type="text" 
          name="gmail"
          value={formData.gmail}
          onChange={handleChange}
          placeholder="Please enter your gmail.." 
          required />
          <Form.Control.Feedback type="invalid">
            Please provide your gmail.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          label="Agree to terms and conditions"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>

    <ConfirmModal
    show={showConfirm}
    handleClose={() => setShowConfirm(false)}
    title="Confirm Submission"
    body={
      <div>
        <p><strong>First Name:</strong> {formData.firstName}</p>
        <p><strong>Last Name:</strong> {formData.lastName}</p>
        <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
        <p><strong>Gmail:</strong> {formData.gmail}</p>
        <p>
          <strong>Agreed to Terms:</strong>{" "}
          {formData.agreeToTerms ? "Yes" : "No"}
        </p>
      </div>
    }    
    onConfirm={handleConfirmSubmit} 
    />
    </>
  );
}

export default Contact;