"use client";

import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Baby,
  Bone,
  Droplets,
  Smile,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "./useLang";

type ServiceIcon = "smile" | "sparkles" | "bone" | "wrench" | "activity" | "droplets" | "baby";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  smile: Smile,
  sparkles: Sparkles,
  bone: Bone,
  wrench: Wrench,
  activity: Activity,
  droplets: Droplets,
  baby: Baby,
};

export function ServiceCard({
  service,
}: {
  service: {
    slug: string;
    title: string;
    titleEn: string;
    shortDescription: string;
    shortDescriptionEn: string;
    icon: ServiceIcon;
    image?: string;
  };
}) {
  const lang = useLang();
  const Icon = iconMap[service.icon];
  const title = lang === "ar" ? service.title : service.titleEn;
  const description = lang === "ar" ? service.shortDescription : service.shortDescriptionEn;
  const moreLabel = lang === "ar" ? "اعرف المزيد" : "Learn more";

  return (
    <article className="group flex h-full flex-col gap-4 rounded-2xl border border-charcoal/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-charcoal/5">
      {service.image ? (
        <div className="overflow-hidden rounded-xl border border-charcoal/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={title}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={300}
            loading="lazy"
          />
        </div>
      ) : (
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      )}
      <h3 className="text-xl font-bold text-charcoal">{title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-muted">{description}</p>
      <Link
        href={lang === "ar" ? `/services/${service.slug}` : `/en/services/${service.slug}`}
        className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        aria-label={`${moreLabel} — ${title}`}
      >
        {moreLabel}
        <ArrowLeft className={`h-4 w-4 transition-transform group-hover:-translate-x-1 ${lang === "en" ? "rotate-180" : ""}`} aria-hidden="true" />
      </Link>
    </article>
  );
}
