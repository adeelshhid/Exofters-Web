import React, { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../lib/firebase";
import { useContent } from "../../content/ContentProvider";
import "./Admin.css";

const newItem = {
  products: {
    name: "",
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
    .replace(/on\w+\s*=\s*(["']).*?\1/gi, "");
const makeId = (text) =>
  (text || "content")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 52);

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
  const upload = async (file) => {
    const filename = file.name.replace(/[^a-z0-9._-]/gi, "-");
    const uploadRef = ref(
      storage,
      `content/${section}/${Date.now()}-${filename}`,
    );
    const result = await uploadBytes(uploadRef, file, {
      contentType: file.type,
    });
    return getDownloadURL(result.ref);
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
      update("imageUrl", await upload(file));
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
        <button className="admin-primary" disabled={publishing}>
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
            <label className="html-field">
              Product introduction HTML{" "}
              <span>Scripts and inline handlers are removed on publish.</span>
              <textarea
                value={draft.introHtml || ""}
                onChange={(e) => update("introHtml", e.target.value)}
              />
            </label>
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
    return (
      <article className="product-preview-card">
        <span>{draft.badge || "PRODUCT"}</span>
        <h2>{draft.name || "Your product"}</h2>
        <h3>{draft.tagline || "A compelling product tagline"}</h3>
        <p>{draft.description || "Explain why this product matters."}</p>
        <div
          className="preview-html"
          dangerouslySetInnerHTML={{ __html: scrubHtml(draft.introHtml) }}
        />
        <button type="button">
          {draft.primaryText || "Explore product"} →
        </button>
      </article>
    );
  return (
    <article className="product-preview-card">
      <span>SERVICE</span>
      <h2>{draft.title || "Your service"}</h2>
      <p>{draft.description || "A clear service proposition."}</p>
    </article>
  );
}
