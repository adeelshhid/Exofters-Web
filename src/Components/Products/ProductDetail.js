import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContent } from "../../content/ContentProvider";
import "./Products.css";

const cleanHtml = html => (html || "").replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "").replace(/on\w+\s*=\s*(["']).*?\1/gi, "").replace(/(?:href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\1/gi, "");
const safeAccent = color => /^#[0-9a-f]{6}$/i.test(color || "") ? color : "#59e7d2";
const PageLink = ({ href, className, children }) => href?.startsWith("http") ? <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a> : <Link className={className} to={href || "/contact"}>{children}</Link>;

export default function ProductDetail() {
  const { productId } = useParams();
  const { products } = useContent();
  const product = products.find(item => item.id === productId && item.published !== false);
  if (!product) return <main className="product-detail product-not-found"><h1>Product not found</h1><Link to="/products">Back to products</Link></main>;
  const page = product.page || {};
  if (page.renderMode === "html" && page.customHtml) return <main className={`product-detail custom-product-html template-${page.template || "welcome"}`} style={{ "--product-accent": safeAccent(page.accentColor) }}><div dangerouslySetInnerHTML={{ __html: cleanHtml(page.customHtml) }} /></main>;
  const heroTitle = page.heroTitle || product.name;
  const heroBody = page.heroBody || product.tagline || product.description;
  const cards = page.featureCards?.length ? page.featureCards : (product.features || []).map(feature => ({ title: feature, description: "Built into the platform from day one." }));
  const hasBuilderSections = page.heroImageUrl || page.stats?.length || page.overviewBody || page.steps?.length || page.industries?.length || page.featureCards?.length;
  return <main className={`product-detail dynamic-product-page template-${page.template || "welcome"}`} style={{ "--product-accent": safeAccent(page.accentColor) }}>
    <section className="dynamic-product-hero">
      <div className="dynamic-product-hero-copy"><Link to="/products" className="product-back">← All products</Link><span className="product-eyebrow">{page.heroEyebrow || product.badge || "EXOFTERS PRODUCT"}</span><h1>{heroTitle}</h1><p>{heroBody}</p><div className="dynamic-product-actions"><PageLink className="dynamic-primary" href={product.primaryLink}>{product.primaryText || "Explore product"} <span>→</span></PageLink>{product.secondaryLink && <PageLink className="dynamic-secondary" href={product.secondaryLink}>{product.secondaryText || "Learn more"} ↗</PageLink>}</div></div>
      <div className="dynamic-product-visual">{page.heroImageUrl ? <img src={page.heroImageUrl} alt={product.name} /> : page.heroDashboard?.enabled !== false ? <HeroDashboard dashboard={page.heroDashboard} /> : <div className="dynamic-product-orb"><span>{(product.name || "E").slice(0, 1)}</span><i /><i /><i /></div>}</div>
    </section>
    {page.stats?.length > 0 && <section className="product-stat-strip">{page.stats.map((stat, index) => <div key={`${stat.title}-${index}`}><strong>{stat.title}</strong><span>{stat.description}</span></div>)}</section>}
    <section className="product-overview"><div><span className="product-section-label">THE OPPORTUNITY</span><h2>{page.overviewTitle || "A more capable way forward."}</h2></div><div><p>{page.overviewBody || product.description}</p>{product.introHtml && <div className="product-rich-copy" dangerouslySetInnerHTML={{ __html: cleanHtml(product.introHtml) }} />}</div></section>
    {cards.length > 0 && <section className="product-capabilities"><header><span className="product-section-label">CORE CAPABILITIES</span><h2>Everything aligned around the work.</h2></header><div className="product-capability-grid">{cards.map((card, index) => <article key={`${card.title}-${index}`}><span>0{index + 1}</span><h3>{card.title}</h3><p>{card.description}</p></article>)}</div></section>}
    {page.steps?.length > 0 && <section className="product-workflow"><header><span className="product-section-label">HOW IT WORKS</span><h2>Built to fit the rhythm of your operation.</h2></header><div>{page.steps.map((step, index) => <article key={`${step.title}-${index}`}><strong>{String(index + 1).padStart(2, "0")}</strong><div><h3>{step.title}</h3><p>{step.description}</p></div></article>)}</div></section>}
    {page.screenshots?.filter(shot => shot.imageUrl).length > 0 && <ProductGallery screenshots={page.screenshots} />}
    {page.apps?.length > 0 && <ProductApps page={page} />}
    {page.industries?.length > 0 && <section className="product-industries"><span>BUILT FOR</span>{page.industries.map(industry => <b key={industry}>{industry}</b>)}</section>}
    <section className="product-final-cta"><span>{product.status || "EXOFTERS PLATFORM"}</span><h2>{page.ctaTitle || "Ready to see what’s possible?"}</h2><p>{page.ctaBody || "Bring us the challenge. We’ll bring the product thinking."}</p><PageLink className="dynamic-primary" href={page.ctaLink || product.primaryLink}>{page.ctaLabel || product.primaryText || "Start a conversation"} <span>→</span></PageLink></section>
    {!hasBuilderSections && <span className="product-builder-hint">This page is ready to expand in the Exofters Control Studio.</span>}
  </main>;
}
function HeroDashboard({ dashboard = {} }) { const cards = dashboard.cards || []; const chart = dashboard.chart || []; return <div className="product-dashboard"><div className="product-dashboard-top"><span><i/> {dashboard.label || "Live workspace"}</span><b>•••</b></div><h3>{dashboard.heading || "Your operation at a glance"}</h3><div className="product-dashboard-cards">{cards.slice(0, 3).map((card, index) => <article key={`${card.label}-${index}`}><span>{card.label}</span><strong>{card.value}</strong><small>{card.meta}</small></article>)}</div><div className="product-dashboard-chart"><div><span>Performance activity</span><small>Last 7 days</small></div><section>{chart.map((bar, index) => <i key={`${bar.label}-${index}`} style={{ height: `${Math.max(4, Math.min(100, Number(bar.value) || 4))}%` }}><b>{bar.label}</b></i>)}</section></div></div>; }
function ProductApps({ page }) { return <section className="product-apps"><div className="product-apps-copy"><span className="product-section-label">{page.appsEyebrow || "TAKE IT WITH YOU"}</span><h2>{page.appsTitle || "Your product, wherever work happens."}</h2><p>{page.appsBody}</p></div><div className="product-app-cards">{page.apps.map((app, index) => app.enabled === false ? <article className="product-app-card app-unavailable" key={app.id || index}><i>{app.type === "ios" ? "●" : "↗"}</i><div><small>Coming soon</small><strong>{app.label}</strong><p>{app.description}</p></div><em>Reviewing</em></article> : <a className="product-app-card" href={app.url || "#"} key={app.id || index} target={app.url?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><i>{app.type === "android" ? "▶" : app.type === "ios" ? "●" : "◌"}</i><div><small>{app.type === "web" ? "Launch anywhere" : "Available on"}</small><strong>{app.label}</strong><p>{app.description}</p></div><b>↗</b></a>)}</div></section>; }
function ProductGallery({ screenshots }) {
  const desktop = screenshots.filter(shot => shot.imageUrl && shot.device !== "mobile");
  const mobile = screenshots.filter(shot => shot.imageUrl && shot.device === "mobile");
  return <section className="product-gallery"><header><span className="product-section-label">PRODUCT IN ACTION</span><h2>Designed for every important screen.</h2><p>See how the experience adapts to the place work happens.</p></header>{desktop.length > 0 && <div className="desktop-screenshot-grid">{desktop.map((shot, index) => <article key={shot.id || `${shot.title}-${index}`}><div className="desktop-frame"><div><i/><i/><i/></div><img src={shot.imageUrl} alt={shot.title || "Desktop application screen"}/></div><h3>{shot.title}</h3><p>{shot.description}</p></article>)}</div>}{mobile.length > 0 && <div className="mobile-gallery"><div className="mobile-gallery-heading"><span>MOBILE EXPERIENCE</span><p>Everything important remains close, even away from the desk.</p></div><div className="mobile-screenshot-grid">{mobile.map((shot, index) => <article key={shot.id || `${shot.title}-${index}`}><div className="mobile-frame"><span/><img src={shot.imageUrl} alt={shot.title || "Mobile application screen"}/></div><h3>{shot.title}</h3><p>{shot.description}</p></article>)}</div></div>}</section>;
}
