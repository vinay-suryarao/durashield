"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Complete PPF Category & Product Types Database
const categoryData: Record<
  string,
  {
    title: string;
    tagline: string;
    technology: string;
    types: Array<{
      name: string;
      placeholderText: string;
      specifications: {
        thickness: string;
        warranty: string;
        healing: string;
        gloss: string;
      };
      bestSuited: string;
      pricingTier: number;
    }>;
  }
> = {
  standard: {
    title: "Standard Shield Options",
    tagline: "Essential Rock Chip & Scratch Defense",
    technology: "Our Standard Shield uses high-tensile aliphatic polyurethane to provide a tough barrier against impact. While budget-friendly, it incorporates a clear topcoat that prevents paint staining and matches the glossy texture of factory paints, ensuring your vehicle remains guarded against daily roadway abrasions.",
    types: [
      {
        name: "Classic Clear",
        placeholderText: "[Image Placeholder: Front bumper of a white daily driver showing near-invisible edges of Classic Clear film, under clean daylight]",
        specifications: {
          thickness: "7.2 Mils",
          warranty: "5 Years Limited Warranty",
          healing: "Heat-Activated (Requires warm water or heat gun at 60°C)",
          gloss: "High Gloss Reflective Finish"
        },
        bestSuited: "Commuter vehicles, highway daily drivers, and leased cars seeking reliable protection against gravel and minor abrasions at an affordable price.",
        pricingTier: 2
      },
      {
        name: "Lite Guard",
        placeholderText: "[Image Placeholder: Close-up of car mirrors and door cups wrapped in Lite Guard, preventing key scrapes and stone chips]",
        specifications: {
          thickness: "6.8 Mils",
          warranty: "3 Years Entry-Level Warranty",
          healing: "Standard Heat Healing",
          gloss: "Standard Factory Gloss Match"
        },
        bestSuited: "Short-term leases, partial-front installations, and owners looking for a budget-friendly shield against minor abrasions.",
        pricingTier: 1
      }
    ]
  },
  premium: {
    title: "Premium Guard Options",
    tagline: "Advanced Self-Healing Paint Armor",
    technology: "Engineered with advanced elastomeric polymers, Premium Guard is our flagship film. It automatically heals swirl marks and light scratches with ambient heat or sunlight. Its advanced hydrophobic topcoat repels water, dirt, and oil, maintaining a deep, mirror-like gloss and preventing yellowing over time.",
    types: [
      {
        name: "Ultra-Gloss Clear",
        placeholderText: "[Image Placeholder: Close-up of a high-end black sports car hood, reflecting bright neon ceiling bars with zero distortion, showing depth of gloss]",
        specifications: {
          thickness: "8.0 Mils",
          warranty: "10 Years Premium Warranty",
          healing: "Rapid Self-Healing (Minutes in direct sunlight or warm water)",
          gloss: ">95% Gloss Reflection Factor (Mirror Clarity)"
        },
        bestSuited: "Luxury sedans, sports cars, and collector vehicles with dark, metallic, or rich solid paint where gloss depth and absolute clarity are paramount.",
        pricingTier: 3
      },
      {
        name: "Hydro-Shield Pro",
        placeholderText: "[Image Placeholder: Detailed macro-shot of a car fender with water beads in perfect circles, sliding off the surface leaving no water spots]",
        specifications: {
          thickness: "8.5 Mils",
          warranty: "12 Years Premium Warranty",
          healing: "Instant Self-Healing (ambient temperature scratch recovery)",
          gloss: "Deep Gloss with Integrated Ceramic-Hydrophobic Topcoat"
        },
        bestSuited: "Daily driven luxury SUVs, electric vehicles, and cars in harsh weather regions exposed to rain, winter road salts, and chemical pollutants.",
        pricingTier: 4
      }
    ]
  },
  specialty: {
    title: "Specialty Armor Options",
    tagline: "Custom Finishes & High-Velocity Protection",
    technology: "Specialty Armor is designed for drivers seeking custom aesthetics or track-ready durability. Whether transforming gloss paint into a sleek satin-matte finish, adding colored protection, or installing ultra-thick track shields, this line delivers the peak of performance and customization.",
    types: [
      {
        name: "Satin Matte Conversion",
        placeholderText: "[Image Placeholder: Side profile of a dark grey sports car with sharp body lines, showing a smooth satin matte texture that diffuses reflections]",
        specifications: {
          thickness: "8.2 Mils",
          warranty: "10 Years Premium Warranty",
          healing: "Heat-Activated Self-Healing (maintains uniform matte texture)",
          gloss: "Deep Satin Matte Finish (Transforms gloss to satin)"
        },
        bestSuited: "Enthusiasts wanting a custom satin/matte look without the extreme maintenance and vulnerability of matte factory paint.",
        pricingTier: 4
      },
      {
        name: "Color-Shift Armor",
        placeholderText: "[Image Placeholder: Curved quarter-panel of an exotic car shifting color from purple to green, wrapped in high-gloss colored PPF]",
        specifications: {
          thickness: "8.0 Mils",
          warranty: "7 Years Specialty Warranty",
          healing: "High-Temperature Self-Healing",
          gloss: "Color-Changing Iridescent Gloss Finish"
        },
        bestSuited: "Owners who want to completely change their vehicle's color while gaining the heavy-duty paint protection of traditional clear PPF.",
        pricingTier: 4
      },
      {
        name: "Track-Day Heavy-Duty",
        placeholderText: "[Image Placeholder: Race-track prepped sports car front end, highlighting an extra-thick protective film layer designed for high-velocity track debris]",
        specifications: {
          thickness: "10.0 Mils",
          warranty: "7 Years Heavy-Duty Warranty",
          healing: "Heavy Thermal Self-Healing",
          gloss: "High-Gloss Heavy Impact Shield"
        },
        bestSuited: "Track-day enthusiasts, high-velocity sports cars, and off-road vehicles requiring maximum impact and abrasion resistance.",
        pricingTier: 4
      }
    ]
  }
};

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "premium"; // Default fallback to premium as requested

  // Get active category data or fallback
  const category = categoryData[slug];
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  // Dynamically update document title for SEO on client side
  useEffect(() => {
    if (category) {
      document.title = `${category.title} - Durashield Paint Protection Film`;
    }
  }, [category]);

  // Handle case where category does not exist
  if (!category) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Anton, sans-serif" }}>
          Category Not Found
        </h2>
        <p className="text-[#e2bfb2] mb-8">
          The Paint Protection Film tier you are looking for does not exist or has been moved.
        </p>
        <Link href="/products" className="nav-button">
          ← Back to All PPF Categories
        </Link>
      </div>
    );
  }

  const activeProduct = category.types[activeTypeIndex] || category.types[0];

  return (
    <div className="py-12">
      {/* Dynamic Header Section */}
      <section className="mb-12">
        <div className="mb-6">
          <Link href="/products" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#ffb599] border border-[#ffb599]/30 hover:border-[#ffb599] hover:bg-[#ffb599]/10 px-3 py-1.5 rounded-full transition-all duration-200">
            ← Back to All Categories
          </Link>
        </div>
        <div className="border-b border-[#2d3449] pb-8">
          <span className="text-xs uppercase tracking-widest text-[#FB923C] font-semibold mb-2 inline-block">
            {category.tagline}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase mb-4 text-[#dae2fd]" style={{ fontFamily: "Anton, sans-serif", letterSpacing: "0.03em" }}>
            {category.title}
          </h1>
        </div>
      </section>

      {/* Interactive Type Selector Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vertical Interactive Menu */}
        <div className="lg:col-span-4">
          <h3 className="text-xs uppercase tracking-widest text-[#e2bfb2]/60 font-semibold mb-4">
            Select Product Type
          </h3>
          <div className="interactive-menu-container">
            {category.types.map((type, idx) => (
              <button
                key={type.name}
                onClick={() => setActiveTypeIndex(idx)}
                className={`interactive-tab-btn ${idx === activeTypeIndex ? "active" : ""
                  }`}
              >
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Content Update */}
        <div className="lg:col-span-8 bg-[#171f33]/40 border border-[#2d3449] rounded-2xl p-6 md:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left of details: Dynamic Image Placeholder */}
            <div>
              <div className="image-placeholder-box mb-4 min-h-[300px]">
                <div className="placeholder-badge">Active Product Display</div>
              </div>
            </div>

            {/* Right of details: Specifications & Content */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#dae2fd] mt-1 mb-4">
                  {activeProduct.name}
                </h2>

                {/* Key Specifications Grid */}
                <div className="spec-grid">
                  <div className="spec-card">
                    <div className="spec-label">Thickness</div>
                    <div className="spec-value">{activeProduct.specifications.thickness}</div>
                  </div>
                  <div className="spec-card">
                    <div className="spec-label">Warranty</div>
                    <div className="spec-value">{activeProduct.specifications.warranty}</div>
                  </div>
                  <div className="spec-card">
                    <div className="spec-label">Self-Healing</div>
                    <div className="spec-value">{activeProduct.specifications.healing}</div>
                  </div>
                  <div className="spec-card">
                    <div className="spec-label">Gloss / Finish</div>
                    <div className="spec-value">{activeProduct.specifications.gloss}</div>
                  </div>
                </div>

                {/* Best Suited For */}
                <div className="mb-6">
                  <div className="text-xs uppercase text-[#e2bfb2]/60 tracking-wider mb-2 font-semibold">
                    Best Suited For
                  </div>
                  <p className="text-sm text-[#e2bfb2] leading-relaxed">
                    {activeProduct.bestSuited}
                  </p>
                </div>
              </div>

              {/* Pricing Tier & CTA */}
              <div className="border-t border-[#2d3449] pt-4 mt-4">
                <Link
                  href="/booking"
                  className="quote-btn"
                >
                  Get a Custom Quote for Your Car
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}