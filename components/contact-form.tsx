"use client"

import { useState } from "react"

export function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrorMessage("")       // Clear error when user types again
        setSuccessMessage("")     // Clear success on input change
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage("")
        setSuccessMessage("")

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, formType: "Contact Form" }),
            })

            if (response.ok) {
                setSuccessMessage(
                    "Thank you for your message! We will get back to you soon."
                )
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                })
            } else {
                setErrorMessage("Failed to send message. Please try again later.")
            }
        } catch (error: unknown) {
            console.error("Error submitting contact form:", error)
            setErrorMessage("An error occurred. Please try again.")
        }
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                >
                    <option value="">Select a subject</option>
                    <option value="quote">Request Quote</option>
                    <option value="booking">Book Service</option>
                    <option value="question">General Question</option>
                    <option value="complaint">Complaint</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
                Send Message
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
    )
}
