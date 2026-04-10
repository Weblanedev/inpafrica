import type { MetadataRoute } from "next";
import { books } from "@/data/books";
import { getSiteUrl } from "@/lib/siteMetadata";

const staticPaths = [
  "/",
  "/about",
  "/contact",
  "/products",
  "/affiliate",
  "/vendor",
  "/faq",
  "/login",
  "/register",
  "/cart",
  "/privacy-policy",
  "/terms-of-service",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const bookEntries: MetadataRoute.Sitemap = books.map((b) => ({
    url: `${base}/products/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...bookEntries];
}
