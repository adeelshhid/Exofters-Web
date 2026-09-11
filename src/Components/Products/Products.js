import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../content/ContentProvider";
import "./Products.css";

const productPreview = (product) => {
  const previews = {
    vsm: { section: "Store overview", metric: "PKR 48,600", label: "Today's sales", bars: [38, 52, 42, 70, 57, 82, 94], accent: "mint" },
    "the-labour": { section: "Workforce hub", metric: "1,284", label: "Workers active", bars: [60, 42, 76, 58, 88, 72, 94], accent: "blue" },
    bnpl: { section: "Travel wallet", metric: "24", label: "Bookings today", bars: [36, 64, 48, 75, 60, 86, 70], accent: "violet" },
  };
  return previews[product.id] || previews.vsm;
};

export default function Products({ previewProduct } = {}) {
  const { products } = useContent();
  const liveProducts = previewProduct ? [previewProduct] : products.filter(
    (product) => product.published !== false,
  );
  useEffect(() => {
    if (!previewProduct) document.title = "Products | Exofters";
  }, [previewProduct]);
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
          {liveProducts.map((product) => {
            const preview = productPreview(product);
            const backgroundImage = product.thumbnailUrl;
            return (
              <article
                key={product.id}
                className={`product-card ${product.featured ? "featured-product-card" : ""} preview-${preview.accent}`}
                style={backgroundImage ? { "--product-screenshot": `url(${JSON.stringify(backgroundImage)})` } : undefined}
              >
                <div className="product-preview" aria-label={`${product.name} product preview`}>
                  <div className="product-preview-topbar">
                    <span className="product-badge">{product.badge || "Platform"}</span>
                    <span className="product-save" aria-label={`Save ${product.name}`}>♡</span>
                  </div>
                  <div className="desktop-device">
                    <div className="desktop-device-bar"><span /><span /><span /><i>{preview.section}</i></div>
                    <div className="desktop-screen">
                      <aside><b>e</b><span className="active" /><span /><span /><span /></aside>
                      <div className="screen-content">
                        <div className="screen-heading"><span>{preview.section}</span><em>Live</em></div>
                        <div className="screen-metric"><small>{preview.label}</small><strong>{preview.metric}</strong><span>↗ 18.4%</span></div>
                        <div className="screen-chart">{preview.bars.map((bar, index) => <i key={index} style={{ height: `${bar}%` }} />)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mobile-device">
                    <div className="mobile-notch" />
                    <div className="mobile-screen"><small>{preview.section}</small><strong>{preview.metric}</strong><div className="mobile-chart">{preview.bars.slice(0, 5).map((bar, index) => <i key={index} style={{ height: `${bar}%` }} />)}</div><span>Overview</span></div>
                  </div>
                  <div className="product-preview-footer">
                    <span><i /> {product.status || "Available"}</span>
                    <span>{(product.features || []).length || 3} capabilities</span>
                  </div>
                </div>
                <div className="product-card-content">
                  <div className="product-card-header">
                    <span className="product-status-pill"><i />{product.status || "Available"}</span>
                    <span className="product-card-arrow">↗</span>
                  </div>
                  <div className="product-card-body">
                    <h2>{product.name}</h2>
                    <h3 className="product-tagline">{product.tagline}</h3>
                    <p className="product-description">{product.description}</p>
                    <ul className="product-features-list">
                      {(product.features || []).slice(0, 3).map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}
                    </ul>
                  </div>
                  <div className="product-card-actions">
                    <Link className="btn-product-primary" to={product.id === "vsm" ? "/products/vsm" : `/products/${product.id}`}>
                      {product.primaryText || "Explore product"}<span>→</span>
                    </Link>
                    {product.secondaryLink && <a className="btn-product-secondary" href={product.secondaryLink} target="_blank" rel="noreferrer">{product.secondaryText || "Visit"} ↗</a>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="products-cta">
        <p>Need a platform tailored to your operation?</p>
        <Link to="/contact">Build with Exofters →</Link>
      </section>
    </main>
  );
}
