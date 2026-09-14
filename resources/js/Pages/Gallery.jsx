import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Gallery({ images = [], categories = [] }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeModalImage, setActiveModalImage] = useState(null);

    const filteredImages = selectedCategory === 'All'
        ? images
        : images.filter((img) => img.category === selectedCategory);

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />

            {/* Gallery Header */}
            <div className="bg-navy text-white py-5">
                <div className="container py-3 text-center max-w-3xl mx-auto">
                    <span className="text-gold text-uppercase tracking-widest fw-bold small d-block mb-2">
                        Property Showcase
                    </span>
                    <h1 className="display-4 font-serif fw-bold mb-3">Architectural & Landscape Gallery</h1>
                    <p className="text-white-50 lead mb-0">
                        Explore our sleek oceanfront views, luxury master suites, fine dining, and thermal spa sanctuaries.
                    </p>
                </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="container py-4">
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`btn rounded-pill px-4 py-2 fw-semibold transition-all ${selectedCategory === 'All' ? 'btn-gold shadow-sm' : 'btn-outline-secondary'}`}
                    >
                        All Categories ({images.length})
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`btn rounded-pill px-4 py-2 fw-semibold transition-all ${selectedCategory === cat ? 'btn-gold shadow-sm' : 'btn-outline-secondary'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Gallery Image Grid */}
                <div className="row g-4">
                    {filteredImages.map((img) => (
                        <div key={img.id} className="col-lg-4 col-md-6">
                            <div
                                className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 cursor-pointer group"
                                style={{ cursor: 'pointer' }}
                                onClick={() => setActiveModalImage(img)}
                            >
                                <div className="position-relative overflow-hidden" style={{ height: 280 }}>
                                    <img
                                        src={img.image_url}
                                        alt={img.title}
                                        className="w-100 h-100 object-fit-cover transition-transform"
                                        style={{ transition: 'transform 0.5s ease' }}
                                    />
                                    <div className="position-absolute top-0 end-0 m-3">
                                        <span className="badge bg-navy text-gold px-3 py-2 rounded-pill shadow-sm">
                                            {img.category}
                                        </span>
                                    </div>
                                    <div className="position-absolute inset-0 bg-dark bg-opacity-25 d-flex align-items-end p-4">
                                        <div>
                                            <h5 className="font-serif fw-bold text-white mb-1">{img.title}</h5>
                                            {img.caption && <p className="text-white-50 small mb-0">{img.caption}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {activeModalImage && (
                <div 
                    className="modal fade show d-block bg-dark bg-opacity-75"
                    style={{ backdropFilter: 'blur(8px)' }}
                    onClick={() => setActiveModalImage(null)}
                >
                    <div className="modal-dialog modal-xl modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content bg-navy text-white border-secondary rounded-4 overflow-hidden shadow-lg">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title font-serif fw-bold">{activeModalImage.title}</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setActiveModalImage(null)}
                                ></button>
                            </div>
                            <div className="modal-body p-0 text-center bg-black">
                                <img
                                    src={activeModalImage.image_url}
                                    alt={activeModalImage.title}
                                    className="img-fluid max-h-80vh object-fit-contain"
                                    style={{ maxHeight: '75vh' }}
                                />
                            </div>
                            {activeModalImage.caption && (
                                <div className="modal-footer border-secondary justify-content-between">
                                    <span className="text-white-50 small">{activeModalImage.caption}</span>
                                    <span className="badge bg-gold text-white">{activeModalImage.category}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
