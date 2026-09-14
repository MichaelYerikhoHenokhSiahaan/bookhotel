import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useForm, router, Link } from '@inertiajs/react';

export default function Rooms({ rooms = [] }) {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, reset, processing } = useForm({
        name: '',
        description: '',
        base_price: 250,
        capacity_adults: 2,
        capacity_children: 1,
        size_sqm: 40,
        bed_type: '1 King Bed',
        featured_image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
        total_inventory: 5,
    });

    const handleCreateRoom = (e) => {
        e.preventDefault();
        post('/admin/rooms', {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
        });
    };

    const handleDeleteRoom = (roomId) => {
        if (confirm('Are you sure you want to delete this room type?')) {
            router.delete(`/admin/rooms/${roomId}`);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />

            <div className="bg-navy text-white py-4">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>
                        <span className="text-gold text-uppercase tracking-widest fw-bold small">Property Control</span>
                        <h2 className="font-serif fw-bold mb-0">Room Inventory Manager</h2>
                    </div>
                    <div className="d-flex gap-2">
                        <button onClick={() => setShowModal(true)} className="btn btn-gold fw-bold">
                            <i className="bi bi-plus-lg me-1"></i> Add Room Category
                        </button>
                        <Link href="/admin" className="btn btn-outline-light btn-sm fw-bold">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row g-4">
                    {rooms.map((room) => (
                        <div key={room.id} className="col-lg-6">
                            <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden h-100">
                                <div className="row g-0">
                                    <div className="col-md-5">
                                        <img src={room.featured_image} alt={room.name} className="h-100 w-100 object-fit-cover min-h-200" />
                                    </div>
                                    <div className="col-md-7 p-4 d-flex flex-column">
                                        <h5 className="font-serif fw-bold text-navy mb-1">{room.name}</h5>
                                        <span className="badge bg-light text-dark border me-auto mb-2">{room.bed_type}</span>
                                        <p className="small text-muted flex-grow-1">{room.description}</p>
                                        <div className="d-flex justify-content-between align-items-center border-top pt-2">
                                            <div>
                                                <span className="fs-4 fw-bold font-serif text-navy">${room.base_price}</span>
                                                <small className="text-muted"> / night ({room.total_inventory} units)</small>
                                            </div>
                                            <button onClick={() => handleDeleteRoom(room.id)} className="btn btn-sm btn-outline-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Create Room */}
            {showModal && (
                <div className="modal fade show d-block bg-dark bg-opacity-50">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content rounded-4 border-0 shadow-lg">
                            <div className="modal-header bg-navy text-white">
                                <h5 className="modal-title font-serif fw-bold">Add New Room Category</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleCreateRoom} className="modal-body p-4">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-secondary">Room Name</label>
                                        <input type="text" className="form-control" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-secondary">Bed Configuration</label>
                                        <input type="text" className="form-control" value={data.bed_type} onChange={(e) => setData('bed_type', e.target.value)} required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-secondary">Description</label>
                                        <textarea className="form-control" rows="2" value={data.description} onChange={(e) => setData('description', e.target.value)} required></textarea>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-secondary">Base Rate ($/night)</label>
                                        <input type="number" className="form-control" value={data.base_price} onChange={(e) => setData('base_price', e.target.value)} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-secondary">Adult Capacity</label>
                                        <input type="number" className="form-control" value={data.capacity_adults} onChange={(e) => setData('capacity_adults', e.target.value)} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-secondary">Total Units</label>
                                        <input type="number" className="form-control" value={data.total_inventory} onChange={(e) => setData('total_inventory', e.target.value)} required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold small text-secondary">Featured Image URL</label>
                                        <input type="url" className="form-control" value={data.featured_image} onChange={(e) => setData('featured_image', e.target.value)} required />
                                    </div>
                                </div>
                                <div className="mt-4 text-end">
                                    <button type="button" className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-gold fw-bold" disabled={processing}>Save Room Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
