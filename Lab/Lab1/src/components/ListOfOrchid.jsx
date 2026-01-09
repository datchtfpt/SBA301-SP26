import { useState } from "react";
import ConfirmModal from "./ConfirmModal.jsx";
import { Row, Col } from "react-bootstrap";
import Orchid from "./Orchid.jsx";
import React from "react";


function ListOfOrchid({orchids}) {
    const [show, setShow] = useState(false);
    const [selectedOrchid, setSelectedOrchid] = useState(null);

    const handleClose = () => setShow(false);

    const handleShow = (orchid) => {
        setSelectedOrchid(orchid);
        setShow(true);
    };

    return (
        <>
            <Row md={3} className="g-4" style={{ padding: "20px" }}> 
                {orchids.map((orchid) => (
                    <Col key={orchid.id}>
                        <Orchid orchid={orchid} handleShow={handleShow} />
                    </Col>
                ))}
            </Row>
            
            <ConfirmModal
                show={show}
                handleClose={handleClose}
                title={selectedOrchid ? selectedOrchid.orchidName : ""}
                body={
                  selectedOrchid && (
                    <div>
                      <img 
                        src={selectedOrchid.image} 
                        alt={selectedOrchid.orchidName} 
                        className="img-fluid mb-3"
                      />
                      <p>{selectedOrchid.description}</p>
                      <p>Price: ${selectedOrchid.price}</p>
                      <p>Category: {selectedOrchid.category}</p>
                    </div>
                  )
                }
                onConfirm={() => setShow(false)}
            />
            
        </>
    );
}

export default ListOfOrchid;
