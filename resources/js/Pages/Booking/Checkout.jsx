import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useForm, Link } from '@inertiajs/react';

export default function Checkout({ room, checkIn, checkOut, adults, children, rateDetails }) {
    const { data, setData, post, processing, errors } = useForm({
        room_type_id: room.id,
        check_in: checkIn,
        check_out: checkOut,
        adults: adults,
        children: children,
        guest_name: '',
        guest_email: '',
        guest_phone: '',
        special_requests: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/booking/store');
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />

            <div className="bg-navy text-white py-4">
                <div className="container">
                    <span className="text-gold text-uppercase tracking-widest fw-bold small d-block mb-1">
                        Step 2 of 3: Reserve Your Room
                    </span>
                    <h2 className="font-serif fw-bold mb-0">Complete Your Reservation</h2>
                </div>
            </div>

            <div className="container py-5">
                <form onSubmit={handleSubmit} className="row g-5">
                    {/* Guest Information Form */}
                    <div className="col-lg-7">
                        <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm border">
                            <h4 className="font-serif fw-bold text-navy mb-4 border-bottom pb-3">
                                <i className="bi bi-person-circle text-gold me-2"></i> Guest Details
                            </h4>

                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">
                                    Full Guest Name *
                                </label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors.guest_name ? 'is-invalid' : ''}`}
                                    placeholder="e.g. Alexander Wright"
                                    value={data.guest_name}
                                    onChange={(e) => setData('guest_name', e.target.value)}
                                    required
                                />
                                {errors.guest_name && <div className="invalid-feedback">{errors.guest_name}</div>}
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-secondary small text-uppercase">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control form-control-lg ${errors.guest_email ? 'is-invalid' : ''}`}
                                        placeholder="alexander@example.com"
                                        value={data.guest_email}
                                        onChange={(e) => setData('guest_email', e.target.value)}
                                        required
                                    />
                                    {errors.guest_email && <div className="invalid-feedback">{errors.guest_email}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-secondary small text-uppercase">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        className={`form-control form-control-lg ${errors.guest_phone ? 'is-invalid' : ''}`}
                                        placeholder="+1 (555) 019-2834"
                                        value={data.guest_phone}
                                        onChange={(e) => setData('guest_phone', e.target.value)}
                                        required
                                    />
                                    {errors.guest_phone && <div className="invalid-feedback">{errors.guest_phone}</div>}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">
                                    Special Requests or Preferences (Optional)
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="e.g. High floor, quiet room, late check-in request, dietary preferences..."
                                    value={data.special_requests}
                                    onChange={(e) => setData('special_requests', e.target.value)}
                                ></textarea>
                            </div>

                            <div className="p-3 bg-light rounded-3 mb-4 d-flex align-items-center gap-3">
                                <i className="bi bi-shield-check text-success fs-2"></i>
                                <span className="small text-muted">
                                    <strong>Instant Confirmation Guarantee:</strong> No immediate credit card charge required. Payment can be finalized at resort check-in.
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-gold btn-lg w-100 py-3 rounded-3 shadow font-sans fw-bold"
                                disabled={processing}
                            >
                                {processing ? 'Processing Reservation...' : 'Confirm & Generate Booking Pass'} <i className="bi bi-check-circle ms-2"></i>
                            </button>
                        </div>
                    </div>

                    {/* Booking Summary Sidebar */}
                    <div className="col-lg-5">
                        <div className="bg-white rounded-4 p-4 shadow-sm border sticky-top" style={{ top: 100 }}>
                            <h5 className="font-serif fw-bold text-navy mb-3">Reservation Summary</h5>
                            
                            <div className="d-flex gap-3 mb-3">
                                <img
                                    src={room.featured_image}
                                    alt={room.name}
                                    className="rounded-3 object-fit-cover"
                                    style={{ width: 100, height: 75 }}
                                />
                                <div>
                                    <h6 className="font-serif fw-bold mb-1">{room.name}</h6>
                                    <span className="badge bg-navy text-gold small">{room.bed_type}</span>
                                </div>
                            </div>

                            <hr className="my-3" />

                            <div className="d-grid gap-2 mb-3 text-secondary small">
                                <div className="d-flex justify-content-between">
                                    <span>Check-In:</span>
                                    <strong className="text-dark">{checkIn} (from 3:00 PM)</strong>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Check-Out:</span>
                                    <strong className="text-dark">{checkOut} (until 11:00 AM)</strong>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Duration:</span>
                                    <strong className="text-dark">{rateDetails.total_nights} Night(s)</strong>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Guests:</span>
                                    <strong className="text-dark">{adults} Adult(s), {children} Child(ren)</strong>
                                </div>
                            </div>

                            <hr className="my-3" />

                            <div className="d-grid gap-2 mb-4">
                                <div className="d-flex justify-content-between small text-secondary">
                                    <span>Nightly Rate:</span>
                                    <span>${rateDetails.nightly_rate} / night</span>
                                </div>
                                <div className="d-flex justify-content-between small text-secondary">
                                    <span>Room Subtotal:</span>
                                    <span>${rateDetails.subtotal}</span>
                                </div>
                                <div className="d-flex justify-content-between small text-secondary">
                                    <span>Resort Fees & Taxes (12%):</span>
                                    <span>${rateDetails.taxes_and_fees}</span>
                                </div>
                                <div className="d-flex justify-content-between fs-4 fw-bold text-navy font-serif border-top pt-2 mt-1">
                                    <span>Total Payable:</span>
                                    <span className="text-gold">${rateDetails.total_amount}</span>
                                </div>
                            </div>

                            <Link href="/booking/search" className="btn btn-sm btn-outline-secondary w-100">
                                <i className="bi bi-arrow-left me-1"></i> Change Room or Dates
                            </Link>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}
