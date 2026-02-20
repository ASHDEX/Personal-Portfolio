const projects = [
  {
    name: "Threat Intel Dashboard",
    stack: "Next.js, Node.js, API Integration",
    summary: "Aggregates and categorizes cybersecurity feeds into a searchable interface.",
  },
  {
    name: "Portfolio CMS",
    stack: "React, Express, SQLite",
    summary: "Simple content management workflow for portfolio updates.",
  },
  {
    name: "Realtime Ops Panel",
    stack: "WebSockets, Redis, Node.js",
    summary: "Monitors uptime, incidents, and service health in realtime.",
  },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="text-slate-600">Selected work focused on reliability, speed, and practical impact.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.name} className="section-card">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="mt-1 text-sm text-teal-700">{project.stack}</p>
            <p className="mt-3 text-sm text-slate-600">{project.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
