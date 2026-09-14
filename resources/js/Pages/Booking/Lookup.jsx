import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { router, Link } from '@inertiajs/react';

export default function Lookup({ searchCode = '', booking = null }) {
    const [code, setCode] = useState(searchCode);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/booking/lookup', { code: code });
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />

            <div className="bg-navy text-white py-5">
                <div className="container py-3 text-center max-w-2xl mx-auto">
                    <span className="text-gold text-uppercase tracking-widest fw-bold small d-block mb-2">
                        Guest Portal
                    </span>
                    <h1 className="display-5 font-serif fw-bold mb-3">Find Your Reservation</h1>
                    <p className="text-white-50 lead mb-0">
                        Enter your unique 8-character booking confirmation code (e.g. GV-78921A) to check reservation status or view your digital pass.
                    </p>
                </div>
            </div>

            <div className="container py-5">
                <div className="max-w-xl mx-auto">
                    <form onSubmit={handleSearch} className="card p-4 shadow-sm border-0 rounded-4 mb-5">
                        <label className="form-label font-serif fw-bold text-navy mb-2">
                            Enter Confirmation Code
                        </label>
                        <div className="input-group input-group-lg">
                            <input
                                type="text"
                                className="form-control font-serif fw-bold tracking-wider text-uppercase"
                                placeholder="GV-XXXXXX"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                            <button className="btn btn-gold px-4 fw-bold" type="submit">
                                <i className="bi bi-search me-1"></i> Look Up
                            </button>
                        </div>
                    </form>

                    {booking && (
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="bg-navy text-white p-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="text-gold small fw-bold uppercase d-block">Confirmation Code</span>
                                    <h4 className="font-serif fw-bold mb-0">{booking.confirmation_code}</h4>
                                </div>
                                <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
                                    {booking.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="card-body p-4">
                                <h5 className="font-serif fw-bold text-navy mb-3">{booking.room_type?.name}</h5>
                                <div className="d-grid gap-2 small text-secondary mb-4">
                                    <div className="d-flex justify-content-between">
                                        <span>Guest Name:</span>
                                        <strong className="text-dark">{booking.guest_name}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Dates:</span>
                                        <strong className="text-dark">{booking.check_in} to {booking.check_out}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Total Nights:</span>
                                        <strong className="text-dark">{booking.total_nights} Nights</strong>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Total Amount:</span>
                                        <strong className="text-gold fs-5 fw-bold font-serif">${booking.total_amount}</strong>
                                    </div>
                                </div>

                                <Link href={`/booking/confirmation/${booking.confirmation_code}`} className="btn btn-gold w-100 py-2 rounded-pill fw-bold">
                                    View Digital Confirmation Pass <i className="bi bi-arrow-right ms-1"></i>
                                </Link>
                            </div>
                        </div>
                    )}

                    {searchCode && !booking && (
                        <div className="text-center py-4 bg-white rounded-4 shadow-sm border p-4">
                            <i className="bi bi-exclamation-circle text-warning display-4 d-block mb-3"></i>
                            <h5 className="font-serif fw-bold text-navy">No Reservation Found</h5>
                            <p className="text-muted mb-0">We could not find any active booking under code <strong>"{searchCode}"</strong>. Please double-check your code.</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
