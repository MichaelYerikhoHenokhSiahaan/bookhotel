import React from 'react';
import { Link } from '@inertiajs/react';

export default function RoomCard({ room, searchParams = {} }) {
    const rateDetails = room.rate_details || {
        total_nights: 1,
        nightly_rate: room.base_price,
        total_amount: room.base_price * 1.12
    };

    const isAvailable = room.available_count === undefined || room.available_count > 0;

    return (
        <div className="card room-card h-100 border-0 shadow-sm overflow-hidden">
            <div className="position-relative">
                <img
                    src={room.featured_image}
                    alt={room.name}
                    className="room-card-img img-fluid"
                />
                <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-navy text-gold px-3 py-2 rounded-pill shadow font-sans fw-semibold">
                        {room.bed_type}
                    </span>
                </div>
                {room.available_count !== undefined && (
                    <div className="position-absolute bottom-0 start-0 m-3">
                        <span className={`badge ${room.available_count > 0 ? 'bg-success' : 'bg-danger'} text-white px-3 py-2 rounded-pill shadow-sm`}>
                            {room.available_count > 0 ? `${room.available_count} Rooms Available` : 'Sold Out for Selected Dates'}
                        </span>
                    </div>
                )}
            </div>

            <div className="card-body d-flex flex-column p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h4 className="font-serif fw-bold text-navy mb-0">{room.name}</h4>
                </div>

                <div className="d-flex align-items-center gap-3 text-secondary small mb-3">
                    <span><i className="bi bi-arrows-angle me-1 text-gold"></i> {room.size_sqm} m² / {Math.round(room.size_sqm * 10.764)} sq ft</span>
                    <span><i className="bi bi-people me-1 text-gold"></i> Max {room.capacity_adults} Adults</span>
                </div>

                <p className="card-text text-muted small mb-4 flex-grow-1" style={{ lineHeight: '1.6' }}>
                    {room.description}
                </p>

                {room.amenities && Array.isArray(room.amenities) && (
                    <div className="d-flex flex-wrap gap-2 mb-4">
                        {room.amenities.slice(0, 4).map((amenity, idx) => (
                            <span key={idx} className="badge badge-amenity">
                                <i className="bi bi-check2 text-gold me-1"></i> {amenity}
                            </span>
                        ))}
                    </div>
                )}

                <div className="border-top pt-3 mt-auto d-flex align-items-end justify-content-between">
                    <div>
                        <span className="text-secondary small d-block">Starting from</span>
                        <div className="d-flex align-items-baseline gap-1">
                            <span className="fs-3 fw-bold text-navy font-serif">${rateDetails.nightly_rate}</span>
                            <span className="text-muted small">/ night</span>
                        </div>
                        {rateDetails.total_nights > 1 && (
                            <span className="text-success small fw-medium">
                                Total: ${rateDetails.total_amount} ({rateDetails.total_nights} nights incl. tax)
                            </span>
                        )}
                    </div>

                    {isAvailable ? (
                        <Link
                            href="/booking/checkout"
                            data={{
                                room_type_id: room.id,
                                check_in: searchParams.check_in,
                                check_out: searchParams.check_out,
                                adults: searchParams.adults || 2,
                                children: searchParams.children || 0
                            }}
                            className="btn btn-gold px-4 py-2 rounded-pill fw-bold shadow-sm"
                        >
                            Book Room <i className="bi bi-arrow-right ms-1"></i>
                        </Link>
                    ) : (
                        <button className="btn btn-secondary px-4 py-2 rounded-pill fw-semibold" disabled>
                            Fully Booked
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
