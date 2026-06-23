export interface Category {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  imageAlt: string;
  tag: string;
  features: string[];
  technicalSpecs: {
    warrantyPeriod: string;
    warrantyCovers: string;
    selfHealingCoating: string;
    tpuThickness: string;
    psAdhesive: string;
    totalThickness: string;
    selfHealingEfficiency: string;
  };
}

export const categories: Category[] = [
  {
    id: "pro-gloss",
    title: "Dura Shield Pro (Gloss)",
    description: "Our premium paint protection film featuring high-gloss clarity, elite self-healing technology, and advanced resistance to stains, UV fading, and everyday road debris.",
    price: "$2,500",
    image: "/images/products/pro1.jpg",
    imageAlt: "Dura Shield Pro Gloss PPF installation",
    tag: "PREMIUM PROTECTION",
    features: [
      "Self healing property",
      "Anti-yellowing property",
      "Best Gloss Film",
      "Superior Hydrophobic property",
      "Excellent stain resistance",
      "Supreme chemical resistance",
      "Best optical clarity",
      "Top-notch mechanical property",
      "Excellent Stretchability",
      "Enhanced Longevity",
      "Easy to install on curved surfaces",
      "Easy to clean"
    ],
    technicalSpecs: {
      warrantyPeriod: "10 Years",
      warrantyCovers: "Cracking & Yellowing",
      selfHealingCoating: "15 Microns",
      tpuThickness: "160 Microns",
      psAdhesive: "25 Microns",
      totalThickness: "200 Microns",
      selfHealingEfficiency: "Heat Activated"
    }
  },
  {
    id: "matt",
    title: "Dura Shield Matte",
    description: "Transform gloss paint into a premium, smooth satin-matte finish while retaining heavy-duty protection. Ideal for custom styling or matching factory matte finishes.",
    price: "$3,800",
    image: "/images/products/pro2.png",
    imageAlt: "Dura Shield Matt PPF installation",
    tag: "MATTE CUSTOM CONVERSION",
    features: [
      "Self healing property",
      "Anti-yellowing property",
      "Matte surface appearance",
      "Superior Hydrophobic property",
      "Excellent stain resistance",
      "Supreme chemical resistance",
      "Easy to install on curved surfaces"
    ],
    technicalSpecs: {
      warrantyPeriod: "5 Years",
      warrantyCovers: "Cracking & Yellowing",
      selfHealingCoating: "15 Microns",
      tpuThickness: "155 Microns",
      psAdhesive: "25 Microns",
      totalThickness: "195 Microns",
      selfHealingEfficiency: "Heat Activated"
    }
  },
  {
    id: "ppf-gloss",
    title: "Dura Shield PPF (Gloss)",
    description: "High-performance glossy protection film offering exceptional daily defense, standard thermal self-healing, and robust protection against gravel and abrasions.",
    price: "₹ 83,000",
    image: "/images/products/pro3.jpg",
    imageAlt: "Dura Shield PPF Gloss installation",
    tag: "HIGH PERFORMANCE DAILY",
    features: [
      "Self healing property",
      "Anti-yellowing property",
      "High Gloss Film",
      "Superior Hydrophobic property",
      "Excellent stain resistance",
      "Supreme chemical resistance",
      "Excellent optical clarity",
      "Easy to install on curved surfaces"
    ],
    technicalSpecs: {
      warrantyPeriod: "5 Years",
      warrantyCovers: "Cracking & Yellowing",
      selfHealingCoating: "15 Microns",
      tpuThickness: "155 Microns",
      psAdhesive: "25 Microns",
      totalThickness: "195 Microns",
      selfHealingEfficiency: "Heat Activated"
    }
  }
];
