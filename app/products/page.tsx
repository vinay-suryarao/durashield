import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Paint Protection Film (PPF) Categories - Durashield",
  description: "Explore Durashield's premium Paint Protection Film (PPF) tiers. From essential scratch defense to self-healing hydrophobic wraps and custom matte finishes.",
};

const categories = [
  {
    id: "standard",
    title: "Standard Shield",
    subtitle: "Essential Daily Protection",
    description: "Budget-friendly, high-durability protection against daily road debris, gravel, and minor scratches. Designed for the pragmatic daily driver.",
    startingPrice: "$1,200",
    slug: "standard",
    placeholderText: "[Image Placeholder: Front bumper of a clean silver sedan in a modern garage, showcasing precise edges and essential protection]",
    pricingTier: 2, // $$ out of $$$$
  },
  {
    id: "premium",
    title: "Premium Guard",
    subtitle: "Advanced Self-Healing Armor",
    description: "Our flagship elastomeric film. Automatically heals swirls under sun or heat, repels water and grime, and delivers an unmatched depth of gloss.",
    startingPrice: "$2,500",
    slug: "premium",
    placeholderText: "[Image Placeholder: Close-up of a deep-black luxury sedan bonnet with water beads rolling off, reflecting neon light panels]",
    pricingTier: 3, // $$$ out of $$$$
  },
  {
    id: "specialty",
    title: "Specialty Armor",
    subtitle: "Matte, Color & Track Performance",
    description: "Transform your paint with premium matte/satin conversions, colored PPF, or extra-thick track-day wraps engineered for maximum impact defense.",
    startingPrice: "$3,800",
    slug: "specialty",
    placeholderText: "[Image Placeholder: A satin grey high-performance sports car with sharp lines, highlighting a smooth matte finish]",
    pricingTier: 4, // $$$$ out of $$$$
  },
];

export default function ProductsPage() {
  return (
    <div className="py-12">
      {/* Grid Layout Section */}
      <section id="categories-grid" className="mb-16 py-8 md:py-12">
        {/* Header */}
        <div className="mb-10 pb-8 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase text-[#dae2fd] tracking-wide text-center" style={{ fontFamily: "Anton, sans-serif" }}>
            Select Your Level of Shielding
          </h2>
          <p className="text-sm md:text-base text-[#e2bfb2] mt-3 max-w-2xl mx-auto" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Explore our premium range of Paint Protection Films.
          </p>
        </div>

        {/* Nested cards inside the parent box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl p-6 flex flex-col justify-between bg-[#060e20]/60 border border-[#2d3449]/50 hover:border-[#ffb599]/30 transition-all hover:scale-[1.01]"
            >
              <div>
                {/* Image Placeholder Box */}
                <div className="image-placeholder-box mb-6 h-48 bg-[#0b1326]/80 border-dashed border-[#2d3449]">
                  <div className="placeholder-badge">Visual Draft</div>
                </div>

                <div className="mb-4">
                  <span className="text-xs uppercase tracking-wider text-[#e2bfb2]/70 font-semibold">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold mt-1 text-[#dae2fd]">
                    {cat.title}
                  </h3>
                </div>

                <p className="text-sm text-[#e2bfb2] leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div>
                <Link
                  href={`/products/${cat.slug}`}
                  className="w-full text-center py-3 px-4 rounded-lg bg-gradient-to-r from-[#FB923C] to-[#EA580C] text-[#0b1326] hover:shadow-lg hover:shadow-[#EA580C]/25 transition-all font-bold text-sm flex items-center justify-center gap-2"
                >
                  Explore {cat.title} Options <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}