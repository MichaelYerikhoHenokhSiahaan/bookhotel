import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import HeroSlideshow from '../Components/HeroSlideshow';
import RoomCard from '../Components/RoomCard';
import { Link } from '@inertiajs/react';

export default function Home({ heroSlides = [], featuredRooms = [], galleryPreview = [] }) {
    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <Navbar />

            {/* Full-Width Showcase Slideshow Hero */}
            <HeroSlideshow slides={heroSlides} />

            {/* Property Introduction */}
            <section className="py-5 mt-5">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <span className="text-gold text-uppercase tracking-widest fw-bold mb-2 d-block small">
                                Welcome to Paradise
                            </span>
                            <h2 className="display-5 font-serif fw-bold text-navy mb-4">
                                Where Coastal Elegance Meets Unrivaled Luxury
                            </h2>
                            <p className="lead text-secondary mb-4">
                                Nestled along pristine private shores, Grand Vista Resort offers a sanctuary of tranquility, bespoke hospitality, and modern architectural majesty.
                            </p>
                            <p className="text-muted mb-4">
                                Every room is meticulously crafted to maximize breathtaking natural views, featuring private plunge pools, organic artisanal bath products, and 24/7 personalized butler assistance.
                            </p>
                            <div className="row g-4 text-center">
                                <div className="col-4">
                                    <div className="p-3 rounded-3 bg-white shadow-sm border">
                                        <h3 className="font-serif fw-bold text-gold mb-0">50+</h3>
                                        <span className="small text-muted">Luxury Suites</span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 rounded-3 bg-white shadow-sm border">
                                        <h3 className="font-serif fw-bold text-gold mb-0">4.9★</h3>
                                        <span className="small text-muted">Guest Rating</span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 rounded-3 bg-white shadow-sm border">
                                        <h3 className="font-serif fw-bold text-gold mb-0">3</h3>
                                        <span className="small text-muted">Michelin Chefs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="position-relative">
                                <img
                                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
                                    alt="Resort Property"
                                    className="img-fluid rounded-4 shadow-lg w-100"
                                />
                                <div className="position-absolute bottom-0 start-0 translate-middle-y ms-4 p-4 bg-navy text-white rounded-4 shadow-lg d-none d-sm-block max-w-xs">
                                    <i className="bi bi-quote text-gold fs-1 d-block mb-1"></i>
                                    <p className="small fst-italic mb-2">"The most memorable sunset experience of my life."</p>
                                    <span className="fw-bold text-gold small">— Architectural Digest</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Rooms Showcase */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
                        <div>
                            <span className="text-gold text-uppercase tracking-widest fw-bold mb-2 d-block small">
                                Accommodations
                            </span>
                            <h2 className="display-6 font-serif fw-bold text-navy mb-0">
                                Signature Suites & Private Villas
                            </h2>
                        </div>
                        <Link href="/booking/search" className="btn btn-outline-gold px-4 py-2 rounded-pill mt-3 mt-md-0 fw-bold">
                            View All Accommodations <i className="bi bi-arrow-right ms-1"></i>
                        </Link>
                    </div>

                    <div className="row g-4">
                        {featuredRooms.map((room) => (
                            <div key={room.id} className="col-lg-6">
                                <RoomCard room={room} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Full-Width Showcase Gallery Preview Section */}
            <section className="py-5 bg-navy text-white">
                <div className="container py-4">
                    <div className="text-center max-w-2xl mx-auto mb-5">
                        <span className="text-gold text-uppercase tracking-widest fw-bold mb-2 d-block small">
                            Visual Journey
                        </span>
                        <h2 className="display-5 font-serif fw-bold mb-3">
                            Discover The Property Showcase
                        </h2>
                        <p className="text-white-50">
                            Immerse yourself in our architectural highlights, infinity pools, fine dining sanctuaries, and private spa retreats.
                        </p>
                    </div>

                    <div className="row g-3">
                        {galleryPreview.map((img, idx) => (
                            <div key={idx} className={idx < 2 ? "col-md-6" : "col-md-3"}>
                                <div className="position-relative overflow-hidden rounded-4 shadow group" style={{ height: 260 }}>
                                    <img
                                        src={img.image_url}
                                        alt={img.title}
                                        className="w-100 h-100 object-fit-cover transition-transform"
                                        style={{ transition: 'transform 0.5s ease' }}
                                    />
                                    <div className="position-absolute inset-0 bg-dark bg-opacity-25 d-flex align-items-end p-3">
                                        <div>
                                            <span className="badge bg-gold text-white mb-1 small">{img.category}</span>
                                            <h6 className="font-serif fw-bold text-white mb-0">{img.title}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-5">
                        <Link href="/gallery" className="btn btn-gold btn-lg px-5 py-3 rounded-pill shadow">
                            View Full Photo Showcase <i className="bi bi-[#101010] bi-images ms-2"></i>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
