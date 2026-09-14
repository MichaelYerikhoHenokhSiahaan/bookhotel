import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { url } = usePage();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark glass-nav sticky-top py-3">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center me-4" href="/">
                    <i className="bi bi-stars text-gold fs-3 me-2"></i>
                    <div>
                        <span className="font-serif fw-bold fs-4 tracking-wide d-block text-white">GRAND VISTA</span>
                        <span className="text-uppercase text-gold tracking-widest fs-7 font-sans fw-semibold" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>
                            RESORT & SPA
                        </span>
                    </div>
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMain"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarMain">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium">
                        <li className="nav-item">
                            <Link className={`nav-link px-3 ${url === '/' ? 'active text-gold' : 'text-white-50'}`} href="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 ${url.startsWith('/booking/search') ? 'active text-gold' : 'text-white-50'}`} href="/booking/search">
                                Rooms & Suites
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 ${url === '/gallery' ? 'active text-gold' : 'text-white-50'}`} href="/gallery">
                                Showcase Gallery
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 ${url === '/booking/lookup' ? 'active text-gold' : 'text-white-50'}`} href="/booking/lookup">
                                Find Reservation
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <Link href="/admin" className="btn btn-sm btn-outline-light d-none d-md-inline-flex align-items-center">
                            <i className="bi bi-speedometer2 me-1"></i> Admin Dashboard
                        </Link>
                        <Link href="/booking/search" className="btn btn-gold px-4 py-2 rounded-pill shadow-sm">
                            <i className="bi bi-calendar-check me-2"></i> Book Your Stay
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
