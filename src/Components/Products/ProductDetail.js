import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContent } from "../../content/ContentProvider";
import "./Products.css";

const safeHtml = (html) =>
  (html || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");
export default function ProductDetail() {
  const { productId } = useParams();
  const { products } = useContent();
  const product = products.find(
    (item) => item.id === productId && item.published !== false,
  );
  if (!product)
    return (
      <main className="product-detail product-not-found">
        <h1>Product not found</h1>
        <Link to="/products">Back to products</Link>
      </main>
    );
  return (
    <main className="product-detail">
      <section className="product-detail-hero">
        <Link to="/products">← Products</Link>
        <span>{product.badge || "EXOFTERS PRODUCT"}</span>
        <h1>{product.name}</h1>
        <p>{product.tagline || product.description}</p>
        <div>
          {product.primaryLink?.startsWith("http") ? (
            <a className="btn-product-primary" href={product.primaryLink}>
              {product.primaryText || "Learn more"}
            </a>
          ) : (
            <Link
              className="btn-product-primary"
              to={product.primaryLink || "/contact"}
            >
              {product.primaryText || "Talk to us"}
            </Link>
          )}
        </div>
      </section>
      <section className="product-detail-content">
        <article
          dangerouslySetInnerHTML={{ __html: safeHtml(product.introHtml) }}
        />
        {product.features?.length > 0 && (
          <aside>
            <span>CORE CAPABILITIES</span>
            {product.features.map((feature) => (
              <p key={feature}>✓ {feature}</p>
            ))}
          </aside>
        )}
      </section>
    </main>
  );
}
