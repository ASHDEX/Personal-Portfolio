import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ashdex.me";
  const routes = ["", "/about", "/projects", "/services", "/consulting", "/experience", "/certifications", "/contact"];
  const projectRoutes = [
    "/projects/security-architecture-design",
    "/projects/detection-engineering-framework",
    "/projects/soc-automation-pipeline",
    "/projects/opencti-platform",
    "/projects/cti-dashboard",
    "/projects/domain-monitoring",
    "/projects/ioc-enrichment",
  ];

  return [...routes, ...projectRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/projects/") ? 0.75 : 0.8,
  }));
}

