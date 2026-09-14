import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import BookingSearchBar from './BookingSearchBar';

export default function HeroSlideshow({ slides = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const defaultSlides = [
        {
            title: 'Panoramas & Oceanfront Pools',
            image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85',
            caption: 'Experience sunset infinity views overlooking private crystal waters.',
            category: 'Exterior'
        },
        {
            title: 'Executive Ocean Suite',
            image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=85',
            caption: 'Spacious open-plan interior with floor-to-ceiling panoramic glass.',
            category: 'Suites'
        },
        {
            title: 'Lumière Fine Dining Restaurant',
            image_url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1920&q=85',
            caption: 'Michelin-starred culinary experiences paired with rare vintage wines.',
            category: 'Dining'
        }
    ];

    const activeSlides = slides.length > 0 ? slides : defaultSlides;

    // Preload images for high performance
    useEffect(() => {
        activeSlides.forEach((slide) => {
            const img = new Image();
            img.src = slide.image_url;
        });
    }, [activeSlides]);

    // Auto-advance slide every 5 seconds
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, activeSlides.length]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            goToNext();
        }
        if (touchEndX.current - touchStartX.current > 50) {
            goToPrev();
        }
    };

    return (
        <div 
            className="position-relative w-100 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Full Width Hero Container */}
            <div className="hero-slideshow-container">
                {activeSlides.map((slide, idx) => (
                    <div 
                        key={idx} 
                        className={`hero-slide ${idx === currentIndex ? 'active' : ''}`}
                    >
                        <img 
                            src={slide.image_url} 
                            alt={slide.title} 
                            className="hero-slide-bg"
                            loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                        <div className="hero-overlay"></div>
                        
                        <div className="hero-content container">
                            <span className="badge bg-gold text-white text-uppercase tracking-widest mb-3 px-3 py-2 rounded-pill font-sans fw-semibold" style={{ letterSpacing: '0.15em' }}>
                                {slide.category || 'Luxury Experience'}
                            </span>
                            <h1 className="display-3 font-serif fw-bold text-white mb-3 text-shadow">
                                {slide.title}
                            </h1>
                            <p className="lead text-white-50 max-w-2xl mb-4 d-none d-md-block" style={{ fontSize: '1.25rem' }}>
                                {slide.caption}
                            </p>
                            <div className="d-flex flex-wrap gap-3 align-items-center">
                                <Link href="/booking/search" className="btn btn-gold btn-lg px-4 py-3 rounded-pill shadow-lg">
                                    Reserve Your Suite <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                                <Link href="/gallery" className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill">
                                    Explore Gallery
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button 
                onClick={goToPrev}
                className="btn btn-dark btn-lg rounded-circle position-absolute top-50 start-0 translate-middle-y ms-3 ms-md-4 opacity-75 hover-opacity-100 border-0 shadow"
                style={{ zIndex: 20, width: 48, height: 48 }}
                aria-label="Previous Slide"
            >
                <i className="bi bi-chevron-left text-white"></i>
            </button>
            <button 
                onClick={goToNext}
                className="btn btn-dark btn-lg rounded-circle position-absolute top-50 end-0 translate-middle-y me-3 me-md-4 opacity-75 hover-opacity-100 border-0 shadow"
                style={{ zIndex: 20, width: 48, height: 48 }}
                aria-label="Next Slide"
            >
                <i className="bi bi-chevron-right text-white"></i>
            </button>

            {/* Pagination Indicators */}
            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2" style={{ zIndex: 20 }}>
                {activeSlides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`btn p-0 rounded-circle border-0 transition-all ${idx === currentIndex ? 'bg-gold' : 'bg-white bg-opacity-50'}`}
                        style={{ width: idx === currentIndex ? 28 : 10, height: 10, borderRadius: 10 }}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Anchored Real-Time Booking Bar */}
            <div className="container position-relative" style={{ marginTop: '-45px', zIndex: 30 }}>
                <BookingSearchBar />
            </div>
        </div>
    );
}
