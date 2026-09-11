import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, storage } from "../../lib/firebase";
import { useContent } from "../../content/ContentProvider";
import "./Admin.css";
import { createPortal } from "react-dom";
import Products from "../Products/Products";
import { ProductPage } from "../Products/ProductDetail";

const emptyProductPage = {
  heroEyebrow: "EXOFTERS / PRODUCT",
  template: "welcome",
  renderMode: "structured",
  customHtml: "",
  heroTitle: "",
  heroBody: "",
  heroImageUrl: "",
  heroDashboard: { enabled: true, label: "Live workspace", heading: "Your operation at a glance", cards: [{ label: "Sales", value: "48.6k", meta: "↗ 18.4%" }, { label: "Orders", value: "126", meta: "Today" }, { label: "In control", value: "08", meta: "Needs attention" }], chart: [{ label: "Mon", value: "35" }, { label: "Tue", value: "54" }, { label: "Wed", value: "43" }, { label: "Thu", value: "70" }, { label: "Fri", value: "59" }, { label: "Sat", value: "84" }, { label: "Sun", value: "96" }] },
  accentColor: "#59e7d2",
  stats: [],
  overviewTitle: "Made for momentum.",
  overviewBody: "Explain the operational transformation your product enables.",
  featureCards: [],
  steps: [],
  screenshots: [],
  industries: [],
  ctaTitle: "Ready to see what’s possible?",
  ctaBody: "Talk with our product team about your requirements.",
  ctaLabel: "Start a conversation",
  ctaLink: "/contact",
  appsEyebrow: "TAKE IT WITH YOU",
  appsTitle: "Your product, wherever work happens.",
  appsBody: "Connect your team across the browser and the devices they use every day.",
  apps: [],
};
const newItem = {
  products: {
    name: "",
    thumbnailUrl: "",
    tagline: "",
    description: "",
    badge: "New release",
    status: "Draft",
    features: [""],
    primaryText: "Explore product",
    primaryLink: "/contact",
    secondaryText: "",
    secondaryLink: "",
    introHtml:
      "<h2>Built around your business.</h2><p>Describe the product’s value in a clear, confident voice.</p>",
    order: 99,
    published: true,
    featured: false,
    page: emptyProductPage,
  },
  portfolio: {
    title: "",
    description: "",
    tags: [""],
    imageUrl: "",
    link: "",
    order: 99,
    published: true,
    featured: false,
  },
  services: {
    title: "",
    description: "",
    features: [""],
    order: 99,
    published: true,
  },
};
const labels = {
  products: "Products",
  portfolio: "Portfolio",
  services: "Services",
  settings: "Site messaging",
};
const scrubHtml = (html) =>
  (html || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/on\w+\s*=\s*(["']).*?\1/gi, "")
    .replace(/(?:href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\1/gi, "");
const makeId = (text) =>
  (text || "content")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 52);

// Preserve source pixels and embedded ICC/P3 profiles. Canvas conversion can
// make vibrant screenshots look muted in browsers that do not retain profiles.
const optimizeImage = (file) => Promise.resolve(file);

export default function Admin() {
  const content = useContent();
  const [user, setUser] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [section, setSection] = useState("products");
  const [draft, setDraft] = useState(null);
  const [notice, setNotice] = useState("");
  const [publishing, setPublishing] = useState(false);
  useEffect(() => onAuthStateChanged(auth, setUser), []);
  const items = useMemo(
    () =>
      (content[section] || [])
        .slice()
        .sort((a, b) => (a.order || 99) - (b.order || 99)),
    [content, section],
  );
  const signIn = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError(
        "Sign-in was not accepted. Verify Email/Password auth is enabled and your administrator account exists.",
      );
    }
  };
  const open = (item) => {
    setNotice("");
    if (section === "settings") return setDraft({ ...content.settings });
    const base = item ? { ...item } : { ...newItem[section], id: "" };
    setDraft({
      ...base,
      id: base.id || makeId(base.name || base.title),
      features: Array.isArray(base.features) ? base.features : [],
      tags: Array.isArray(base.tags) ? base.tags : [],
      page: { ...emptyProductPage, ...(base.page || {}) },
    });
  };
  const publish = async (event) => {
    event.preventDefault();
    setPublishing(true);
    setNotice("");
    try {
      if (section === "settings") await content.saveSettings(draft);
      else {
        const title = draft.name || draft.title;
        await content.saveItem(section, {
          ...draft,
          id: draft.id || makeId(title),
          introHtml: scrubHtml(draft.introHtml),
          features: (draft.features || []).filter(Boolean),
          tags: (draft.tags || []).filter(Boolean),
        });
      }
      setDraft(null);
      setNotice("Changes are live on the public website.");
    } catch {
      setNotice(
        "Publishing was blocked. Check Firebase rules and that this account is permitted to write.",
      );
    } finally {
      setPublishing(false);
    }
  };
  const upload = async (file, maxDimension, onProgress = () => {}) => {
    const optimizedFile = await optimizeImage(file, maxDimension);
    const filename = optimizedFile.name.replace(/[^a-z0-9._-]/gi, "-");
    const uploadRef = ref(
      storage,
      `content/${section}/${Date.now()}-${filename}`,
    );
    const uploadTask = uploadBytesResumable(uploadRef, optimizedFile, {
      contentType: optimizedFile.type,
    });
    return new Promise((resolve, reject) => uploadTask.on("state_changed", snapshot => {
      onProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
    }, reject, async () => resolve(getDownloadURL(uploadTask.snapshot.ref))));
  };
  if (user === undefined)
    return <div className="admin-loading">Opening workspace…</div>;
  if (!user)
    return (
      <Login
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        signIn={signIn}
        error={error}
      />
    );
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a href="/" className="admin-brand">
          EXOFTERS<span>CONTROL STUDIO</span>
        </a>
        <nav>
          {Object.keys(labels).map((key) => (
            <button
              key={key}
              className={section === key ? "active" : ""}
              onClick={() => {
                setSection(key);
                setDraft(null);
                setNotice("");
              }}
            >
              {labels[key]}
            </button>
          ))}
        </nav>
        <div className="admin-account">
          <span className="admin-presence">● LIVE SESSION</span>
          <span>{user.email}</span>
          <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
      </aside>
      <section className="admin-main">
        <header className="admin-header">
          <div>
            <span className="admin-kicker">
              {content.connected
                ? "FIRESTORE CONNECTED"
                : "CONNECTING TO FIRESTORE"}
            </span>
            <h1>
              {draft ? `Edit ${labels[section].slice(0, -1)}` : labels[section]}
            </h1>
            <p>
              {draft
                ? "Your changes are previewed before you publish."
                : "Manage what visitors see, instantly."}
            </p>
          </div>
          {!draft && (
            <button className="admin-primary" onClick={() => open()}>
              + Create{" "}
              {section === "settings" ? "message" : section.slice(0, -1)}
            </button>
          )}
        </header>
        {notice && <div className="admin-notice">{notice}</div>}
        {draft ? (
          <Builder
            section={section}
            draft={draft}
            setDraft={setDraft}
            upload={upload}
            publish={publish}
            publishing={publishing}
            cancel={() => setDraft(null)}
          />
        ) : (
          <ContentList
            items={items}
            section={section}
            open={open}
            remove={async (id) => {
              if (window.confirm("Permanently delete this entry?")) {
                await content.removeItem(section, id);
                setNotice("Entry deleted from Firestore.");
              }
            }}
            settings={content.settings}
          />
        )}
      </section>
    </main>
  );
}

function Login({ email, password, setEmail, setPassword, signIn, error }) {
  return (
    <main className="admin-login">
      <div className="admin-login-orb orb-one" />
      <div className="admin-login-orb orb-two" />
      <form className="glass-login" onSubmit={signIn}>
        <span className="admin-kicker">EXOFTERS / CONTROL STUDIO</span>
        <h1>Shape the site.</h1>
        <p>Securely sign in to build and publish content.</p>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button>Enter workspace</button>
        <a href="/">← Return to website</a>
      </form>
    </main>
  );
}

function ContentList({ items, section, open, remove, settings }) {
  if (section === "settings")
    return (
      <div className="settings-overview">
        <span>PUBLIC HOMEPAGE</span>
        <h2>{settings.heroTitle}</h2>
        <p>{settings.heroBody}</p>
        <button className="admin-primary" onClick={() => open(settings)}>
          Edit homepage messaging
        </button>
      </div>
    );
  return (
    <div className="admin-cards">
      {items.map((item) => (
        <article key={item.id} className="admin-card">
          <div className="admin-card-top">
            <span>#{item.order || "—"}</span>
            <span
              className={
                item.published === false ? "draft-badge" : "live-badge"
              }
            >
              {item.published === false ? "DRAFT" : "LIVE"}
            </span>
          </div>
          <div>
            <h2>{item.name || item.title}</h2>
            <p>{item.description}</p>
          </div>
          <div className="admin-card-actions">
            <button onClick={() => open(item)}>Edit & preview</button>
            <button className="danger" onClick={() => remove(item.id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function Builder({
  section,
  draft,
  setDraft,
  upload,
  publish,
  publishing,
  cancel,
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  if (section === "settings")
    return (
      <SettingsBuilder
        draft={draft}
        setDraft={setDraft}
        publish={publish}
        publishing={publishing}
        cancel={cancel}
      />
    );
  const update = (field, value) =>
    setDraft((current) => ({ ...current, [field]: value }));
  const list = (field, value) =>
    update(
      field,
      value.split("\n").map((item) => item.trim()),
    );
  const fileSelected = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      update(section === "products" ? "thumbnailUrl" : "imageUrl", await upload(file));
    } catch {
      setUploadError(
        "Image could not upload. Confirm Firebase Storage is enabled and its rules are published.",
      );
    } finally {
      setUploading(false);
    }
  };
  const titleField = section === "products" ? "name" : "title";
  const checks = [
    !draft[titleField] && "Add a clear title",
    !draft.description && "Write a concise description",
    section === "portfolio" && !draft.imageUrl && "Add a project image",
    section === "products" &&
      !draft.introHtml &&
      "Add the product introduction",
  ].filter(Boolean);
  return (
    <form className="builder" onSubmit={publish}>
      <div className="builder-toolbar">
        <button type="button" onClick={cancel}>
          ← Back to content
        </button>
        <label className="publish-switch">
          <input
            type="checkbox"
            checked={draft.published !== false}
            onChange={(e) => update("published", e.target.checked)}
          />
          <span>
            {draft.published !== false ? "Will publish live" : "Save as draft"}
          </span>
        </label>
        <button className="admin-primary" disabled={publishing || uploading}>
          {publishing ? "Publishing…" : "Publish changes"}
        </button>
      </div>
      <div className="builder-grid">
        <section className="builder-form">
          <div className="builder-section-title">
            <span>CONTENT</span>
            <h2>Tell the story</h2>
          </div>
          <div className="editor-grid">
            <Field
              label="Title"
              value={draft[titleField]}
              onChange={(value) => {
                update(titleField, value);
                if (!draft.id || draft.id === makeId(draft[titleField]))
                  update("id", makeId(value));
              }}
            />
            <Field
              label="URL identifier"
              value={draft.id}
              hint="Generated automatically; keep unique."
              onChange={(value) => update("id", makeId(value))}
            />
            <Field
              label="Display order"
              type="number"
              value={draft.order}
              onChange={(value) => update("order", Number(value))}
            />
            {section === "products" && (
              <>
                <Field
                  label="Category badge"
                  value={draft.badge}
                  onChange={(value) => update("badge", value)}
                />
                <Field
                  label="Release status"
                  value={draft.status}
                  onChange={(value) => update("status", value)}
                />
                <Field
                  label="Tagline"
                  value={draft.tagline}
                  onChange={(value) => update("tagline", value)}
                />
              </>
            )}
            <Field
              wide
              label="Description"
              textarea
              value={draft.description}
              onChange={(value) => update("description", value)}
            />
            {section !== "settings" && (
              <Field
                wide
                label={
                  section === "portfolio"
                    ? "Tags — one per line"
                    : "Capabilities — one per line"
                }
                textarea
                value={(section === "portfolio"
                  ? draft.tags
                  : draft.features
                ).join("\n")}
                onChange={(value) =>
                  list(section === "portfolio" ? "tags" : "features", value)
                }
              />
            )}{" "}
            {section === "products" && (
              <>
                <Field
                  label="Primary action label"
                  value={draft.primaryText}
                  onChange={(value) => update("primaryText", value)}
                />
                <Field
                  label="Primary action link"
                  value={draft.primaryLink}
                  onChange={(value) => update("primaryLink", value)}
                />
                <Field
                  label="Secondary action label"
                  value={draft.secondaryText}
                  onChange={(value) => update("secondaryText", value)}
                />
                <Field
                  label="Secondary action link"
                  value={draft.secondaryLink}
                  onChange={(value) => update("secondaryLink", value)}
                />
              </>
            )}
          </div>
          {section === "portfolio" && (
            <div className="media-control">
              <label>
                Project image
                <input type="file" accept="image/*" onChange={fileSelected} />
              </label>
              <span>
                {uploading
                  ? "Uploading to Firebase Storage…"
                  : uploadError || "Upload an image or paste a URL below."}
              </span>
              <Field
                label="Image URL"
                value={draft.imageUrl}
                onChange={(value) => update("imageUrl", value)}
              />
              <Field
                label="Project link"
                value={draft.link}
                onChange={(value) => update("link", value)}
              />
            </div>
          )}
          {section === "products" && (
            <>
              <div className="media-control">
                <label>Product card background thumbnail<input type="file" accept="image/png,image/jpeg,image/webp" onChange={fileSelected} disabled={uploading} /></label>
                <span role="status">{uploading ? "Optimizing and uploading thumbnail…" : uploadError || "Choose the background shown on the Products card."}</span>
                <Field label="Card thumbnail URL" value={draft.thumbnailUrl} onChange={value => update("thumbnailUrl", value)} />
              </div>
              <label className="html-field">
                Product introduction HTML{" "}
                <span>Scripts and inline handlers are removed on publish.</span>
                <textarea
                  value={draft.introHtml || ""}
                  onChange={(e) => update("introHtml", e.target.value)}
                />
              </label>
              <ProductPageComposer
                page={draft.page || emptyProductPage}
                onChange={(page) => update("page", page)}
                upload={upload}
              />
            </>
          )}
        </section>
        <aside className="builder-preview">
          <div className="preview-top">
            <span>LIVE PREVIEW</span>
            <span className="preview-dot">●</span>
          </div>
          <Preview section={section} draft={draft} />
          <div className="quality-check">
            <strong>Publishing check</strong>
            {checks.length ? (
              checks.map((check) => <p key={check}>○ {check}</p>)
            ) : (
              <p className="quality-good">✓ Ready for visitors</p>
            )}
          </div>
        </aside>
      </div>
    </form>
  );
}
function ProductPageComposer({ page, onChange, upload }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const update = (field, value) => onChange({ ...emptyProductPage, ...page, [field]: value });
  const parsePairs = (value) => value.split("\n").map(line => line.trim()).filter(Boolean).map(line => {
    const [title, ...rest] = line.split("|");
    return { title: title.trim(), description: rest.join("|").trim() };
  });
  const parseTriples = (value) => value.split("\n").map(line => line.trim()).filter(Boolean).map(line => { const [label, value, meta] = line.split("|"); return { label: (label || "").trim(), value: (value || "").trim(), meta: (meta || "").trim() }; });
  const pairsToText = (values) => (values || []).map(item => `${item.title || ""} | ${item.description || ""}`).join("\n");
  const uploadImage = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true); setUploadError("");
    try { update("heroImageUrl", await upload(file)); }
    catch { setUploadError("Hero image upload failed. Check Firebase Storage rules."); }
    finally { setUploading(false); }
  };
  return <details className="page-composer" open>
    <summary><span>RESPONSIVE PRODUCT PAGE</span><strong>Build page sections</strong><em>Structured, responsive and live in preview</em></summary>
    <div className="composer-content">
      <div className="template-picker"><div><span>PAGE TEMPLATE</span><strong>Choose the product-story direction</strong></div><label>Template<select value={page.template || "welcome"} onChange={e => update("template", e.target.value)}><option value="welcome">Welcome — VSM-style clarity</option><option value="studio">Studio — enterprise glass</option><option value="launch">Launch — high-contrast product reveal</option></select></label><label>Rendering mode<select value={page.renderMode || "structured"} onChange={e => update("renderMode", e.target.value)}><option value="structured">Structured builder</option><option value="html">Custom HTML page</option></select></label></div>
      {page.renderMode === "html" && <label className="html-field custom-html-field">Complete details page HTML <span>Optional full-page override. Scripts, event handlers, and javascript URLs are removed before publish. Your structured page remains saved as a fallback.</span><textarea value={page.customHtml || ""} onChange={e => update("customHtml", e.target.value)} placeholder="<section class='hero'>...</section>" /></label>}
      <div className="composer-heading"><span>01 / HERO</span><p>Build the first screen without touching code.</p></div>
      <div className="editor-grid">
        <Field label="Hero eyebrow" value={page.heroEyebrow} onChange={value => update("heroEyebrow", value)} />
        <label>Accent color<input type="color" value={page.accentColor || "#59e7d2"} onChange={e => update("accentColor", e.target.value)} /></label>
        <Field wide label="Hero headline" textarea value={page.heroTitle} onChange={value => update("heroTitle", value)} />
        <Field wide label="Hero description" textarea value={page.heroBody} onChange={value => update("heroBody", value)} />
      </div>
      <div className="media-control"><label>Hero visual<input type="file" accept="image/*" onChange={uploadImage}/></label><span>{uploading ? "Uploading to Firebase Storage…" : uploadError || "Upload a product visual or paste an image URL."}</span><Field label="Hero image URL" value={page.heroImageUrl} onChange={value => update("heroImageUrl", value)} /></div>
      <div className="dashboard-composer"><div className="composer-heading"><span>01B / LIVE DASHBOARD HERO</span><p>Use a responsive VSM-style product dashboard when you do not have a hero visual.</p></div><label className="publish-switch"><input type="checkbox" checked={page.heroDashboard?.enabled !== false} onChange={e => update("heroDashboard", { ...(page.heroDashboard || {}), enabled: e.target.checked })}/><span>Show dashboard simulation</span></label><div className="editor-grid"><Field label="Dashboard label" value={page.heroDashboard?.label} onChange={value => update("heroDashboard", { ...(page.heroDashboard || {}), label: value })}/><Field label="Dashboard heading" value={page.heroDashboard?.heading} onChange={value => update("heroDashboard", { ...(page.heroDashboard || {}), heading: value })}/><Field wide label="Dashboard cards — one per line: Label | Value | Detail" textarea value={(page.heroDashboard?.cards || []).map(card => `${card.label || ""} | ${card.value || ""} | ${card.meta || ""}`).join("\n")} onChange={value => update("heroDashboard", { ...(page.heroDashboard || {}), cards: parseTriples(value) })}/><Field wide label="Chart bars — one per line: Label | Height (0–100)" textarea value={(page.heroDashboard?.chart || []).map(bar => `${bar.label || ""} | ${bar.value || ""}`).join("\n")} onChange={value => update("heroDashboard", { ...(page.heroDashboard || {}), chart: parseTriples(value).map(bar => ({ label: bar.label, value: bar.value })) })}/></div></div>
      <div className="composer-heading"><span>02 / PROOF & OVERVIEW</span><p>Add outcome-oriented metrics and positioning.</p></div>
      <div className="editor-grid">
        <Field wide label="Impact metrics — one per line: Value | Label" textarea value={pairsToText(page.stats)} onChange={value => update("stats", parsePairs(value))} />
        <Field label="Overview heading" value={page.overviewTitle} onChange={value => update("overviewTitle", value)} />
        <Field label="Industries — one per line" textarea value={(page.industries || []).join("\n")} onChange={value => update("industries", value.split("\n").map(item => item.trim()).filter(Boolean))} />
        <Field wide label="Overview copy" textarea value={page.overviewBody} onChange={value => update("overviewBody", value)} />
      </div>
      <div className="composer-heading"><span>03 / CAPABILITIES & WORKFLOW</span><p>Compose cards and implementation steps. Use: Title | Description.</p></div>
      <div className="editor-grid">
        <Field wide label="Capability cards — one per line" textarea value={pairsToText(page.featureCards)} onChange={value => update("featureCards", parsePairs(value))} />
        <Field wide label="Workflow steps — one per line" textarea value={pairsToText(page.steps)} onChange={value => update("steps", parsePairs(value))} />
      </div>
      <ScreenshotManager screenshots={page.screenshots || []} onChange={value => update("screenshots", value)} upload={upload} />
      <AppDistributionManager page={page} onChange={onChange} />
      <div className="composer-heading"><span>05 / FINAL CTA</span><p>Close with a clear next action.</p></div>
      <div className="editor-grid">
        <Field label="CTA heading" value={page.ctaTitle} onChange={value => update("ctaTitle", value)} />
        <Field label="CTA label" value={page.ctaLabel} onChange={value => update("ctaLabel", value)} />
        <Field wide label="CTA description" textarea value={page.ctaBody} onChange={value => update("ctaBody", value)} />
        <Field label="CTA link" value={page.ctaLink} onChange={value => update("ctaLink", value)} />
      </div>
    </div>
  </details>;
}
function AppDistributionManager({ page, onChange }) {
  const update = (field, value) => onChange({ ...emptyProductPage, ...page, [field]: value });
  const apps = page.apps || [];
  const updateApp = (index, field, value) => update("apps", apps.map((app, current) => current === index ? { ...app, [field]: value } : app));
  const add = type => update("apps", [...apps, { id: `app-${Date.now()}`, type, label: type === "android" ? "Google Play" : type === "ios" ? "App Store" : "Web app", description: "Available wherever work happens.", url: "", enabled: true }]);
  return <section className="app-distribution"><div className="composer-heading"><span>05 / APPS & PLATFORMS</span><p>Create VSM-style download cards for web, Android, iOS, or any platform.</p></div><div className="editor-grid"><Field wide label="Apps eyebrow" value={page.appsEyebrow} onChange={value => update("appsEyebrow", value)}/><Field label="Apps heading" value={page.appsTitle} onChange={value => update("appsTitle", value)}/><Field label="Apps description" textarea value={page.appsBody} onChange={value => update("appsBody", value)}/></div><div className="screenshot-actions"><button type="button" onClick={() => add("web")}>+ Web app</button><button type="button" onClick={() => add("android")}>+ Android app</button><button type="button" onClick={() => add("ios")}>+ iOS app</button></div>{apps.map((app, index) => <div className="platform-card-editor" key={app.id || index}><select value={app.type} onChange={e => updateApp(index, "type", e.target.value)}><option value="web">Web app</option><option value="android">Android</option><option value="ios">iOS</option></select><Field label="Card title" value={app.label} onChange={value => updateApp(index, "label", value)}/><Field label="Card detail" value={app.description} onChange={value => updateApp(index, "description", value)}/><Field label="Platform URL" value={app.url} onChange={value => updateApp(index, "url", value)}/><label className="publish-switch"><input type="checkbox" checked={app.enabled !== false} onChange={e => updateApp(index, "enabled", e.target.checked)}/><span>{app.enabled !== false ? "Available" : "Coming soon"}</span></label><button type="button" onClick={() => update("apps", apps.filter((_, current) => current !== index))}>Remove</button></div>)}</section>;
}
function ScreenshotManager({ screenshots, onChange, upload }) {
  const latest = useRef({ screenshots, onChange });
  latest.current = { screenshots, onChange };
  const [uploading, setUploading] = useState("");
  const [progress, setProgress] = useState({});
  const [localPreviews, setLocalPreviews] = useState({});
  const [error, setError] = useState("");
  const add = () => onChange([...screenshots, { id: `screen-${Date.now()}`, title: "A closer look at the experience", description: "Describe what this screen helps people accomplish.", desktopImageUrl: "", mobileImageUrl: "" }]);
  const update = (index, field, value) => onChange(screenshots.map((shot, current) => current === index ? { ...shot, [field]: value } : shot));
  const remove = index => onChange(screenshots.filter((_, current) => current !== index));
  const uploadImage = async (event, index, field, maxDimension) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const key = `${screenshots[index].id}-${field}`;
    const localPreview = URL.createObjectURL(file);
    setUploading(key);
    setProgress(current => ({ ...current, [key]: 0 }));
    setLocalPreviews(current => ({ ...current, [key]: localPreview }));
    setError("");
    try {
      const id = screenshots[index].id;
      const url = await upload(file, maxDimension, value => setProgress(current => ({ ...current, [key]: value })));
      URL.revokeObjectURL(localPreview);
      setLocalPreviews(current => ({ ...current, [key]: "" }));
      latest.current.onChange(latest.current.screenshots.map(shot => shot.id === id ? { ...shot, [field]: url } : shot));
    } catch {
      setError("Screenshot upload failed. Check Firebase Storage rules and try again.");
    } finally {
      setUploading("");
      setProgress(current => { const next = { ...current }; delete next[key]; return next; });
    }
  };
  return <section className="screenshot-manager"><div className="composer-heading"><span>04 / PRODUCT GALLERY</span><p>Add matching desktop and mobile views together. Images retain their original format and color profile.</p></div><div className="screenshot-actions"><button type="button" onClick={add}>+ Add screenshot set</button></div>{error && <p className="screenshot-error">{error}</p>}{screenshots.length === 0 ? <div className="screenshot-empty">No screenshots yet. Add a paired desktop and mobile view to make the product story tangible.</div> : <div className="screenshot-edit-list">{screenshots.map((shot, index) => <article key={shot.id || index} className="screenshot-edit-card"><div className="screenshot-edit-head"><span>RESPONSIVE SCREEN SET</span><button type="button" onClick={() => remove(index)}>Remove</button></div><div className="editor-grid"><Field label="Screen title" value={shot.title} onChange={value => update(index, "title", value)}/><Field wide label="What this screen does" textarea value={shot.description} onChange={value => update(index, "description", value)}/></div><div className="paired-screenshot-upload"><ScreenshotUpload label="Desktop screenshot" value={shot.desktopImageUrl || (shot.device !== "mobile" ? shot.imageUrl : "")} preview={localPreviews[`${shot.id}-desktopImageUrl`]} progress={progress[`${shot.id}-desktopImageUrl`]} loading={uploading === `${shot.id}-desktopImageUrl`} onFile={event => uploadImage(event, index, "desktopImageUrl", 1920)} onUrl={value => update(index, "desktopImageUrl", value)} /><ScreenshotUpload label="Mobile screenshot" value={shot.mobileImageUrl || (shot.device === "mobile" ? shot.imageUrl : "")} preview={localPreviews[`${shot.id}-mobileImageUrl`]} progress={progress[`${shot.id}-mobileImageUrl`]} loading={uploading === `${shot.id}-mobileImageUrl`} onFile={event => uploadImage(event, index, "mobileImageUrl", 1080)} onUrl={value => update(index, "mobileImageUrl", value)} /></div></article>)}</div>}</section>;
}
function ScreenshotUpload({ label, value, preview, progress, loading, onFile, onUrl }) { const image = preview || value; return <label className="screenshot-upload"><b>{label}</b><input type="file" accept="image/png,image/jpeg,image/webp" onChange={onFile}/><input value={value} placeholder="Or paste image URL" onChange={event => onUrl(event.target.value)}/><span>{loading ? `Uploading ${progress || 0}%…` : value ? "Original screenshot ready" : "PNG, JPG, or WebP — original colors preserved"}</span>{image && <img src={image} alt={`${label} preview`} />}{loading && <div className="upload-progress" role="progressbar" aria-label={`${label} upload progress`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress || 0}><i style={{ width: `${progress || 0}%` }} /><b>{progress || 0}%</b></div>}</label>; }
function SettingsBuilder({ draft, setDraft, publish, publishing, cancel }) {
  const update = (field, value) =>
    setDraft((current) => ({ ...current, [field]: value }));
  return (
    <form className="builder" onSubmit={publish}>
      <div className="builder-toolbar">
        <button type="button" onClick={cancel}>
          ← Back to content
        </button>
        <button className="admin-primary" disabled={publishing}>
          {publishing ? "Publishing…" : "Publish changes"}
        </button>
      </div>
      <div className="builder-grid">
        <section className="builder-form">
          <div className="builder-section-title">
            <span>HOMEPAGE</span>
            <h2>Set the first impression</h2>
          </div>
          <div className="editor-grid">
            <Field
              wide
              label="Eyebrow"
              value={draft.heroEyebrow}
              onChange={(value) => update("heroEyebrow", value)}
            />
            <Field
              wide
              label="Hero title"
              textarea
              value={draft.heroTitle}
              onChange={(value) => update("heroTitle", value)}
            />
            <Field
              wide
              label="Hero description"
              textarea
              value={draft.heroBody}
              onChange={(value) => update("heroBody", value)}
            />
            <Field
              label="Primary button"
              value={draft.heroPrimaryLabel}
              onChange={(value) => update("heroPrimaryLabel", value)}
            />
            <Field
              label="Primary link"
              value={draft.heroPrimaryLink}
              onChange={(value) => update("heroPrimaryLink", value)}
            />
            <Field
              label="Secondary button"
              value={draft.heroSecondaryLabel}
              onChange={(value) => update("heroSecondaryLabel", value)}
            />
            <Field
              label="Secondary link"
              value={draft.heroSecondaryLink}
              onChange={(value) => update("heroSecondaryLink", value)}
            />
          </div>
        </section>
        <aside className="builder-preview">
          <div className="preview-top">
            <span>HOMEPAGE PREVIEW</span>
            <span className="preview-dot">●</span>
          </div>
          <article className="home-preview">
            <span>{draft.heroEyebrow}</span>
            <h2>{draft.heroTitle}</h2>
            <p>{draft.heroBody}</p>
            <button type="button">{draft.heroPrimaryLabel}</button>
            <button type="button" className="ghost">
              {draft.heroSecondaryLabel}
            </button>
          </article>
        </aside>
      </div>
    </form>
  );
}
function Field({
  label,
  value,
  onChange,
  textarea,
  wide,
  hint,
  type = "text",
}) {
  return (
    <label className={wide ? "wide" : ""}>
      {label}
      {textarea ? (
        <textarea
          rows="4"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}{" "}
      {hint && <small>{hint}</small>}
    </label>
  );
}
function Preview({ section, draft }) {
  if (section === "portfolio")
    return (
      <article className="portfolio-preview-card">
        {draft.imageUrl ? (
          <img src={draft.imageUrl} alt="Preview" />
        ) : (
          <div className="preview-image-placeholder">PROJECT IMAGE</div>
        )}
        <div>
          <span>
            {(draft.tags || []).filter(Boolean).join(" · ") || "CASE STUDY"}
          </span>
          <h2>{draft.title || "Your project title"}</h2>
          <p>
            {draft.description || "A concise project story will appear here."}
          </p>
        </div>
      </article>
    );
  if (section === "products")
    return <ProductFullPreview draft={draft} />;
  return (
    <article className="product-preview-card">
      <span>SERVICE</span>
      <h2>{draft.title || "Your service"}</h2>
      <p>{draft.description || "A clear service proposition."}</p>
    </article>
  );
}
export function ProductFullPreview({ draft }) {
  const [view, setView] = useState("page");
  const [frameDocument, setFrameDocument] = useState(null);
  const [wide, setWide] = useState(false);
  useEffect(() => {
    if (!frameDocument) return;
    const copies = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]')).map(node => {
      const copy = node.cloneNode(true);
      frameDocument.head.appendChild(copy);
      return copy;
    });
    return () => copies.forEach(copy => copy.remove());
  }, [frameDocument]);
  return <div className="admin-product-preview">
    <div className="preview-controls">
      <button type="button" aria-pressed={view === "page"} onClick={() => setView("page")}>Product page</button>
      <button type="button" aria-pressed={view === "card"} onClick={() => setView("card")}>Product card</button>
      <label><input type="checkbox" checked={wide} onChange={event => setWide(event.target.checked)} />Desktop width</label>
    </div>
    <div className="preview-frame-scroll">
      <iframe title="Live product preview" style={{ width: wide ? 1024 : "100%" }} onLoad={event => setFrameDocument(event.currentTarget.contentDocument)} srcDoc={'<!doctype html><html><head></head><body><div id="preview-root"></div></body></html>'} />
      {frameDocument?.getElementById("preview-root") && createPortal(
        <div onClickCapture={event => { if (event.target.closest("a")) event.preventDefault(); }}>
          {view === "card" ? <Products previewProduct={draft} /> : <ProductPage product={draft} />}
        </div>, frameDocument.getElementById("preview-root"))}
    </div>
  </div>;
}
