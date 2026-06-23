"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Sparkles,
  Wrench,
  Droplet,
  ShieldAlert,
  FlaskConical,
  Sun,
  ShieldCheck,
  Flame,
  Hammer,
  Check,
  Maximize2,
  Heart,
  Eye,
  Clock,
  Shield
} from "lucide-react";
import { categories } from "../../../data/prodata";

// Helper function to return feature icons based on name matches
const getFeatureIcon = (featureName: string, className?: string) => {
  const name = featureName.toLowerCase();
  if (name.includes("self healing")) return <Heart className={className} />;
  if (name.includes("anti-yellowing")) return <ShieldAlert className={className} />;
  if (name.includes("gloss") || name.includes("matte")) return <Sparkles className={className} />;
  if (name.includes("hydrophobic")) return <Droplet className={className} />;
  if (name.includes("stain")) return <Shield className={className} />;
  if (name.includes("chemical")) return <FlaskConical className={className} />;
  if (name.includes("clarity")) return <Eye className={className} />;
  if (name.includes("mechanical")) return <ShieldCheck className={className} />;
  if (name.includes("stretch")) return <Maximize2 className={className} />;
  if (name.includes("longevity")) return <Clock className={className} />;
  if (name.includes("curved") || name.includes("install")) return <Wrench className={className} />;
  if (name.includes("clean")) return <Check className={className} />;
  return <ShieldCheck className={className} />;
};

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "pro-gloss"; // Default fallback to pro-gloss

  // Get active category data or fallback
  const category = categories.find((cat) => cat.id === slug);
  const [activeTab, setActiveTab] = useState<"features" | "specs">("features");

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
        <h2 className="text-3xl font-bold mb-4 font-anton">
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

  // Parse numeric values for HUD dials
  const selfHealingVal = parseInt(category.technicalSpecs.selfHealingCoating) || 15;
  const tpuVal = parseInt(category.technicalSpecs.tpuThickness) || 160;
  const adhesiveVal = parseInt(category.technicalSpecs.psAdhesive) || 25;
  const totalVal = parseInt(category.technicalSpecs.totalThickness) || 200;

  // Calculate percentages
  const selfHealingPct = Math.min((selfHealingVal / 20) * 100, 100);
  const tpuPct = Math.min((tpuVal / 200) * 100, 100);
  const adhesivePct = Math.min((adhesiveVal / 30) * 100, 100);

  return (
    <div className="py-12">
      {/* Dynamic Header Section */}
      <section className="mb-12">
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#ffb599] border border-[#ffb599]/30 hover:border-[#ffb599] hover:bg-[#ffb599]/10 px-3 py-1.5 rounded-full transition-all duration-200"
          >
            ← Back to All Categories
          </Link>
        </div>
        <div className="border-b border-[#2d3449] pb-8">
          <span className="text-xs uppercase tracking-widest text-[#FB923C] font-semibold mb-2 inline-block">
            {category.tag}
          </span>
          <h1
            className="text-4xl md:text-5xl font-extrabold uppercase mb-4 text-[#dae2fd] font-anton tracking-wide-003"
          >
            {category.title}
          </h1>
          <p className="text-[#e2bfb2] text-sm md:text-base max-w-3xl leading-relaxed mt-2">
            {category.description}
          </p>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vertical Interactive Tabs */}
        <div className="lg:col-span-4">
          <h3 className="text-xs uppercase tracking-widest text-[#e2bfb2]/60 font-semibold mb-4">
            Select Information
          </h3>
          <div className="interactive-menu-container">
            <button
              onClick={() => setActiveTab("features")}
              className={`interactive-tab-btn ${activeTab === "features" ? "active" : ""}`}
            >
              <span>Features</span>
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`interactive-tab-btn ${activeTab === "specs" ? "active" : ""}`}
            >
              <span>Technical Specifications</span>
            </button>
          </div>
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-8 bg-[#171f33]/40 border border-[#2d3449] rounded-2xl p-6 md:p-8 backdrop-blur-md">
          {activeTab === "features" ? (
            <div>
              <h2 className="text-2xl font-bold text-[#dae2fd] mb-8 uppercase tracking-wider border-b border-[#2d3449]/40 pb-4">
                Feature Console
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
                {category.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col items-center text-center max-w-[130px]"
                  >
                    {/* Dial Circle */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#171f33]/95 to-[#070d19] border border-[#2d3449] hover:border-[#FB923C] shadow-lg transition-all duration-500 flex items-center justify-center mb-3 cursor-pointer hover:scale-105 shadow-[#000]/50 hover:shadow-[#FB923C]/15">
                      {/* Spin dash ring on hover */}
                      <div className="absolute inset-0 rounded-full border border-dashed border-[#FB923C]/0 group-hover:border-[#FB923C]/40 group-hover:rotate-180 transition-all duration-700 ease-out" />
                      <div className="absolute inset-1.5 rounded-full border border-transparent group-hover:border-[#FB923C]/15 transition-all duration-300" />
                      
                      {/* Icon */}
                      <div className="text-[#FB923C] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                        {getFeatureIcon(feature, "w-7 h-7 md:w-8 md:h-8")}
                      </div>
                    </div>

                    {/* Feature Label */}
                    <h4 className="text-[10px] md:text-xs font-bold text-[#dae2fd] uppercase tracking-wider leading-snug group-hover:text-white transition-all h-8 flex items-center justify-center text-center">
                      {feature}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-[#dae2fd] mb-6">
                Technical Specifications
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* HUD Panel: Circular Dial & Performance Bars */}
                <div className="lg:col-span-5 bg-[#0b1326]/60 border border-[#2d3449]/80 rounded-2xl p-6 flex flex-col items-center justify-between">
                  <div className="w-full text-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#FB923C] block mb-4 text-center">
                      Thickness HUD Meter
                    </span>
                    
                    {/* Glowing Circular Gauge Pod */}
                    <div className="relative w-44 h-44 mx-auto rounded-full border-2 border-dashed border-[#ffb599]/20 flex flex-col items-center justify-center bg-[#070d19] shadow-inner p-4 mb-6">
                      <div className="absolute inset-2 rounded-full border border-[#FB923C]/30 animate-pulse" />
                      <span className="text-4xl font-extrabold text-[#FB923C] font-anton">
                        {totalVal}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[#e2bfb2]/70 font-semibold mt-1">
                        Microns
                      </span>
                      <span className="text-[8px] uppercase tracking-widest text-[#FB923C]/60 font-bold mt-2">
                        Total Thickness
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar Meters */}
                  <div className="w-full flex flex-col gap-4">
                    {/* Bar 1: Self Healing Coat */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                        <span className="text-[#dae2fd]">Self-Healing Top Coat</span>
                        <span className="text-[#FB923C] font-bold">{selfHealingVal}µm</span>
                      </div>
                      <div className="w-full h-2 bg-[#171f33] rounded-full overflow-hidden border border-[#2d3449]">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-[#FB923C] to-[#EA580C] shadow-[0_0_8px_#FB923C]"
                          style={{ width: `${selfHealingPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Bar 2: TPU Film Base */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                        <span className="text-[#dae2fd]">TPU Film Base</span>
                        <span className="text-[#e2bfb2] font-bold">{tpuVal}µm</span>
                      </div>
                      <div className="w-full h-2 bg-[#171f33] rounded-full overflow-hidden border border-[#2d3449]">
                        <div 
                          className="h-full rounded-full bg-[#ffb599] shadow-[0_0_8px_rgba(255,181,153,0.5)]"
                          style={{ width: `${tpuPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Bar 3: PS Adhesive */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                        <span className="text-[#dae2fd]">PS Adhesive Layer</span>
                        <span className="text-[#e2bfb2]/70 font-bold">{adhesiveVal}µm</span>
                      </div>
                      <div className="w-full h-2 bg-[#171f33] rounded-full overflow-hidden border border-[#2d3449]">
                        <div 
                          className="h-full rounded-full bg-[#2d3449]"
                          style={{ width: `${adhesivePct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Cards Panel */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {/* Warranty Period Dashboard Card */}
                  <div className="bg-[#0b1326]/40 border border-[#2d3449] rounded-2xl p-5 flex items-start gap-4 hover:border-[#ffb599]/20 transition-all duration-300">
                    <div className="p-3.5 rounded-xl bg-[#FB923C]/10 text-[#FB923C] shrink-0">
                      <Shield className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#e2bfb2]/60">
                        Warranty Coverage
                      </span>
                      <h4 className="text-3xl font-extrabold text-white mt-1 font-anton tracking-wide-002">
                        {category.technicalSpecs.warrantyPeriod} Period
                      </h4>
                      <p className="text-xs text-[#e2bfb2] mt-1.5">
                        Guarantees long-term film durability, covering defects like <strong className="text-white font-medium">{category.technicalSpecs.warrantyCovers}</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Self-Healing efficiency Card */}
                  <div className="bg-[#0b1326]/40 border border-[#2d3449] rounded-2xl p-5 flex items-start gap-4 hover:border-[#ffb599]/20 transition-all duration-300">
                    <div className="p-3.5 rounded-xl bg-[#FB923C]/10 text-[#FB923C] shrink-0">
                      <Flame className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#e2bfb2]/60">
                        Self-Healing Efficiency
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">
                        {category.technicalSpecs.selfHealingEfficiency}
                      </h4>
                      <p className="text-xs text-[#e2bfb2] mt-1.5">
                        Top elastomeric layer returns to its flat molecular form when exposed to direct sunlight or warm water, erasing swirls.
                      </p>
                    </div>
                  </div>

                  {/* Material Base Card */}
                  <div className="bg-[#0b1326]/40 border border-[#2d3449] rounded-2xl p-5 flex items-start gap-4 hover:border-[#ffb599]/20 transition-all duration-300">
                    <div className="p-3.5 rounded-xl bg-[#FB923C]/10 text-[#FB923C] shrink-0">
                      <Wrench className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#e2bfb2]/60">
                        Chemical Composition
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">
                        Premium Aliphatic Polyurethane (TPU)
                      </h4>
                      <p className="text-xs text-[#e2bfb2] mt-1.5">
                        High-stretch compound with advanced optical clarity, engineered specifically to resist cracking, yellowing, and minor impacts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="border-t border-[#2d3449] pt-6 mt-8">
            <Link href="/booking" className="quote-btn">
              Get a Custom Quote for Your Car
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}