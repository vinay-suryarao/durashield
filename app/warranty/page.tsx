
"use client";

import { useState, useRef, useEffect } from "react";
import imageCompression from "browser-image-compression";
import "./style.css";

interface WarrantyFormData {
  name: string;
  phone: string;
  email: string;
  vehicleNumber: string;
  vehicleName: string;
  city: string;
  warrantyNo: string;
  dealerName: string;
  dealerLocation: string;
}

interface PhotoUploadProps {
  label: string;
  description: string;
  onPhotoCompressed: (base64: string | null) => void;
  disabled?: boolean;
}

function PhotoUpload({ label, description, onPhotoCompressed, disabled }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const processFile = async (file: File) => {
    setCompressing(true);

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(file, options);
      const sizeInKB = Math.round(compressedBlob.size / 1024);
      setSize(sizeInKB);

      const reader = new FileReader();
      reader.readAsDataURL(compressedBlob);
      reader.onloadend = () => {
        const fullDataUrl = reader.result as string;
        setPreview(fullDataUrl);
        const cleanBase64 = fullDataUrl.split(",")[1];
        onPhotoCompressed(cleanBase64);
      };

    } catch (err) {
      console.error("Compression crash:", err);
      alert("Failed to compress and format selected file.");
    } finally {
      setCompressing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      cameraInputRef.current?.click();
      return;
    }

    try {
      setIsCameraOpen(true);
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false
        });
      } catch (firstErr) {
        console.warn("Failed to get environment camera, trying any video input:", firstErr);
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera, falling back:", err);
      setIsCameraOpen(false);
      cameraInputRef.current?.click();
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
          await processFile(file);
        }
      }, "image/jpeg", 0.9);
    }
    stopCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const removePhoto = () => {
    setPreview(null);
    setSize(null);
    onPhotoCompressed(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <div className="photo-upload-card">
      <div className="form-label">{label}</div>
      <p style={{ fontSize: "12px", color: "var(--muted)", margin: "0 0 10px 0" }}>{description}</p>

      <div className="photo-upload-zone">
        {compressing ? (
          <div className="compression-loader">
            <div className="spinner"></div>
            <span>Compressing Image...</span>
          </div>
        ) : isCameraOpen ? (
          <div className="camera-preview-container">
            <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
            <div className="camera-controls">
              <button type="button" className="camera-btn capture-btn" onClick={capturePhoto}>
                📷 Capture
              </button>
              <button type="button" className="camera-btn cancel-btn" onClick={stopCamera}>
                ✕ Close
              </button>
            </div>
          </div>
        ) : preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="upload-preview" />
            <div className="preview-overlay">
              <button type="button" className="remove-photo-btn" onClick={removePhoto} disabled={disabled}>
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-actions">
            <button type="button" className="upload-action-btn" onClick={startCamera} disabled={disabled}>
              📷 Take Photo
            </button>
            <label className={`upload-action-btn ${disabled ? "disabled" : ""}`} style={{ pointerEvents: disabled ? "none" : "auto" }}>
              📁 Upload Gallery
              <input ref={fileInputRef} type="file" style={{ display: "none" }} accept="image/*" onChange={handleFileChange} disabled={disabled} />
            </label>
          </div>
        )}
      </div>

      <input ref={cameraInputRef} type="file" style={{ display: "none" }} accept="image/*" capture="environment" onChange={handleFileChange} disabled={disabled} />
    </div>
  );
}

export default function WarrantyPage() {
  const [formData, setFormData] = useState<WarrantyFormData>({
    name: "",
    phone: "",
    email: "",
    vehicleNumber: "",
    vehicleName: "",
    city: "",
    warrantyNo: "DS-",
    dealerName: "",
    dealerLocation: ""
  });

  const [invoiceFile, setInvoiceFile] = useState<string | null>(null);
  const [vehicleFile, setVehicleFile] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [warrantyMessage, setWarrantyMessage] = useState("");
  const [successInfo, setSuccessInfo] = useState<{ warrantyNo: string } | null>(null);

  // 🛑 NAYA HANDLE CHANGE LOGIC YAHAN HAI
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "warrantyNo") {
      const upperValue = value.toUpperCase();
      // Agar user DS- ko delete karne ki koshish kare
      if (!upperValue.startsWith("DS-")) {
        setFormData((prev) => ({ ...prev, [name]: "DS-" }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: upperValue }));
      }
      setIsValidated(false);
      setWarrantyMessage("");
      return; 
    }

    // Baaki fields ke liye (Email chhod kar sab Uppercase)
    const processedValue = name === "email" ? value : value.toUpperCase();
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleWarrantyVerification = async () => {
    if (!formData.warrantyNo.trim() || formData.warrantyNo === "DS-") return;
    setIsSubmitting(true);
    setWarrantyMessage("Checking registration logs across system storage...");

    try {
      const response = await fetch("/api/warranty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check_duplicate", warrantyNo: formData.warrantyNo })
      });
      const result = await response.json();

      if (result.exists) {
        setIsValidated(false);
        setWarrantyMessage("❌ Registration Aborted: This Warranty Number is Already Registered!");
      } else {
        setIsValidated(true);
        setWarrantyMessage("✅ Code Verified: Unique identity clear. Please fill out details below.");
      }
    } catch (err) {
      setWarrantyMessage("❌ Error verifying identity database records.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidated) {
      setStatusMessage("❌ Error: Resolve duplication validations before confirming activation.");
      return;
    }
    if (!invoiceFile || !vehicleFile) {
      setStatusMessage("❌ Error: Please provide both Front and Rear side photos.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("Transmitting verified data streams to private Workspace infrastructure...");

    try {
      const response = await fetch("/api/warranty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register_warranty",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          warrantyNo: formData.warrantyNo,
          vehicleNumber: formData.vehicleNumber,
          vehicleName: formData.vehicleName,
          city: formData.city,
          dealerName: formData.dealerName,
          dealerLocation: formData.dealerLocation,
          invoiceFile,
          vehicleFile
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Warranty entry stream rejected by remote cloud engine.");
      }

      setSuccessInfo({ warrantyNo: result.warrantyNo });
      setFormData({ name: "", phone: "", email: "", vehicleNumber: "", vehicleName: "", city: "", warrantyNo: "DS-", dealerName: "", dealerLocation: "" });
      setInvoiceFile(null);
      setVehicleFile(null);
      setIsValidated(false);
      setStatusMessage("");
      setWarrantyMessage("");
    } catch (err) {
      setStatusMessage(err instanceof Error ? `❌ ${err.message}` : "❌ Gateway connection failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successInfo) {
    return (
      <div className="warranty-page-wrapper">
        <main className="warranty-main-content">
          <section className="warranty-form-container" style={{ textAlign: "center", padding: "40px" }}>
            <span className="success-icon" style={{ fontSize: "3.5rem", color: "#10b981" }}>✓</span>
            <h2 className="success-title" style={{ marginTop: "16px" }}>Warranty Registered!</h2>
            <p className="success-text" style={{ margin: "16px 0 30px 0" }}>
              Your product warranty application has been processed seamlessly and recorded into cloud database layers.
            </p>
            <div style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "8px", textAlign: "center", margin: "20px 0", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p style={{ margin: "0" }}><strong>WARRANTY ID:</strong> <span style={{ fontFamily: "monospace", color: "#60a5fa" }}>{successInfo.warrantyNo}</span></p>
            </div>
            <button type="button" className="submit-btn" onClick={() => setSuccessInfo(null)} style={{ maxWidth: "200px", margin: "24px auto 0 auto", display: "block" }}>
              Register Another
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="warranty-page-wrapper">
      <main className="warranty-main-content">
        <section className="warranty-form-container">
          <div className="form-header">
            <span className="warranty-badge">Secure Cloud Registry</span>
            <h1 className="warranty-hero-title">Durashield Product Warranty</h1>
            <p className="warranty-hero-desc">Fill in your certificate details below to unlock system activation features.</p>
          </div>

          <form onSubmit={handleSubmit} className="warranty-form">
            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label htmlFor="warrantyNo" className="form-label" style={{ fontWeight: "bold" }}>Warranty Number *</label>
              <input id="warrantyNo" name="warrantyNo" type="text" className="form-input" placeholder="Ex: DS-XXXXX" value={formData.warrantyNo} onChange={handleChange} onBlur={handleWarrantyVerification} required disabled={isSubmitting} style={{ borderColor: isValidated ? "#10b981" : "", textTransform: "uppercase" }} />
              {warrantyMessage && (
                <div style={{ marginTop: "8px", padding: "8px 12px", backgroundColor: warrantyMessage.includes("✅") ? "rgba(16, 185, 129, 0.1)" : warrantyMessage.includes("❌") ? "rgba(239, 68, 68, 0.1)" : "rgba(255, 255, 255, 0.05)", color: warrantyMessage.includes("✅") ? "#10b981" : warrantyMessage.includes("❌") ? "#fca5a5" : "#9ca3af", fontSize: "0.85rem", borderRadius: "6px", fontWeight: "600", border: warrantyMessage.includes("✅") ? "1px solid rgba(16, 185, 129, 0.2)" : warrantyMessage.includes("❌") ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid rgba(255, 255, 255, 0.1)" }}>
                  {warrantyMessage}
                </div>
              )}
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Customer Name *</label>
                <input id="name" name="name" type="text" className="form-input" placeholder="Enter full name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} style={{ textTransform: "uppercase" }} />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Mobile Number *</label>
                <input id="phone" name="phone" type="tel" className="form-input" placeholder="Enter 10-digit number" value={formData.phone} onChange={handleChange} pattern="[0-9]{10}" required disabled={isSubmitting} style={{ textTransform: "uppercase" }} />
              </div>
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input id="email" name="email" type="email" className="form-input" placeholder="Enter email address" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <label htmlFor="city" className="form-label">City *</label>
                <input id="city" name="city" type="text" className="form-input" placeholder="Enter city" value={formData.city} onChange={handleChange} required disabled={isSubmitting} style={{ textTransform: "uppercase" }} />
              </div>
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label htmlFor="dealerName" className="form-label">Dealer Name *</label>
                <input id="dealerName" name="dealerName" type="text" className="form-input" placeholder="Enter dealer name" value={formData.dealerName} onChange={handleChange} required disabled={isSubmitting} style={{ textTransform: "uppercase" }} />
              </div>
              <div className="form-group">
                <label htmlFor="dealerLocation" className="form-label">Dealer Location *</label>
                <input id="dealerLocation" name="dealerLocation" type="text" className="form-input" placeholder="Enter dealer location" value={formData.dealerLocation} onChange={handleChange} required disabled={isSubmitting} style={{ textTransform: "uppercase" }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label htmlFor="vehicleNumber" className="form-label">Vehicle Number *</label>
              <input id="vehicleNumber" name="vehicleNumber" type="text" className="form-input" placeholder="Ex: MH-12-AB-1234" value={formData.vehicleNumber} onChange={handleChange} required disabled={isSubmitting} style={{ textTransform: "uppercase" }} />
            </div>

            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label htmlFor="vehicleName" className="form-label">Vehicle Name (Model) *</label>
              <input id="vehicleName" name="vehicleName" type="text" className="form-input" placeholder="Ex: Swift, Fortuner, i20" value={formData.vehicleName} onChange={handleChange} required disabled={isSubmitting} style={{ textTransform: "uppercase" }} />
            </div>

            <div className="photo-upload-grid">
              <PhotoUpload label="Vehicle Front Side *" description="Upload a photo showing the front side of the vehicle." onPhotoCompressed={setInvoiceFile} disabled={isSubmitting} />
              <PhotoUpload label="Vehicle Rear Side *" description="Upload a photo showing the rear side of the vehicle." onPhotoCompressed={setVehicleFile} disabled={isSubmitting} />
            </div>

            <button type="submit" className="submit-btn" disabled={!isValidated || isSubmitting} style={{ marginTop: "20px" }}>
              {isSubmitting ? "Submitting..." : "Submit Warranty Registration"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
