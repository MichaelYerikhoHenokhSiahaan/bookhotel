import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useForm, router, Link } from '@inertiajs/react';

export default function Gallery({ images = [] }) {
    const { data, setData, post, reset, processing } = useForm({
        title: '',
        category: 'Exterior',
        image_url: '',
        caption: '',
        is_hero: true,
    });

    const handleAddImage = (e) => {
        e.preventDefault();
        post('/admin/gallery', {
            onSuccess: () => reset(),
        });
    };

    const handleDeleteImage = (id) => {
        if (confirm('Delete this showcase photo?')) {
            router.delete(`/admin/gallery/${id}`);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />

            <div className="bg-navy text-white py-4">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>
                        <span className="text-gold text-uppercase tracking-widest fw-bold small">Media Manager</span>
                        <h2 className="font-serif fw-bold mb-0">Showcase Slideshow & Gallery Manager</h2>
                    </div>
                    <Link href="/admin" className="btn btn-outline-light btn-sm fw-bold">
                        Dashboard
                    </Link>
                </div>
            </div>

            <div className="container py-5">
                <div className="row g-5">
                    {/* Add Image Form */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 bg-white p-4 sticky-top" style={{ top: 100 }}>
                            <h5 className="font-serif fw-bold text-navy mb-3">Add Showcase Photo</h5>

                            <form onSubmit={handleAddImage} className="d-grid gap-3">
                                <div>
                                    <label className="form-label fw-bold text-secondary small">Photo Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. Infinity Sunset Pool"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="form-label fw-bold text-secondary small">Category</label>
                                    <select
                                        className="form-select"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                    >
                                        <option value="Exterior">Exterior & Grounds</option>
                                        <option value="Suites">Suites & Villas</option>
                                        <option value="Dining">Fine Dining & Bars</option>
                                        <option value="Amenities">Spa & Wellness</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="form-label fw-bold text-secondary small">Image URL (High-Res)</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        placeholder="https://images.unsplash.com/..."
                                        value={data.image_url}
                                        onChange={(e) => setData('image_url', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="form-label fw-bold text-secondary small">Caption / Subtitle</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Brief descriptive subtitle"
                                        value={data.caption}
                                        onChange={(e) => setData('caption', e.target.value)}
                                    />
                                </div>

                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="isHeroCheck"
                                        checked={data.is_hero}
                                        onChange={(e) => setData('is_hero', e.target.checked)}
                                    />
                                    <label className="form-check-label fw-bold small text-navy" htmlFor="isHeroCheck">
                                        Feature on Home Full-Width Slideshow
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-gold fw-bold py-2" disabled={processing}>
                                    <i className="bi bi-upload me-1"></i> Save To Gallery
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className="col-lg-8">
                        <div className="row g-4">
                            {images.map((img) => (
                                <div key={img.id} className="col-md-6">
                                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white h-100">
                                        <div className="position-relative" style={{ height: 200 }}>
                                            <img src={img.image_url} alt={img.title} className="w-100 h-100 object-fit-cover" />
                                            {img.is_hero && (
                                                <span className="position-absolute top-0 start-0 m-3 badge bg-gold text-white shadow-sm">
                                                    Hero Slideshow
                                                </span>
                                            )}
                                            <span className="position-absolute top-0 end-0 m-3 badge bg-navy text-gold shadow-sm">
                                                {img.category}
                                            </span>
                                        </div>
                                        <div className="card-body p-3 d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="font-serif fw-bold mb-0 text-navy">{img.title}</h6>
                                                {img.caption && <small className="text-muted">{img.caption}</small>}
                                            </div>
                                            <button onClick={() => handleDeleteImage(img.id)} className="btn btn-sm btn-outline-danger">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
