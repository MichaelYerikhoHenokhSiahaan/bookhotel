import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { Link } from '@inertiajs/react';

export default function Confirmation({ booking }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />

            <div className="container py-5 my-3">
                <div className="max-w-3xl mx-auto">
                    {/* Success Header */}
                    <div className="text-center mb-4">
                        <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle p-3 mb-3 shadow" style={{ width: 72, height: 72 }}>
                            <i className="bi bi-check-lg display-5"></i>
                        </div>
                        <h2 className="display-6 font-serif fw-bold text-navy mb-2">
                            Reservation Confirmed!
                        </h2>
                        <p className="text-secondary lead">
                            Thank you, <strong>{booking.guest_name}</strong>. Your luxury stay has been successfully reserved.
                        </p>
                    </div>

                    {/* Digital Booking Voucher Pass */}
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4 print-card">
                        <div className="bg-navy text-white p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                            <div>
                                <span className="text-gold text-uppercase tracking-widest fw-semibold small d-block mb-1">
                                    GRAND VISTA RESORT & SPA
                                </span>
                                <h4 className="font-serif fw-bold mb-0">Official Booking Pass</h4>
                            </div>
                            <div className="mt-3 mt-md-0 text-md-end">
                                <span className="text-white-50 small d-block">Confirmation Code</span>
                                <span className="fs-3 fw-bold text-gold font-serif tracking-wider">{booking.confirmation_code}</span>
                            </div>
                        </div>

                        <div className="card-body p-4 p-md-5 bg-white">
                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <h6 className="text-uppercase text-gold fw-bold small tracking-wider mb-2">Reserved Accommodations</h6>
                                    <h5 className="font-serif fw-bold text-navy mb-1">{booking.room_type?.name}</h5>
                                    <span className="badge bg-light text-dark border me-2">{booking.room_type?.bed_type}</span>
                                    <span className="badge bg-light text-dark border">{booking.adults} Adults, {booking.children} Children</span>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="text-uppercase text-gold fw-bold small tracking-wider mb-2">Guest Profile</h6>
                                    <p className="mb-1 fw-semibold text-dark">{booking.guest_name}</p>
                                    <p className="mb-1 text-muted small"><i className="bi bi-envelope me-1"></i> {booking.guest_email}</p>
                                    <p className="mb-0 text-muted small"><i className="bi bi-telephone me-1"></i> {booking.guest_phone}</p>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="row g-4 mb-4">
                                <div className="col-md-4">
                                    <span className="text-muted small d-block text-uppercase">Check-In Date</span>
                                    <h6 className="fw-bold text-navy mb-0">{booking.check_in}</h6>
                                    <small className="text-muted">3:00 PM onwards</small>
                                </div>
                                <div className="col-md-4">
                                    <span className="text-muted small d-block text-uppercase">Check-Out Date</span>
                                    <h6 className="fw-bold text-navy mb-0">{booking.check_out}</h6>
                                    <small className="text-muted">Before 11:00 AM</small>
                                </div>
                                <div className="col-md-4">
                                    <span className="text-muted small d-block text-uppercase">Total Duration</span>
                                    <h6 className="fw-bold text-navy mb-0">{booking.total_nights} Night(s)</h6>
                                </div>
                            </div>

                            {booking.special_requests && (
                                <div className="p-3 bg-light rounded-3 mb-4">
                                    <span className="text-uppercase text-secondary fw-bold small d-block mb-1">Special Requests:</span>
                                    <p className="mb-0 small text-dark">{booking.special_requests}</p>
                                </div>
                            )}

                            <div className="border-top pt-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-bold">
                                        Status: {booking.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="text-end">
                                    <span className="text-muted small d-block">Grand Total</span>
                                    <span className="fs-3 fw-bold text-navy font-serif">${booking.total_amount}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="d-flex flex-wrap justify-content-center gap-3 no-print">
                        <button onClick={handlePrint} className="btn btn-navy px-4 py-2 rounded-pill text-white fw-bold">
                            <i className="bi bi-printer me-2"></i> Print Confirmation Pass
                        </button>
                        <Link href="/booking/lookup" className="btn btn-outline-gold px-4 py-2 rounded-pill fw-bold">
                            <i className="bi bi-search me-2"></i> Look Up Booking
                        </Link>
                        <Link href="/" className="btn btn-gold px-4 py-2 rounded-pill fw-bold">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
