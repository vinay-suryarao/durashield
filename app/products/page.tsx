import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Paint Protection Film (PPF) Categories - Durashield",
  description: "Explore Durashield's premium Paint Protection Film (PPF) tiers. From essential scratch defense to self-healing hydrophobic wraps and custom matte finishes.",
};

import { categories } from "../../data/prodata";

export default function ProductsPage() {
  return (
    <div className="products-page-container">
      {/* Grid Layout Section */}
      <section id="categories-grid" className="products-grid-section">
        {/* Header */}
        <div className="products-grid-header">
          <h2 className="products-grid-title">
            Select Your Level of Shielding
          </h2>
          <p className="products-grid-subtitle">
            Explore our premium range of Paint Protection Films.
          </p>
        </div>

        {/* Nested cards inside the parent box */}
        <div className="products-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="products-grid-card">
              <div>
                {/* Product Image */}
                <div className="products-card-image-wrapper">
                  <img
                    src={cat.image}
                    alt={cat.imageAlt}
                    className="products-card-image"
                  />
                </div>

                <div className="products-card-header">
                  <span className="products-card-tag">
                    {cat.tag}
                  </span>
                  <h3 className="products-card-title">
                    {cat.title}
                  </h3>
                </div>

                <p className="products-card-description">
                  {cat.description}
                </p>
              </div>

              <div>
                <Link
                  href={`/products/${cat.id}`}
                  className="products-card-button"
                >
                  View Features & Specs <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}