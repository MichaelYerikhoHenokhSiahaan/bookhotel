import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useForm, router, Link } from '@inertiajs/react';

export default function RateManagement({ rooms = [], seasonalRates = [] }) {
    const [editingRoomId, setEditingRoomId] = useState(null);
    const [editingPrice, setEditingPrice] = useState('');

    const { data, setData, post, reset, processing, errors } = useForm({
        title: '',
        room_type_id: '',
        start_date: '',
        end_date: '',
        rate_multiplier: 1.20,
        fixed_override_price: '',
    });

    const handleUpdateBaseRate = (roomId) => {
        router.post(`/admin/rates/room/${roomId}`, {
            base_price: editingPrice,
        }, {
            onSuccess: () => setEditingRoomId(null),
        });
    };

    const handleCreateSeasonalRule = (e) => {
        e.preventDefault();
        post('/admin/rates/seasonal', {
            onSuccess: () => reset(),
        });
    };

    const handleDeleteRule = (ruleId) => {
        if (confirm('Delete this seasonal rate rule?')) {
            router.delete(`/admin/rates/seasonal/${ruleId}`);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />

            <div className="bg-navy text-white py-4">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>
                        <span className="text-gold text-uppercase tracking-widest fw-bold small">Hotel Revenue Control</span>
                        <h2 className="font-serif fw-bold mb-0">Basic Rate Management Engine</h2>
                    </div>
                    <Link href="/admin" className="btn btn-outline-light btn-sm fw-bold">
                        <i className="bi bi-arrow-left me-1"></i> Dashboard
                    </Link>
                </div>
            </div>

            <div className="container py-5">
                <div className="row g-5">
                    {/* Base Rates Per Room */}
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
                            <h4 className="font-serif fw-bold text-navy mb-3">
                                <i className="bi bi-currency-dollar text-gold me-2"></i> Base Nightly Rates
                            </h4>
                            <p className="text-muted small mb-4">
                                Set default standard nightly rates per room type. Changes update guest searches in real-time.
                            </p>

                            <ul className="list-group list-group-flush">
                                {rooms.map((room) => (
                                    <li key={room.id} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong className="text-dark d-block">{room.name}</strong>
                                            <span className="small text-muted">{room.bed_type}</span>
                                        </div>

                                        {editingRoomId === room.id ? (
                                            <div className="d-flex gap-2 align-items-center">
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    style={{ width: 100 }}
                                                    value={editingPrice}
                                                    onChange={(e) => setEditingPrice(e.target.value)}
                                                />
                                                <button
                                                    onClick={() => handleUpdateBaseRate(room.id)}
                                                    className="btn btn-sm btn-gold fw-bold"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingRoomId(null)}
                                                    className="btn btn-sm btn-outline-secondary"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="d-flex align-items-center gap-3">
                                                <span className="fs-5 fw-bold font-serif text-navy">${room.base_price}</span>
                                                <button
                                                    onClick={() => {
                                                        setEditingRoomId(room.id);
                                                        setEditingPrice(room.base_price);
                                                    }}
                                                    className="btn btn-sm btn-outline-gold"
                                                >
                                                    Edit Rate
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Create Seasonal Rate Override Rule */}
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
                            <h4 className="font-serif fw-bold text-navy mb-3">
                                <i className="bi bi-graph-up-arrow text-gold me-2"></i> Create Seasonal Rate Rule
                            </h4>
                            <p className="text-muted small mb-4">
                                Apply seasonal surge pricing (+20%, +30%) or fixed price overrides for holiday periods.
                            </p>

                            <form onSubmit={handleCreateSeasonalRule} className="row g-3">
                                <div className="col-12">
                                    <label className="form-label fw-bold text-secondary small">Rule Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. Summer High Season, New Year Peak"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-secondary small">Applies To Room</label>
                                    <select
                                        className="form-select"
                                        value={data.room_type_id}
                                        onChange={(e) => setData('room_type_id', e.target.value)}
                                    >
                                        <option value="">All Rooms (Global Surge)</option>
                                        {rooms.map((r) => (
                                            <option key={r.id} value={r.id}>{r.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-secondary small">Price Multiplier</label>
                                    <select
                                        className="form-select"
                                        value={data.rate_multiplier}
                                        onChange={(e) => setData('rate_multiplier', parseFloat(e.target.value))}
                                    >
                                        <option value={1.10}>+10% (1.10x)</option>
                                        <option value={1.20}>+20% (1.20x Peak)</option>
                                        <option value={1.30}>+30% (1.30x Surge)</option>
                                        <option value={1.50}>+50% (1.50x Holiday)</option>
                                        <option value={0.85}>-15% (0.85x Low Season)</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-secondary small">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-secondary small">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <button type="submit" className="btn btn-gold w-100 fw-bold py-2" disabled={processing}>
                                        <i className="bi bi-plus-circle me-1"></i> Add Seasonal Rate Rule
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Active Seasonal Rules List */}
                <div className="card border-0 shadow-sm rounded-4 bg-white p-4 mt-5">
                    <h5 className="font-serif fw-bold text-navy mb-3">Active Seasonal Rate Rules</h5>

                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Rule Title</th>
                                    <th>Target Room</th>
                                    <th>Date Range</th>
                                    <th>Multiplier / Override</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seasonalRates.map((rule) => (
                                    <tr key={rule.id}>
                                        <td className="fw-bold text-navy">{rule.title}</td>
                                        <td>{rule.room_type ? rule.room_type.name : 'All Rooms'}</td>
                                        <td>
                                            <small className="fw-semibold text-dark">{rule.start_date} to {rule.end_date}</small>
                                        </td>
                                        <td>
                                            <span className="badge bg-gold text-white fs-6">
                                                {rule.fixed_override_price ? `$${rule.fixed_override_price} Fixed` : `${rule.rate_multiplier}x Multiplier`}
                                            </span>
                                        </td>
                                        <td className="text-end">
                                            <button onClick={() => handleDeleteRule(rule.id)} className="btn btn-sm btn-outline-danger">
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {seasonalRates.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted py-3">
                                            No custom seasonal rate rules active. Standard base rates & weekend surcharges (+15%) apply.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
