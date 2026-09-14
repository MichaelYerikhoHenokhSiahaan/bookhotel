import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function BookingSearchBar({ initialValues = {} }) {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const threeDaysLater = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

    const [checkIn, setCheckIn] = useState(initialValues.check_in || tomorrow);
    const [checkOut, setCheckOut] = useState(initialValues.check_out || threeDaysLater);
    const [adults, setAdults] = useState(initialValues.adults || 2);
    const [children, setChildren] = useState(initialValues.children || 0);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/booking/search', {
            check_in: checkIn,
            check_out: checkOut,
            adults: adults,
            children: children,
        });
    };

    return (
        <div className="glass-card rounded-4 p-4 shadow-lg border-0">
            <form onSubmit={handleSearch} className="row g-3 align-items-center">
                <div className="col-lg-3 col-md-6">
                    <label className="form-label text-uppercase text-secondary fw-semibold small tracking-wider mb-1">
                        <i className="bi bi-calendar-event text-gold me-1"></i> Check-In Date
                    </label>
                    <input
                        type="date"
                        min={today}
                        className="form-control form-control-lg border-light-subtle rounded-3 bg-white"
                        value={checkIn}
                        onChange={(e) => {
                            setCheckIn(e.target.value);
                            if (e.target.value >= checkOut) {
                                const nextDay = new Date(new Date(e.target.value).getTime() + 86400000).toISOString().split('T')[0];
                                setCheckOut(nextDay);
                            }
                        }}
                        required
                    />
                </div>

                <div className="col-lg-3 col-md-6">
                    <label className="form-label text-uppercase text-secondary fw-semibold small tracking-wider mb-1">
                        <i className="bi bi-calendar-check text-gold me-1"></i> Check-Out Date
                    </label>
                    <input
                        type="date"
                        min={checkIn}
                        className="form-control form-control-lg border-light-subtle rounded-3 bg-white"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                    />
                </div>

                <div className="col-lg-2 col-md-6">
                    <label className="form-label text-uppercase text-secondary fw-semibold small tracking-wider mb-1">
                        <i className="bi bi-people text-gold me-1"></i> Adults
                    </label>
                    <select
                        className="form-select form-select-lg border-light-subtle rounded-3 bg-white"
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value))}
                    >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4 Adults</option>
                    </select>
                </div>

                <div className="col-lg-2 col-md-6">
                    <label className="form-label text-uppercase text-secondary fw-semibold small tracking-wider mb-1">
                        <i className="bi bi-person-hearts text-gold me-1"></i> Children
                    </label>
                    <select
                        className="form-select form-select-lg border-light-subtle rounded-3 bg-white"
                        value={children}
                        onChange={(e) => setChildren(parseInt(e.target.value))}
                    >
                        <option value={0}>0 Children</option>
                        <option value={1}>1 Child</option>
                        <option value={2}>2 Children</option>
                        <option value={3}>3 Children</option>
                    </select>
                </div>

                <div className="col-lg-2 col-md-12 d-flex align-items-end">
                    <button type="submit" className="btn btn-gold btn-lg w-100 py-3 rounded-3 shadow-sm font-sans fw-bold">
                        <i className="bi bi-search me-1"></i> Check Rates
                    </button>
                </div>
            </form>
        </div>
    );
}
