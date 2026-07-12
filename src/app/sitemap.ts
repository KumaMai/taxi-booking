import type { MetadataRoute } from "next";

const publicRoutes = ["", "/about", "/booking", "/contact", "/price-list", "/qa", "/reviews", "/travel"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return publicRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: route === "/price-list" || route === "/reviews" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/booking" ? 0.9 : 0.7 }));
}
