"use client";

import { useEffect, useRef } from "react";
import "./style.css";

export default function BeforeAfterPage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const updateSlider = (clientX: number) => {
    const slider = sliderRef.current;
    const afterImg = afterImgRef.current;
    const sliderLine = lineRef.current;
    const sliderHandle = handleRef.current;
    
    if (!slider || !afterImg || !sliderLine || !sliderHandle) return;

    const rect = slider.getBoundingClientRect();
    if (rect.width === 0) return;

    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));

    const percent = (x / rect.width) * 100;
    const w = rect.width;
    const h = rect.height;

    const topX = x + h / 2;
    const bottomX = x - h / 2;

    const topPercent = (topX / w) * 100;
    const bottomPercent = (bottomX / w) * 100;

    afterImg.style.clipPath = `polygon(100% 0, 100% 100%, ${bottomPercent}% 100%, ${topPercent}% 0)`;
    sliderLine.style.left = `${percent}%`;
    sliderHandle.style.left = `${percent}%`;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    updateSlider(e.clientX);
    
    // Optional: capture pointer to prevent losing drag if cursor leaves window fast
    e.currentTarget.releasePointerCapture(e.pointerId); 
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDraggingRef.current) updateSlider(e.clientX);
    };
    
    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    // Initial position at 50%
    if (sliderRef.current) {
      const initialX = sliderRef.current.getBoundingClientRect().left + sliderRef.current.offsetWidth / 2;
      updateSlider(initialX);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  return (
    <div className="ba-page">
      <div className="ba-container">
        {/* Hero Header */}
        <section className="ba-hero">
          <div className="ba-eyebrow-wrapper">
            <span className="ba-eyebrow">REAL WORK</span>
            <div className="ba-eyebrow-line"></div>
          </div>
          <h1 className="ba-title">Before / After Paint Protection Film Results</h1>
          <p className="ba-subtitle">
            Drag the center slider left or right to compare how a vehicle looks
            before and after our paint protection film application.
          </p>
        </section>

        {/* Showcase Card */}
        <section className="ba-showcase">
        <div className="ba-showcase-header">
          <h2>Car Transformation 01</h2>
          <p>
            Real installation example from our workshop. Drag the slider
            to compare the before and after results.
          </p>
        </div>

        {/* Diagonal Slider */}
        <div 
          className="ba-slider" 
          ref={sliderRef}
          onPointerDown={handlePointerDown}
        >
          {/* Before image — underneath */}
          <img
            className="ba-img ba-img-before"
            src="/before-after/before.jpg"
            alt="Car before paint protection film showing clear unprotected surface."
            draggable={false}
          />
          {/* After image — on top, clipped by diagonal */}
          <img
            className="ba-img ba-img-after"
            ref={afterImgRef}
            src="/before-after/after.jpg"
            alt="Car after paint protection film showing high-gloss protected surface."
            draggable={false}
          />

          <div className="ba-line" ref={lineRef}></div>
          <div className="ba-handle" ref={handleRef}></div>

          <div className="ba-label ba-label-before">Before</div>
          <div className="ba-label ba-label-after">After</div>
        </div>
      </section>
      </div>
    </div>
  );
}
