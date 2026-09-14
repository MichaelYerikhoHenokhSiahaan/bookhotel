import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { router, useForm, Link } from '@inertiajs/react';

export default function Bookings({ bookings, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const { post } = useForm();

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/admin/bookings', { search, status });
    };

    const handleStatusUpdate = (bookingId, newStatus) => {
        post(`/admin/bookings/${bookingId}/status`, {
            status: newStatus,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />

            <div className="bg-navy text-white py-4">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>
                        <span className="text-gold text-uppercase tracking-widest fw-bold small">Staff Operations</span>
                        <h2 className="font-serif fw-bold mb-0">Reservation Management</h2>
                    </div>
                    <Link href="/admin" className="btn btn-outline-light btn-sm fw-bold">
                        <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
                    </Link>
                </div>
            </div>

            <div className="container py-5">
                {/* Search & Filter Controls */}
                <form onSubmit={handleFilter} className="card p-4 shadow-sm border-0 rounded-4 mb-4">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-5">
                            <label className="form-label fw-bold text-navy small">Search Guest / Code / Email</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name, email, or GV- code..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-bold text-navy small">Filter by Status</label>
                            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">All Statuses</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="checked_in">Checked In</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-gold w-100 fw-bold py-2">
                                <i className="bi bi-funnel me-1"></i> Apply Filters
                            </button>
                        </div>
                    </div>
                </form>

                {/* Bookings Table */}
                <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Code</th>
                                    <th>Guest Details</th>
                                    <th>Suite Type</th>
                                    <th>Dates</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.data.map((b) => (
                                    <tr key={b.id}>
                                        <td className="fw-bold font-serif text-navy">{b.confirmation_code}</td>
                                        <td>
                                            <strong className="text-dark d-block">{b.guest_name}</strong>
                                            <small className="text-muted d-block">{b.guest_email}</small>
                                            <small className="text-muted">{b.guest_phone}</small>
                                        </td>
                                        <td>{b.room_type?.name}</td>
                                        <td>
                                            <small className="fw-semibold text-dark">{b.check_in} to {b.check_out}</small>
                                            <small className="text-muted d-block">({b.total_nights} nights)</small>
                                        </td>
                                        <td className="fw-bold text-navy">${b.total_amount}</td>
                                        <td>
                                            <span className={`badge ${b.status === 'confirmed' ? 'bg-success' : b.status === 'checked_in' ? 'bg-info' : b.status === 'completed' ? 'bg-primary' : 'bg-danger'} px-3 py-2 rounded-pill`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="text-end">
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                                    Manage
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-end">
                                                    <li>
                                                        <button onClick={() => handleStatusUpdate(b.id, 'confirmed')} className="dropdown-item">Mark Confirmed</button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => handleStatusUpdate(b.id, 'checked_in')} className="dropdown-item">Mark Checked-In</button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => handleStatusUpdate(b.id, 'completed')} className="dropdown-item">Mark Completed</button>
                                                    </li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li>
                                                        <button onClick={() => handleStatusUpdate(b.id, 'cancelled')} className="dropdown-item text-danger">Cancel Booking</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
