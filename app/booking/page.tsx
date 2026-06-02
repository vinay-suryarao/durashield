"use client";

import { useState } from "react";
import "./style.css";

interface BookingData {
  fullName: string;
  phone: string;
  carModel: string;
  product: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingData>({
    fullName: "",
    phone: "",
    carModel: "",
    product: "",
    preferredDate: "",
    preferredTime: "",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    setSubmitted(true);
    setFormData({
      fullName: "",
      phone: "",
      carModel: "",
      product: "",
      preferredDate: "",
      preferredTime: "",
      notes: ""
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="booking-page-wrapper">
      {/* Ambient Glow Background */}
      <div className="ambient-glow">
        <div className="glow-element glow-top-right"></div>
        <div className="glow-element glow-bottom-left"></div>
      </div>

      {/* Main Content */}
      <main className="booking-main-content">
        {/* Booking Form Glass Card */}
        <section className="booking-form-section">
          <div className="booking-form-container">
            {submitted ? (
              <div className="booking-success-message">
                <div className="success-icon">✓</div>
                <h3>Booking Confirmed!</h3>
                <p>We've received your booking request. Our team will contact you shortly to confirm the details.</p>
              </div>
            ) : (
              <>
                <div className="form-header">
                  <div className="booking-badge">BOOK APPOINTMENT</div>
                  <h1 className="booking-hero-title">Reserve your slot in less than a minute</h1>
                </div>
                <form onSubmit={handleSubmit} className="booking-form">
                {/* Personal Info Grid */}
                <div className="form-grid form-grid-2">
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                      className="form-input"
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      className="form-input"
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Vehicle & Product Grid */}
                <div className="form-grid form-grid-2">
                  <div className="form-group">
                    <label htmlFor="carModel" className="form-label">Car Model</label>
                    <input
                      className="form-input"
                      id="carModel"
                      name="carModel"
                      type="text"
                      placeholder="Ex: Hyundai Creta"
                      value={formData.carModel}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product" className="form-label">Product Interested</label>
                    <select 
                      className="form-input form-select"
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select product</option>
                      <option value="ceramic">Premium Ceramic Film</option>
                      <option value="carbon">Carbon Shield</option>
                      <option value="standard">Standard Dyed</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time Grid */}
                <div className="form-grid form-grid-2">
                  <div className="form-group">
                    <label htmlFor="preferredDate" className="form-label">Preferred Date</label>
                    <input
                      className="form-input form-date"
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="preferredTime" className="form-label">Preferred Time</label>
                    <select 
                      className="form-input form-select"
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select time slot</option>
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                      <option value="evening">Evening (4 PM - 7 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="form-group">
                  <label htmlFor="notes" className="form-label">Additional Notes</label>
                  <textarea
                    className="form-input form-textarea"
                    id="notes"
                    name="notes"
                    placeholder="Any specific requirement for tint level or heat rejection"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="booking-submit-btn">
                  Confirm Booking
                </button>
              </form>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
