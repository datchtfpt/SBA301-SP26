import { Modal as BSModal, ModalHeader, ModalTitle, ModalBody } from 'react-bootstrap';

export default function Modal({ title, open, onClose, children }) {
  return (
    <BSModal show={open} onHide={onClose} centered>
      <ModalHeader closeButton>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </BSModal>
  );
}
