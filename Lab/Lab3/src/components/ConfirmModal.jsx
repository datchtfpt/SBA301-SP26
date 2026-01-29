import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ConfirmModal({ show, handleClose, title, body, onConfirm }) {
    return (
       <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton> 
            <Modal.Title> {title} </Modal.Title>
        </Modal.Header>
        <Modal.Body> {body} </Modal.Body>
        <Modal.Footer>
            {/*<Button variant="primary" onClick={handleClose}>Cancel</Button> */}
            <Button variant="secondary" onClick={onConfirm}>Confirm</Button>
        </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;