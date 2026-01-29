import { useEffect, useState } from "react";
import {
    getAllOrchids,
    createOrchid,
    deleteOrchid
} from "../services/OrchidsServices.js";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ConfirmModal from "../components/ConfirmModal.jsx";
import ActionModal from "../components/ActionModal.jsx";
import { updateOrchid } from "../services/OrchidsServices.js";

function OrchidManagement() {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [orchids, setOrchids] = useState([]);
    const [selectedOrchid, setSelectedOrchid] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
   

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getAllOrchids().then(res => setOrchids(res.data));
    };

    const handleAddClick = () => {
        console.log("Add button clicked");
        setSelectedOrchid(null);
        setShowAdd(true);
    };

    const handleAddSave = (newOrchid) => {
        createOrchid({
            ...newOrchid,
            price: Number(newOrchid.price)
        }).then(() => {
            setShowAdd(false);
            loadData();
        });
    };


    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const handleDeleteConfirm = () => {
        deleteOrchid(selectedId).then(() => {
            setShowConfirm(false);
            setSelectedId(null);
            loadData();
        });
    };

    const handleEditClick = (orchid) => {
        setSelectedOrchid(orchid);
        setShowUpdate(true);
    };

    const handleEditSave = (updatedOrchid) => {
        updateOrchid(updatedOrchid.id, updatedOrchid).then(() => {
            setShowUpdate(false);
            setSelectedOrchid(null);
            loadData();
        });
    };

    const categories = [...new Set(orchids.map(o => o.category))];

    return (
        <>
            <div className="container mt-4">
                <h2>Orchid Management</h2>

                <Button variant="primary" onClick={() => handleAddClick()} className="mb-3">
                    + Add Orchid
                </Button>


                {/* READ + DELETE */}
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Special</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orchids.map(o => (
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>{o.orchidName}</td>
                                <td>{o.description}</td>
                                <td>{o.category} </td>
                                <td>{o.isSpecial ? "Yes" : "No"}</td>
                                <td>${o.price}</td>
                                <td>
                                    <img src={o.image} alt="" width={80} />
                                </td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleEditClick(o)}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDeleteClick(o.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
            <ConfirmModal
                show={showConfirm}
                handleClose={() => setShowConfirm(false)}
                title="Confirm delete"
                body="Are you sure you want to delete this orchid?"
                onConfirm={handleDeleteConfirm}
            />

            <ActionModal
                show={showUpdate}
                orchid={selectedOrchid}
                onClose={() => setShowUpdate(false)}
                onSave={handleEditSave}
                categories={categories}
                title="Update Orchid"
            />

            <ActionModal
                show={showAdd}
                orchid={null}
                onClose={() => setShowAdd(false)}
                onSave={handleAddSave}
                categories={categories}
                title="Add Orchid"
            />


        </>
    );
}

export default OrchidManagement;
