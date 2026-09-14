import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import BookingSearchBar from '../../Components/BookingSearchBar';
import RoomCard from '../../Components/RoomCard';

export default function Search({ searchParams, rooms = [] }) {
    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />

            {/* Header Banner */}
            <div className="bg-navy text-white py-5">
                <div className="container py-3">
                    <span className="text-gold text-uppercase tracking-widest fw-bold small d-block mb-2">
                        Online Booking Engine
                    </span>
                    <h1 className="display-5 font-serif fw-bold mb-3">Available Rooms & Real-Time Rates</h1>
                    <p className="text-white-50 lead mb-0">
                        Select your stay dates to compute live room availability, seasonal discounts, and instant rate breakdowns.
                    </p>
                </div>
            </div>

            {/* Sticky Search Bar */}
            <div className="container" style={{ marginTop: '-30px', zIndex: 10 }}>
                <BookingSearchBar initialValues={searchParams} />
            </div>

            {/* Results Grid */}
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="font-serif fw-bold text-navy mb-1">
                            {rooms.length} Room Types Found
                        </h4>
                        <p className="text-muted small mb-0">
                            Showing available suites for stay: <strong className="text-dark">{searchParams.check_in}</strong> to <strong className="text-dark">{searchParams.check_out}</strong>
                        </p>
                    </div>
                </div>

                <div className="row g-4">
                    {rooms.map((room) => (
                        <div key={room.id} className="col-lg-6">
                            <RoomCard room={room} searchParams={searchParams} />
                        </div>
                    ))}

                    {rooms.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <div className="p-5 bg-white rounded-4 shadow-sm max-w-lg mx-auto">
                                <i className="bi bi-calendar-x text-gold display-1 d-block mb-3"></i>
                                <h4 className="font-serif fw-bold text-navy mb-2">No Rooms Available</h4>
                                <p className="text-secondary mb-4">
                                    We could not find available inventory matching your exact dates or guest count. Try adjusting your stay dates above.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
