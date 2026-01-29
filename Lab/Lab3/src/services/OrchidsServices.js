import api from "../api/api.js";


export const getAllOrchids = () => api.get("/orchids");
export const getOrchidById = (id) => api.get(`/orchids/${id}`);

export const createOrchid = (orchid) =>
    api.post("/orchids", orchid);

export const updateOrchid = (id, data) =>
    api.put(`/orchids/${id}`, data);

export const deleteOrchid = (id) =>
    api.delete(`/orchids/${id}`);


