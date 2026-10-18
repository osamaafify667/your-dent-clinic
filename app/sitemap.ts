import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { siteUrl } from "@/data/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  const lastmod = new Date();

  const staticPaths = ["", "/services", "/team", "/about", "/appointment", "/contact", "/privacy-policy"];

  const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap((path) => {
    const ar = {
      url: `${base}${path}`,
      lastModified: lastmod,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          "ar-EG": `${base}${path}`,
          "en-US": `${base}/en${path}`,
        } as Record<string, string>,
      },
    };
    const en = {
      url: `${base}/en${path}`,
      lastModified: lastmod,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          "ar-EG": `${base}${path}`,
          "en-US": `${base}/en${path}`,
        } as Record<string, string>,
      },
    };
    return [ar, en];
  });

  const servicePages: MetadataRoute.Sitemap = services.flatMap((service) => {
    const ar = {
      url: `${base}/services/${service.slug}`,
      lastModified: lastmod,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          "ar-EG": `${base}/services/${service.slug}`,
          "en-US": `${base}/en/services/${service.slug}`,
        } as Record<string, string>,
      },
    };
    const en = {
      url: `${base}/en/services/${service.slug}`,
      lastModified: lastmod,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          "ar-EG": `${base}/services/${service.slug}`,
          "en-US": `${base}/en/services/${service.slug}`,
        } as Record<string, string>,
      },
    };
    return [ar, en];
  });

  return [...staticPages, ...servicePages];
}
