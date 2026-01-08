import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Orchid({ show, handleClose, orchid }) {
    if (!orchid) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{orchid.orchidName}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <img
                    src={orchid.image}
                    alt={orchid.orchidName}
                    style={{ width: "100%", marginBottom: "15px" }}
                />

                <p>{orchid.description}</p>

                <p>
                    <strong>Category:</strong> {orchid.category}
                </p>

                {orchid.isSpecial && (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                        Special Orchid
                    </p>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Orchid;
