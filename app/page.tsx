"use client";

import { useState, useEffect, useRef } from "react"
import { ContactForm } from "@/components/contact-form"
import { BookingModal } from "@/components/booking-modal"
import { QuoteModal } from "@/components/quote-modal"


export default function Home() {
    const [isMobileNavActive, setIsMobileNavActive] = useState(false)
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

    const headerRef = useRef<HTMLElement>(null)

    const toggleMobileNav = () => {
        setIsMobileNavActive(!isMobileNavActive)
    }

    const closeMobileNav = () => {
        setIsMobileNavActive(false)
    }

    const openBookingModal = () => {
        setIsBookingModalOpen(true)
        document.body.style.overflow = "hidden"
    }

    const closeBookingModal = () => {
        setIsBookingModalOpen(false)
        document.body.style.overflow = "auto"
    }

    const openQuoteModal = () => {
        setIsQuoteModalOpen(true)
        document.body.style.overflow = "hidden"
    }

    const closeQuoteModal = () => {
        setIsQuoteModalOpen(false)
        document.body.style.overflow = "auto"
    }

    useEffect(() => {
        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            const handleClick = function (this: HTMLAnchorElement, e: Event) {
                e.preventDefault()
                const target = document.querySelector(this.getAttribute("href") || "")
                if (target) {
                    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0
                    const targetPosition = (target as HTMLElement).offsetTop - headerHeight
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    })
                    closeMobileNav() // Close mobile nav after clicking a link
                }
            }
            anchor.addEventListener("click", handleClick)
            return () => anchor.removeEventListener("click", handleClick)
        })

        // Close modal with Escape key
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeBookingModal()
                closeQuoteModal()
            }
        }
        document.addEventListener("keydown", handleKeyDown)

        // Header Background on Scroll
        const handleScroll = () => {
            if (headerRef.current) {
                if (window.scrollY > 100) {
                    headerRef.current.style.background = "rgba(255, 255, 255, 0.98)"
                } else {
                    headerRef.current.style.background = "rgba(255, 255, 255, 0.95)"
                }
            }
        }
        window.addEventListener("scroll", handleScroll)

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    (entry.target as HTMLElement).style.opacity = "1";
                    (entry.target as HTMLElement).style.transform = "translateY(0)";
                }
            });
        }, observerOptions);

        document.querySelectorAll(".service-card, .testimonial-card, .contact-card").forEach((el) => {
            (el as HTMLElement).style.opacity = "0";
            (el as HTMLElement).style.transform = "translateY(20px)";
            (el as HTMLElement).style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(el);
        });

        // Set minimum date for booking form
        const bookingDateInput = document.getElementById("bookingDate") as HTMLInputElement
        if (bookingDateInput) {
            const today = new Date().toISOString().split("T")[0]
            bookingDateInput.min = today
        }

        // Auto-resize textareas
        document.querySelectorAll("textarea").forEach((textarea) => {
            const handleInput = function (this: HTMLTextAreaElement) {
                this.style.height = "auto"
                this.style.height = this.scrollHeight + "px"
            }
            textarea.addEventListener("input", handleInput)
            return () => textarea.removeEventListener("input", handleInput)
        })

        // Initial load animation
        document.body.style.opacity = "0"
        window.setTimeout(() => { // Changed setTimeout to window.setTimeout
            document.body.style.transition = "opacity 0.5s ease"
            document.body.style.opacity = "1"
        }, 100)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("scroll", handleScroll)
            observer.disconnect()
        }
    }, [])


    return (
        <>
            {/* Header */}
            <header className="header" ref={headerRef}>
                <div className="container">
                    <div className="nav-wrapper">
                        <div className="logo">

                            <img src="/img/logo_1.png" alt="logo" className="logo-img" />

                        </div>
                        {/* Desktop Navigation */}
                        <nav className="nav-desktop">
                            <a href="#home" className="nav-link">Home</a>
                            <a href="#about" className="nav-link">About</a>
                            <a href="#services" className="nav-link">Services</a>
                            <a href="#contact" className="nav-link">Contact</a>
                        </nav>
                        {/* Mobile Menu Button */}
                        <button className="mobile-menu-btn" id="mobileMenuBtn" onClick={toggleMobileNav}>
                            <i className={`fas ${isMobileNavActive ? "fa-times" : "fa-bars"}`} id="menuIcon"></i>
                        </button>
                    </div>
                    {/* Mobile Navigation */}
                    <nav className={`nav-mobile ${isMobileNavActive ? "active" : ""}`} id="mobileNav">
                        <a href="#home" className="nav-link">Home</a>
                        <a href="#about" className="nav-link">About</a>
                        <a href="#services" className="nav-link">Services</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="hero-img">
                    <img src="/img/hero.jpg" alt="Cleaning services hero" />
                </div>
                <div className="hero-overlay"></div>
                {/* Content */}
                <div className="hero-content">
                    <div className="container">
                        <div className="hero-text">
                            {/* Tagline */}
                            <div className="hero-tagline">Professional Cleaning Services</div>
                            {/* Main Heading */}
                            <h1 className="hero-title">Affordable, Reliable, and Flexible - Book Today! </h1>
                            {/* Action Buttons */}
                            <div className="hero-buttons">
                                <button className="btn btn-primary" id="bookNowBtn" onClick={openBookingModal}>Book Now</button>
                                <button className="btn btn-secondary" id="getQuoteBtn" onClick={openQuoteModal}>Get a Quote</button>
                            </div>
                            {/* Trust Indicators */}
                            <div className="trust-indicators">
                                <div className="trust-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>Licensed &amp; Insured</span>
                                </div>
                                <div className="trust-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>100% Satisfaction Guaranteed</span>
                                </div>
                                <div className="trust-item">
                                    <i className="fas fa-star"></i>
                                    <span>5.0 Rating • 200+ Happy Customers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-image">
                            <img src="/img/professional-cleaning-image.jpg" alt="Professional cleaning equipment" />
                        </div>
                        <div className="about-content">
                            <div className="section-badge">About Us</div>
                            <h2 className="section-title">Your Trusted Cleaning Partner Since 2025</h2>
                            <p className="section-text">
                                SK Perfect Cleaning Services has been providing exceptional cleaning solutions to homes and
                                businesses. We pride ourselves on attention to detail, reliability, and customer
                                satisfaction.
                            </p>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <div className="stat-number">500+</div>
                                    <div className="stat-label">Happy Clients</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">8+</div>
                                    <div className="stat-label">Years Experience</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">24/7</div>
                                    <div className="stat-label">Support</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">100%</div>
                                    <div className="stat-label">Satisfaction</div>
                                </div>
                            </div>
                            <div className="features-list">
                                <div className="feature-item">
                                    <i className="fas fa-check-circle"></i>
                                    <div>
                                        <h4>Eco-Friendly Products</h4>
                                        <p>We use environmentally safe cleaning products that are safe for your family and pets.</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <i className="fas fa-check-circle"></i>
                                    <div>
                                        <h4>Trained Professionals</h4>
                                        <p>Our team is fully trained, background-checked, and insured for your peace of mind.</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <i className="fas fa-check-circle"></i>
                                    <div>
                                        <h4>Flexible Scheduling</h4>
                                        <p>We work around your schedule with convenient booking options and reliable service.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Our Services</div>
                        <h2 className="section-title">Comprehensive Cleaning Solutions</h2>
                        <p className="section-text">
                            From retail stores to commercial spaces and homes, we offer a full range of professional cleaning
                            services tailored to your needs.
                        </p>
                    </div>
                    <div className="services-grid">
                        {/* Commercial Cleaning */}
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-building"></i>
                            </div>
                            <h3>Commercial Cleaning</h3>
                            <p>Professional office and commercial space cleaning for businesses of all sizes.</p>
                            <ul className="service-features">
                                <li><i className="fas fa-check-circle"></i> Office buildings</li>
                                <li><i className="fas fa-check-circle"></i> Retail stores</li>
                                <li><i className="fas fa-check-circle"></i> Schools & medical centers</li>
                                <li><i className="fas fa-check-circle"></i> Hotels & aged care facilities</li>
                            </ul>
                        </div>
                        {/* Office and Domestic Cleaning */}
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-home"></i>
                            </div>
                            <h3>Office &amp; Domestic Cleaning</h3>
                            <p>Flexible, personalised cleaning services for your home or office space.</p>
                            <ul className="service-features">
                                <li><i className="fas fa-check-circle"></i> Regular &amp; one-time cleans</li>
                                <li><i className="fas fa-check-circle"></i> Move-in/move-out service</li>
                                <li><i className="fas fa-check-circle"></i> Customisable schedules</li>
                                <li><i className="fas fa-check-circle"></i> Certified, trusted staff</li>
                            </ul>
                        </div>
                        {/* Shopping Centre & Retail Store Cleaning */}
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-shopping-cart"></i>
                            </div>
                            <h3>Shopping Centre &amp; Retail Cleaning</h3>
                            <p>Safe, efficient cleaning for malls, stores, and retail chains with a focus on health and
                                presentation.</p>
                            <ul className="service-features">
                                <li><i className="fas fa-check-circle"></i> Shopping centres &amp; outlets</li>
                                <li><i className="fas fa-check-circle"></i> Uniformed, trained staff</li>
                                <li><i className="fas fa-check-circle"></i> Equipment &amp; chemicals included</li>
                                <li><i className="fas fa-check-circle"></i> Health &amp; safety compliant</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <div className="testimonials">
                <h3 className="testimonials-title">What Our Customers Say</h3>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <p>{'"SK Perfect Cleaning transformed my home! Their attention to detail is incredible and the team is so professional."'}</p>
                        <div className="testimonial-author">Sarah Johnson</div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <p>{'"We have been using their commercial cleaning services for our office for over a year. Always reliable and thorough."'}</p>
                        <div className="testimonial-author">Mike Chen</div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <p>{'"The best cleaning service in town! They cleaned our space and they look brand new. Highly recommend!"'}</p>
                        <div className="testimonial-author">Emily Davis</div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <section id="contact" className="contact">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Contact Us</div>
                        <h2 className="section-title">Get In Touch Today</h2>
                        <p className="section-text">
                            Ready to experience the SK Perfect Cleaning difference? Contact us today for a free consultation and
                            quote.
                        </p>
                    </div>
                    <div className="contact-grid">
                        <div className="contact-info">
                            <div className="contact-cards">
                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div>
                                        <h4>Phone</h4>
                                        <p><a href="tel:0433700440" className="contact-link">0433700440</a></p>
                                    </div>
                                </div>
                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <p><a href="mailto:sagarkesi04@gmail.com" className="contact-link">sagarkesi04@gmail.com</a></p>
                                    </div>
                                </div>
                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div>
                                        <h4>Location</h4>
                                        <p>Unit 2, 17 Lyon street, Strathfield 2135 NSW</p>
                                    </div>
                                </div>
                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <i className="fas fa-clock"></i>
                                    </div>
                                    <div>
                                        <h4>Hours</h4>
                                        <p>Mon-Sat: 8AM-6PM</p>
                                    </div>
                                </div>
                            </div>
                            <div className="emergency-card">
                                <h4>Emergency Cleaning Services</h4>
                                <p>Need immediate cleaning assistance? We offer 24/7 emergency cleaning services for urgent
                                    situations.</p>
                                <a href="tel:5559998888" className="btn btn-emergency">Call Emergency Line: (555) 999-8888</a>
                            </div>
                        </div>
                        <div className="contact-form-wrapper">
                            <h3>Send Us a Message</h3>
                            <ContactForm />
                        </div>
                    </div>
                </div>
                <div className="map-section">
                    <h3 className="map-title">Find Us Here</h3>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.8234567890123!2d151.0876543!3d-33.8765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a123456789ab%3A0x123456789abcdef0!2s17%20Lyon%20St%2C%20Strathfield%20NSW%202135%2C%20Australia!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau"
                            width="100%" height="400" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade" title="SK Perfect Cleaning Services Location">
                        </iframe>
                    </div>
                    <div className="map-info">
                        <div className="map-address">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Our Location</h4>
                                <p>Unit 2, 17 Lyon Street<br />Strathfield NSW 2135<br />Australia</p>
                            </div>
                        </div>
                        <div className="map-directions">
                            <a href="https://www.google.com/maps/dir//Unit+2,+17+Lyon+Street,+Strathfield+NSW+2135,+Australia"
                                target="_blank" className="btn btn-primary">
                                <i className="fas fa-directions"></i>
                                Get Directions
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <div className="logo">
                                <div className="logo-icon">
                                    <img src="/img/logo_1.png" alt=" Sk Perfect Cleaning" className="logo-img" />
                                </div>
                            </div>
                            <p>Professional cleaning services you can trust. Making your space perfect, every time.</p>
                            <div className="social-links">
                                <a href="tel:0433700440" title="Call us"><i className="fas fa-phone"></i></a>
                                <a href="mailto:sagarkesi04@gmail.com" title="Email us"><i
                                    className="fas fa-envelope"></i></a>
                                <a href="https://maps.google.com/?q=Unit 2,17+Lyon+Street,Strathfield+2135+NSW" target="_blank" rel="noopener noreferrer"
                                    title="Find us on map"><i className="fas fa-map-marker-alt"></i></a>
                            </div>
                        </div>
                        <div className="footer-links">
                            <h4>Services</h4>
                            <ul>
                                <li>Residential Cleaning</li>
                                <li>Commercial Cleaning</li>
                                <li>Shopping Malls and Retail stores Cleaning</li>
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h4>Company</h4>
                            <ul>
                                <li>About Us</li>
                                <li>Our Team</li>
                                <li>Careers</li>
                                <li>Reviews</li>
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h4>Contact Info</h4>
                            <ul>
                                <li><a href="tel:0433700440" className="footer-contact-link">0433700440</a></li>
                                <li><a href="mailto:sagarkesi04@gmail.com"
                                    className="footer-contact-link">sagarkesi04@gmail.com</a></li>
                                <li>Unit 2, 17 lyon street, strathfield 2135 NSW</li>
                                <li>Mon-Sat: 8AM-6PM</li>
                            </ul>
                        </div>
                    </div>
                    <div className=" footer-bottom">
                        <p>&copy; 2024 SK Perfect Cleaning Services. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Modals */}
            <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
            <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
        </>
    )
}
