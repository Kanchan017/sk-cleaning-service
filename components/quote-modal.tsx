"use client"

import { useState, useEffect } from "react"

interface QuoteModalProps {
    isOpen: boolean
    onClose: () => void
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        service: "",
        size: "",
        frequency: "",
        details: "",
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                service: "",
                size: "",
                frequency: "",
                details: "",
            })
            setErrorMessage("")
            setSuccessMessage("")
        }
    }, [isOpen])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
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
                body: JSON.stringify({
                    ...formData,
                    size: formData.size ? Number(formData.size) : null,
                    formType: "Quote Request",
                }),
            })

            if (response.ok) {
                setSuccessMessage(
                    "Quote request submitted! We will send you a detailed quote within 24 hours."
                )
                // Keep the modal open for 2 seconds so user can see the success message
                setTimeout(() => onClose(), 2000)
            } else {
                setErrorMessage("Failed to submit quote. Please try again later.")
            }
        } catch (error: unknown) {
            console.error("Error submitting quote form:", error)
            setErrorMessage("An error occurred. Please try again.")
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h3 id="quoteModalTitle">Get Your Free Quote</h3>
                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <p>Tell us about your cleaning needs and we'll provide a detailed quote.</p>
                    <form className="modal-form" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="form-group">
                            <label htmlFor="quoteName">Full Name</label>
                            <input
                                type="text"
                                id="quoteName"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="quoteEmail">Email</label>
                            <input
                                type="email"
                                id="quoteEmail"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="form-group">
                            <label htmlFor="quotePhone">Phone</label>
                            <input
                                type="tel"
                                id="quotePhone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Address */}
                        <div className="form-group">
                            <label htmlFor="quoteAddress">Property Address</label>
                            <input
                                type="text"
                                id="quoteAddress"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Service Type */}
                        <div className="form-group">
                            <label htmlFor="quoteService">Service Type</label>
                            <select
                                id="quoteService"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a service</option>
                                <option value="residential">Residential Cleaning</option>
                                <option value="commercial">Commercial Cleaning</option>
                                <option value="shopping">
                                    Shopping Centre & Retail Cleaning
                                </option>
                            </select>
                        </div>

                        {/* Property Size */}
                        <div className="form-group">
                            <label htmlFor="quoteSize">Property Size (sq ft)</label>
                            <input
                                type="number"
                                id="quoteSize"
                                name="size"
                                placeholder="e.g., 2000"
                                value={formData.size}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Cleaning Frequency */}
                        <div className="form-group">
                            <label htmlFor="quoteFrequency">Cleaning Frequency</label>
                            <select
                                id="quoteFrequency"
                                name="frequency"
                                value={formData.frequency}
                                onChange={handleChange}
                            >
                                <option value="">Select frequency</option>
                                <option value="one-time">One-time</option>
                                <option value="weekly">Weekly</option>
                                <option value="bi-weekly">Bi-weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>

                        {/* Additional Details */}
                        <div className="form-group">
                            <label htmlFor="quoteDetails">Additional Details</label>
                            <textarea
                                id="quoteDetails"
                                name="details"
                                placeholder="Describe your specific cleaning needs..."
                                value={formData.details}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary btn-full">
                            Request Quote
                        </button>

                        {/* Inline messages */}
                        {errorMessage && (
                            <p role="alert" className="form-message error">
                                {errorMessage}
                            </p>
                        )}
                        {successMessage && (
                            <p role="alert" className="form-message success">
                                {successMessage}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}
