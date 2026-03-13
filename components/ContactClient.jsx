"use client";

import Link from "next/link";
import { useState } from "react";

const helpOptions = [
  "Detection Engineering",
  "IR/DFIR",
  "SOC Automation",
  "CTI Automation",
  "Architecture",
];

export default function ContactClient() {
  const [activePath, setActivePath] = useState("recruiters");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    need: helpOptions[0],
    description: "",
    company_website: "",
  });

  const calUrl = process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/your-cal-link";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailOk) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setSubmitted(false);
    setError("");

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        service: formData.need,
        message: formData.description,
        company_website: formData.company_website,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to submit form");
        }
        setSubmitted(true);
        setFormData({
          name: "",
          company: "",
          email: "",
          need: helpOptions[0],
          description: "",
          company_website: "",
        });
      })
      .catch((err) => {
        setError(err.message || "Something went wrong. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const tabStyle = (path) =>
    activePath === path
      ? {
          border: "1px solid rgba(38,217,184,0.4)",
          background: "rgba(38,217,184,0.1)",
          color: "var(--accent)",
        }
      : {
          border: "1px solid transparent",
          color: "var(--ink-muted)",
        };

  return (
    <section className="space-y-6">
      <header className="section-card">
        <h1 className="section-title">Contact</h1>
        <p className="mt-3 text-sm" style={{ color: "var(--ink-muted)" }}>
          Connect for consulting engagements or senior Security Architect / Detection Engineering opportunities.
        </p>
      </header>

      <section className="section-card">
        <div className="inline-flex gap-1 rounded-xl p-1" style={{ background: "rgba(13,17,32,0.8)", border: "1px solid rgba(38,217,184,0.12)" }}>
          {["recruiters", "clients"].map((path) => (
            <button
              key={path}
              type="button"
              onClick={() => { setActivePath(path); setSubmitted(false); }}
              className="rounded-lg px-4 py-2 text-sm font-semibold capitalize transition"
              style={tabStyle(path)}
            >
              For {path}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {activePath === "recruiters" ? (
            <article
              className="rounded-xl p-6"
              style={{
                border: "1px solid rgba(38,217,184,0.2)",
                background: "rgba(38,217,184,0.04)",
              }}
            >
              <h3 className="text-xl font-bold" style={{ color: "var(--ink)" }}>
                For Recruiters
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>
                Hiring for remote senior Security Architect, Detection Engineering Lead, or SOC modernisation roles?
                Reach out directly — I respond within 24–48 hours.
              </p>

              {/* Quick contact info */}
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div
                  className="rounded-lg px-3 py-2.5"
                  style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(13,17,32,0.6)" }}
                >
                  <p className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>Email</p>
                  <a href="mailto:kh4r4nshu@gmail.com" className="mt-1 block text-sm text-cyan-200 hover:underline">
                    kh4r4nshu@gmail.com
                  </a>
                </div>
                <div
                  className="rounded-lg px-3 py-2.5"
                  style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(13,17,32,0.6)" }}
                >
                  <p className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>Location</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>Gurugram, India · Remote OK</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="mailto:kh4r4nshu@gmail.com"
                  className="rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{
                    border: "1px solid rgba(38,217,184,0.55)",
                    background: "rgba(38,217,184,0.1)",
                    color: "var(--accent)",
                  }}
                >
                  Email Me
                </a>
                <a
                  href="https://linkedin.com/in/jayesh"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{
                    border: "1px solid rgba(124,139,255,0.45)",
                    background: "rgba(124,139,255,0.08)",
                    color: "#a5b0ff",
                  }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Ashdex"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--ink-muted)",
                  }}
                >
                  GitHub
                </a>
                {/* Place resume PDF at /public/resume.pdf */}
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{
                    border: "1px solid rgba(251,191,36,0.4)",
                    background: "rgba(251,191,36,0.07)",
                    color: "#fbbf24",
                  }}
                >
                  Download Resume
                </a>
              </div>

              <p className="mt-4 font-mono text-xs" style={{ color: "var(--ink-muted)" }}>
                Current role: Lead Security Engineer · Payatu · Gurugram · May 2025 – Present
              </p>
            </article>
          ) : (
            <article
              className="rounded-xl p-6"
              style={{
                border: "1px solid rgba(124,139,255,0.2)",
                background: "rgba(124,139,255,0.04)",
              }}
            >
              <h3 className="text-xl font-bold" style={{ color: "var(--ink)" }}>
                For Clients
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>
                Share your current challenge and target outcomes. You will receive a practical architecture-first
                engagement path.
              </p>

              {submitted ? (
                <div
                  className="mt-5 rounded-xl p-4 text-sm"
                  style={{
                    border: "1px solid rgba(74,222,128,0.3)",
                    background: "rgba(74,222,128,0.08)",
                    color: "#86efac",
                  }}
                >
                  Thanks — your request has been received. I will get back to you within 24–48 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
                  <input
                    type="text"
                    name="company_website"
                    value={formData.company_website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm">
                      <span className="font-medium" style={{ color: "var(--ink)" }}>Name</span>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl px-3 py-2 outline-none transition"
                        style={{
                          border: "1px solid rgba(38,217,184,0.2)",
                          background: "rgba(13,17,32,0.8)",
                          color: "var(--ink)",
                        }}
                        placeholder="Your name"
                      />
                    </label>

                    <label className="space-y-2 text-sm">
                      <span className="font-medium" style={{ color: "var(--ink)" }}>Company</span>
                      <input
                        required
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-xl px-3 py-2 outline-none transition"
                        style={{
                          border: "1px solid rgba(38,217,184,0.2)",
                          background: "rgba(13,17,32,0.8)",
                          color: "var(--ink)",
                        }}
                        placeholder="Company name"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm">
                      <span className="font-medium" style={{ color: "var(--ink)" }}>Email</span>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl px-3 py-2 outline-none transition"
                        style={{
                          border: "1px solid rgba(38,217,184,0.2)",
                          background: "rgba(13,17,32,0.8)",
                          color: "var(--ink)",
                        }}
                        placeholder="you@company.com"
                      />
                    </label>

                    <label className="space-y-2 text-sm">
                      <span className="font-medium" style={{ color: "var(--ink)" }}>What you need help with</span>
                      <select
                        required
                        name="need"
                        value={formData.need}
                        onChange={handleChange}
                        className="w-full rounded-xl px-3 py-2 outline-none transition"
                        style={{
                          border: "1px solid rgba(38,217,184,0.2)",
                          background: "rgba(13,17,32,0.8)",
                          color: "var(--ink)",
                        }}
                      >
                        {helpOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="space-y-2 text-sm">
                    <span className="font-medium" style={{ color: "var(--ink)" }}>Short description of problem</span>
                    <textarea
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      className="w-full rounded-xl px-3 py-2 outline-none transition"
                      style={{
                        border: "1px solid rgba(38,217,184,0.2)",
                        background: "rgba(13,17,32,0.8)",
                        color: "var(--ink)",
                      }}
                      placeholder="Describe your current challenge and goals"
                    />
                  </label>

                  {error ? (
                    <p
                      className="rounded-xl p-3 text-sm"
                      style={{
                        border: "1px solid rgba(248,113,113,0.3)",
                        background: "rgba(248,113,113,0.08)",
                        color: "#fca5a5",
                      }}
                    >
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-fit rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
                    style={{
                      border: "1px solid rgba(38,217,184,0.55)",
                      background: "rgba(38,217,184,0.1)",
                      color: "var(--accent)",
                    }}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              )}
            </article>
          )}
        </div>
      </section>

      <section className="section-card">
        <h2 className="text-xl font-bold" style={{ color: "var(--ink)" }}>Book a Call</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>Prefer scheduling directly? Book a slot below.</p>
        <div
          className="mt-4 overflow-hidden rounded-xl"
          style={{ border: "1px solid rgba(38,217,184,0.15)" }}
        >
          <iframe
            title="Cal.com scheduling"
            src={calUrl}
            className="h-[700px] w-full"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </section>

      <section className="section-card">
        <h2 className="text-xl font-bold" style={{ color: "var(--ink)" }}>Availability & Expectations</h2>
        <div className="mt-3 space-y-2 text-sm" style={{ color: "var(--ink-muted)" }}>
          <p>
            <span className="font-semibold text-cyan-300">Typical response time:</span> 24–48 hours.
          </p>
          <p>
            <span className="font-semibold text-cyan-300">Preferred engagements:</span> architecture
            modernisation, detection uplift, and SOC automation initiatives.
          </p>
          <p>
            <span className="font-semibold text-cyan-300">Open to:</span> remote senior Security Architect,
            Detection Engineering Lead, and SOC Modernisation roles.
          </p>
        </div>
      </section>

      <section
        className="section-card"
        style={{
          borderColor: "rgba(124,139,255,0.25)",
          background:
            "linear-gradient(135deg, rgba(124,139,255,0.07) 0%, rgba(13,17,32,0.85) 60%, rgba(38,217,184,0.07) 100%)",
        }}
      >
        <h2 className="text-2xl font-bold text-white">Not sure what you need yet?</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/services"
            className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
            style={{
              border: "1px solid rgba(38,217,184,0.55)",
              background: "rgba(38,217,184,0.1)",
              color: "var(--accent)",
            }}
          >
            Explore Services
          </Link>
          <Link
            href="/projects"
            className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
            style={{
              border: "1px solid rgba(124,139,255,0.45)",
              background: "rgba(124,139,255,0.08)",
              color: "#a5b0ff",
            }}
          >
            View Projects
          </Link>
        </div>
      </section>
    </section>
  );
}
