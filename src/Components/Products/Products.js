import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../content/ContentProvider";
import "./Products.css";

export default function Products() {
  const { products } = useContent();
  const liveProducts = products.filter(
    (product) => product.published !== false,
  );
  useEffect(() => {
    document.title = "Products | Exofters";
  }, []);
  return (
    <main className="products-page page-transition">
      <section className="products-hero">
        <div className="products-hero-content">
          <span className="products-eyebrow">EXOFTERS / PLATFORMS</span>
          <h1>Technology with a sharper point of view.</h1>
          <p>
            Explore scalable products designed around the people and operations
            they serve.
          </p>
        </div>
      </section>
      <section className="products-container">
        <div className="products-grid">
          {liveProducts.map((product) => (
            <article
              key={product.id}
              className={`product-card ${product.featured ? "featured-product-card" : ""}`}
            >
              <div className="product-card-header">
                <span className="product-badge">
                  {product.badge || "Platform"}
                </span>
                <span className="product-status-pill">
                  {product.status || "Available"}
                </span>
              </div>
              <div className="product-card-body">
                <h2>{product.name}</h2>
                <h3 className="product-tagline">{product.tagline}</h3>
                <p className="product-description">{product.description}</p>
                <ul className="product-features-list">
                  {(product.features || []).slice(0, 4).map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
              <div className="product-card-actions">
                <Link
                  className="btn-product-primary"
                  to={
                    product.id === "vsm"
                      ? "/products/vsm"
                      : `/products/${product.id}`
                  }
                >
                  {product.primaryText || "Explore product"} →
                </Link>
                {product.secondaryLink && (
                  <a
                    className="btn-product-secondary"
                    href={product.secondaryLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {product.secondaryText || "Visit"} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="products-cta">
        <p>Need a platform tailored to your operation?</p>
        <Link to="/contact">Build with Exofters →</Link>
      </section>
    </main>
  );
}
