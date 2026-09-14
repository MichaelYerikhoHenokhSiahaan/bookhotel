import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-navy text-white pt-5 pb-4 mt-5 border-top border-secondary border-opacity-25">
            <div className="container">
                <div className="row g-4 mb-5">
                    <div className="col-lg-4 col-md-6">
                        <div className="d-flex align-items-center mb-3">
                            <i className="bi bi-stars text-gold fs-3 me-2"></i>
                            <span className="font-serif fw-bold fs-4 text-white">GRAND VISTA RESORT</span>
                        </div>
                        <p className="text-white-50 mb-4" style={{ fontSize: '0.95rem' }}>
                            An extraordinary sanctuary of elegance and coastal relaxation. Indulge in world-class hospitality, fine dining, and private oceanfront villas.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2" style={{ width: 36, height: 36 }}>
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2" style={{ width: 36, height: 36 }}>
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2" style={{ width: 36, height: 36 }}>
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2" style={{ width: 36, height: 36 }}>
                                <i className="bi bi-tripadvisor"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h6 className="text-gold text-uppercase fw-bold mb-3 tracking-wider">Quick Navigation</h6>
                        <ul className="list-unstyled text-white-50 small d-grid gap-2">
                            <li><Link href="/" className="text-white-50 text-decoration-none">Home</Link></li>
                            <li><Link href="/booking/search" className="text-white-50 text-decoration-none">Rooms & Suites</Link></li>
                            <li><Link href="/gallery" className="text-white-50 text-decoration-none">Showcase Gallery</Link></li>
                            <li><Link href="/booking/lookup" className="text-white-50 text-decoration-none">Find Booking</Link></li>
                            <li><Link href="/admin" className="text-white-50 text-decoration-none">Staff Dashboard</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h6 className="text-gold text-uppercase fw-bold mb-3 tracking-wider">Resort Information</h6>
                        <ul className="list-unstyled text-white-50 small d-grid gap-2">
                            <li><i className="bi bi-geo-alt text-gold me-2"></i> 100 Coastal Haven Way, Paradise Cove</li>
                            <li><i className="bi bi-telephone text-gold me-2"></i> +1 (800) 555-VISTA (8478)</li>
                            <li><i className="bi bi-envelope text-gold me-2"></i> concierge@grandvistahotel.com</li>
                            <li><i className="bi bi-clock text-gold me-2"></i> Check-in: 3:00 PM | Check-out: 11:00 AM</li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h6 className="text-gold text-uppercase fw-bold mb-3 tracking-wider">Newsletter Concierge</h6>
                        <p className="text-white-50 small mb-3">
                            Subscribe for exclusive seasonal rate offers and private retreat invitations.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className="input-group">
                            <input type="email" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="Your email..." />
                            <button className="btn btn-gold btn-sm" type="submit">Join</button>
                        </form>
                    </div>
                </div>

                <hr className="border-secondary border-opacity-50 my-4" />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50 small">
                    <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} Grand Vista Resort & Spa. All rights reserved.</p>
                    <div>
                        <span className="me-3">Privacy Policy</span>
                        <span className="me-3">Terms of Service</span>
                        <span>Accessibility</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
