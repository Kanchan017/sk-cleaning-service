"use client"

import { useState, useEffect } from "react"

interface BookingModalProps {
    isOpen: boolean
    onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        message: "",
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                service: "",
                date: "",
                message: "",
            })
            setErrorMessage("")
            setSuccessMessage("")
        }
    }, [isOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrorMessage("")
        setSuccessMessage("")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage("")
        setSuccessMessage("")

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, formType: "Booking Request" }),
            })

            if (response.ok) {
                setSuccessMessage("Booking request submitted! We will contact you shortly to confirm.")

            } else {
                setErrorMessage("Failed to submit booking. Please try again later.")
            }
        } catch (error) {
            console.error("Error submitting booking form:", error)
            setErrorMessage("An error occurred. Please try again.")
        }
        // clear form data after submission
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            service: "",
            date: "",
            message: "",
        })
        // close 
        setTimeout(() => {
            onClose()
        }, 2000) // close modal after 2 seconds
    }

    if (!isOpen) return null

    return (
        <div className={`modal ${isOpen ? "active" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Book Your Cleaning Service</h3>
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <p>Fill out the form below and we'll contact you to confirm your booking.</p>
                    <form className="modal-form" onSubmit={handleSubmit}>
                        {/* Form fields */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="bookingFirstName">First Name</label>
                                <input type="text" id="bookingFirstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bookingLastName">Last Name</label>
                                <input type="text" id="bookingLastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bookingEmail">Email</label>
                            <input type="email" id="bookingEmail" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bookingPhone">Phone</label>
                            <input type="tel" id="bookingPhone" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bookingService">Service Type</label>
                            <select id="bookingService" name="service" value={formData.service} onChange={handleChange} required>
                                <option value="">Select a service</option>
                                <option value="residential">Residential Cleaning</option>
                                <option value="commercial">Commercial Cleaning</option>
                                <option value="shopping">Shopping Centre & Retail Store</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bookingDate">Preferred Date</label>
                            <input type="date" id="bookingDate" name="date" value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bookingMessage">Additional Details</label>
                            <textarea id="bookingMessage" name="message" placeholder="Tell us about your cleaning needs..." value={formData.message} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-full">
                            Submit Booking Request
                        </button>

                        {/* Inline error and success messages */}
                        {errorMessage && <p role="alert" className="form-message error">{errorMessage}</p>}
                        {successMessage && <p role="alert" className="form-message success">{successMessage}</p>}



                    </form>
                </div>
            </div>
        </div >
    )
}
