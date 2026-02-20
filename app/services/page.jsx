const services = [
  "Full-Stack Web Development",
  "Performance Optimization",
  "API Design and Integration",
  "UI Modernization",
  "Deployment and Production Hardening",
];

export default function ServicesPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Services</h1>
      <p className="text-slate-600">Technical services for building and improving production web systems.</p>
      <ul className="grid gap-3 md:grid-cols-2">
        {services.map((service) => (
          <li key={service} className="section-card font-medium">
            {service}
          </li>
        ))}
      </ul>
    </section>
  );
}
