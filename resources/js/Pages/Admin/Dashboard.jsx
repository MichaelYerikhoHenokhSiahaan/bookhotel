import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { Link, useForm } from '@inertiajs/react';

export default function Dashboard({ stats, todayCheckIns = [], todayCheckOuts = [], recentBookings = [] }) {
    const { post } = useForm();

    const handleStatusChange = (bookingId, newStatus) => {
        post(`/admin/bookings/${bookingId}/status`, {
            data: { status: newStatus },
            preserveScroll: true,
        });
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />

            {/* Dashboard Header */}
            <div className="bg-navy text-white py-4">
                <div className="container d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <div>
                        <span className="text-gold text-uppercase tracking-widest fw-bold small">Hotel Executive Portal</span>
                        <h2 className="font-serif fw-bold mb-0">Management Dashboard</h2>
                    </div>
                    <div className="d-flex gap-2 mt-3 mt-md-0">
                        <Link href="/admin/rates" className="btn btn-gold fw-bold">
                            <i className="bi bi-tag-fill me-1"></i> Rate Management
                        </Link>
                        <Link href="/admin/bookings" className="btn btn-outline-light fw-bold">
                            <i className="bi bi-journal-text me-1"></i> All Bookings
                        </Link>
                        <Link href="/admin/rooms" className="btn btn-outline-light fw-bold">
                            <i className="bi bi-door-open me-1"></i> Room Inventory
                        </Link>
                        <Link href="/admin/gallery" className="btn btn-outline-light fw-bold">
                            <i className="bi bi-images me-1"></i> Gallery Manager
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                {/* Executive Stats Cards */}
                <div className="row g-4 mb-5">
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 border-start border-4 border-primary">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-secondary small uppercase fw-bold">Total Reservations</span>
                                <div className="p-2 bg-primary bg-opacity-10 text-primary rounded-circle">
                                    <i className="bi bi-journal-check fs-4"></i>
                                </div>
                            </div>
                            <h2 className="display-6 font-serif fw-bold text-navy mb-0">{stats.totalBookings}</h2>
                            <span className="text-muted small">All time bookings</span>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 border-start border-4 border-warning">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-secondary small uppercase fw-bold">Gross Revenue</span>
                                <div className="p-2 bg-warning bg-opacity-10 text-warning rounded-circle">
                                    <i className="bi bi-cash-stack fs-4"></i>
                                </div>
                            </div>
                            <h2 className="display-6 font-serif fw-bold text-navy mb-0">${stats.totalRevenue}</h2>
                            <span className="text-muted small">Confirmed & completed stays</span>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 border-start border-4 border-success">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-secondary small uppercase fw-bold">Today Occupancy</span>
                                <div className="p-2 bg-success bg-opacity-10 text-success rounded-circle">
                                    <i className="bi bi-pie-chart fs-4"></i>
                                </div>
                            </div>
                            <h2 className="display-6 font-serif fw-bold text-navy mb-0">{stats.occupancyRate}%</h2>
                            <span className="text-muted small">{stats.activeBookingsCount} of {stats.totalInventory} rooms occupied</span>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 border-start border-4 border-info">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-secondary small uppercase fw-bold">Today Check-Ins</span>
                                <div className="p-2 bg-info bg-opacity-10 text-info rounded-circle">
                                    <i className="bi bi-box-arrow-in-right fs-4"></i>
                                </div>
                            </div>
                            <h2 className="display-6 font-serif fw-bold text-navy mb-0">{todayCheckIns.length}</h2>
                            <span className="text-muted small">Guests arriving today</span>
                        </div>
                    </div>
                </div>

                {/* Today Activity Lists */}
                <div className="row g-4 mb-5">
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm rounded-4 bg-white p-4 h-100">
                            <h5 className="font-serif fw-bold text-navy mb-3">
                                <i className="bi bi-box-arrow-in-right text-success me-2"></i> Today's Check-Ins ({todayCheckIns.length})
                            </h5>
                            {todayCheckIns.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {todayCheckIns.map((b) => (
                                        <li key={b.id} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong className="text-dark d-block">{b.guest_name}</strong>
                                                <span className="small text-muted">{b.room_type?.name} ({b.confirmation_code})</span>
                                            </div>
                                            <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                                                {b.status}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted small mb-0 py-3">No guest check-ins scheduled for today.</p>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm rounded-4 bg-white p-4 h-100">
                            <h5 className="font-serif fw-bold text-navy mb-3">
                                <i className="bi bi-box-arrow-left text-warning me-2"></i> Today's Check-Outs ({todayCheckOuts.length})
                            </h5>
                            {todayCheckOuts.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {todayCheckOuts.map((b) => (
                                        <li key={b.id} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong className="text-dark d-block">{b.guest_name}</strong>
                                                <span className="small text-muted">{b.room_type?.name} ({b.confirmation_code})</span>
                                            </div>
                                            <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill">
                                                {b.status}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted small mb-0 py-3">No guest check-outs scheduled for today.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Bookings Table */}
                <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="font-serif fw-bold text-navy mb-0">Recent Reservations</h5>
                        <Link href="/admin/bookings" className="btn btn-sm btn-outline-gold fw-bold">
                            View All Bookings
                        </Link>
                    </div>

                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Code</th>
                                    <th>Guest</th>
                                    <th>Room Type</th>
                                    <th>Dates</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((b) => (
                                    <tr key={b.id}>
                                        <td>
                                            <span className="fw-bold font-serif text-navy">{b.confirmation_code}</span>
                                        </td>
                                        <td>
                                            <div>
                                                <strong className="text-dark d-block">{b.guest_name}</strong>
                                                <small className="text-muted">{b.guest_email}</small>
                                            </div>
                                        </td>
                                        <td>{b.room_type?.name}</td>
                                        <td>
                                            <small className="text-dark">{b.check_in} to {b.check_out}</small>
                                            <small className="text-muted d-block">({b.total_nights} nights)</small>
                                        </td>
                                        <td className="fw-bold text-navy">${b.total_amount}</td>
                                        <td>
                                            <span className={`badge ${b.status === 'confirmed' ? 'bg-success' : b.status === 'checked_in' ? 'bg-info' : 'bg-secondary'} px-3 py-2 rounded-pill`}>
                                                {b.status}
                                            </span>
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
