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
  const [activePath, setActivePath] = useState("clients");
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

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-calendly-link";

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

  return (
    <section className="space-y-6">
      <header className="section-card">
        <h1 className="section-title">Contact</h1>
        <p className="mt-3 text-sm text-slate-300 sm:text-base">
          Let’s talk detection engineering, incident response, and security automation.
        </p>
      </header>

      <section className="section-card">
        <h2 className="text-lg font-bold text-cyan-100">Choose your path</h2>
        <div className="mt-4 inline-flex rounded-xl border border-cyan-300/30 bg-surface-800/60 p-1">
          {["recruiters", "clients"].map((path) => (
            <button
              key={path}
              type="button"
              onClick={() => {
                setActivePath(path);
                setSubmitted(false);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
                activePath === path
                  ? "bg-cyan-300/20 text-cyan-100"
                  : "text-slate-300 hover:bg-cyan-300/10 hover:text-cyan-200"
              }`}
            >
              For {path}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {activePath === "recruiters" ? (
            <article className="rounded-2xl border border-cyan-300/25 bg-surface-900/70 p-6">
              <h3 className="text-xl font-bold text-cyan-100">For Recruiters</h3>
              <p className="mt-3 text-sm text-slate-300">
                Hiring for detection engineering, cloud IR, or security automation roles? Reach out directly.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="mailto:your.email@example.com"
                  className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
                >
                  Email Me
                </a>
                <a
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-violet-300/60 bg-violet-300/10 px-4 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-300/20"
                >
                  LinkedIn
                </a>
              </div>

              <p className="mt-4 text-xs text-slate-400">Resume available on request.</p>
            </article>
          ) : (
            <article className="rounded-2xl border border-cyan-300/25 bg-surface-900/70 p-6">
              <h3 className="text-xl font-bold text-cyan-100">For Clients</h3>
              <p className="mt-2 text-sm text-slate-300">
                Share a quick brief and I’ll respond with a practical path forward.
              </p>

              {submitted ? (
                <div className="mt-5 rounded-xl border border-emerald-300/30 bg-emerald-300/10 p-4 text-sm text-emerald-200">
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
                      <span className="font-medium text-slate-200">Name</span>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-cyan-300/25 bg-surface-800/70 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/25"
                        placeholder="Your name"
                      />
                    </label>

                    <label className="space-y-2 text-sm">
                      <span className="font-medium text-slate-200">Company</span>
                      <input
                        required
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-cyan-300/25 bg-surface-800/70 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/25"
                        placeholder="Company name"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm">
                      <span className="font-medium text-slate-200">Email</span>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-cyan-300/25 bg-surface-800/70 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/25"
                        placeholder="you@company.com"
                      />
                    </label>

                    <label className="space-y-2 text-sm">
                      <span className="font-medium text-slate-200">What you need help with</span>
                      <select
                        required
                        name="need"
                        value={formData.need}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-cyan-300/25 bg-surface-800/70 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/25"
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
                    <span className="font-medium text-slate-200">Short description of problem</span>
                    <textarea
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      className="w-full rounded-xl border border-cyan-300/25 bg-surface-800/70 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/25"
                      placeholder="Describe your current challenge and goals"
                    />
                  </label>

                  {error ? (
                    <p className="rounded-xl border border-rose-300/35 bg-rose-300/10 p-3 text-sm text-rose-200">{error}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-fit rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
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
        <h2 className="text-xl font-bold text-cyan-100">Book a Call</h2>
        <p className="mt-2 text-sm text-slate-300">Prefer scheduling directly? Use Calendly below.</p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-300/25 bg-surface-900/70">
          <iframe
            title="Calendly scheduling"
            src={calendlyUrl}
            className="h-[700px] w-full"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-card">
        <h2 className="text-xl font-bold text-cyan-100">Availability & Expectations</h2>
        <div className="mt-3 space-y-2 text-sm text-slate-300">
          <p>
            <span className="font-semibold text-cyan-300">Typical response time:</span> 24–48 hours.
          </p>
          <p>
            <span className="font-semibold text-cyan-300">Preferred engagements:</span> short sprints, PoCs, and
            security automation builds.
          </p>
        </div>
      </section>

      <section className="section-card border-violet-300/35 bg-gradient-to-r from-violet-400/15 via-surface-900/80 to-cyan-400/15">
        <h2 className="text-2xl font-bold text-white">Not sure what you need yet?</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/services"
            className="rounded-full border border-cyan-300/60 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25"
          >
            Explore Services
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-violet-300/55 bg-violet-300/10 px-5 py-2.5 text-sm font-semibold text-violet-100 transition hover:bg-violet-300/20"
          >
            View Projects
          </Link>
        </div>
      </section>
    </section>
  );
}

