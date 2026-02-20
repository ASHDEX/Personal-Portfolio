const timeline = [
  {
    period: "2024 - Present",
    role: "Independent Developer",
    details: "Building modern portfolio and operations-focused tools for web clients.",
  },
  {
    period: "2022 - 2024",
    role: "Full-Stack Engineer",
    details: "Delivered scalable dashboards and optimized backend services for reliability.",
  },
  {
    period: "2020 - 2022",
    role: "Frontend Developer",
    details: "Developed performant interfaces and reusable component systems.",
  },
];

export default function ExperiencePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
      <div className="space-y-3">
        {timeline.map((item) => (
          <article key={item.period} className="section-card">
            <p className="text-sm font-semibold text-teal-700">{item.period}</p>
            <h2 className="mt-1 text-xl font-semibold">{item.role}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.details}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
