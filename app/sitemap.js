export default function sitemap() {
  const baseUrl = "https://ashdex.me";
  const routes = [
    "",
    "/about",
    "/projects",
    "/services",
    "/experience",
    "/certifications",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}

