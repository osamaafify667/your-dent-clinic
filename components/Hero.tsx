"use client";

import Link from "next/link";
import { ArrowLeft, CalendarCheck, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { clinic } from "@/data/clinic";
import { Reveal } from "./Reveal";
import { useLang } from "./useLang";
import { ui } from "@/data/i18n";

export function Hero() {
  const lang = useLang();
  const t = ui[lang];
  const appointmentHref = lang === "ar" ? "/appointment" : "/en/appointment";
  const servicesHref = lang === "ar" ? "/services" : "/en/services";
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setIsOpen(data.isOpen);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const heroCopy = {
    ar: {
      tagline: isOpen === false ? "نورنا بكرة لأننا قفلنا" : isOpen === true ? "العيادة مفتوحة الآن" : "عيادة أسنان في المعادي، القاهرة",
      title: "ابتسامتك تستحق عناية أفضل.",
      text: "تعرّف على خدمات الأسنان المتاحة في Your Dent Clinic، واستكشف خيارات الرعاية المناسبة لك، وتواصل مع فريق العيادة للاستفسار عن المواعيد.",
      primary: "احجز موعدك",
      secondary: "اكتشف خدماتنا",
      hoursTitle: "ساعات العمل",
      hoursValue: "السبت – الخميس: 4 – 11 مساءً",
    },
    en: {
      tagline: isOpen === false ? "See you tomorrow — we are closed" : isOpen === true ? "The clinic is open now" : "Dental clinic in Maadi, Cairo",
      title: "Your smile deserves better care.",
      text: "Discover the dental services available at Your Dent Clinic, explore the right care options for you, and contact the clinic team to inquire about appointments.",
      primary: "Book Appointment",
      secondary: "Explore Our Services",
      hoursTitle: "Working Hours",
      hoursValue: "Sat – Thu: 4 PM – 11 PM",
    },
  }[lang];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium ${
                isOpen === false
                  ? "border-amber-300 bg-amber-50 text-amber-700"
                  : "border-primary/20 bg-mint text-primary"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${isOpen === false ? "bg-amber-500" : "bg-primary"}`}
                aria-hidden="true"
              />
              {heroCopy.tagline}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1
              id="hero-title"
              className="text-4xl font-bold leading-[1.25] text-charcoal sm:text-5xl lg:text-[3.4rem]"
            >
              {heroCopy.title}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              {heroCopy.text}
            </p>
          </Reveal>
          <Reveal delay={300} className="flex flex-wrap items-center gap-4">
            <Link
              href={appointmentHref}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              {heroCopy.primary}
            </Link>
            <Link
              href={servicesHref}
              className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 bg-surface px-7 py-3.5 text-base font-semibold text-charcoal transition-colors hover:border-primary hover:text-primary"
            >
              {heroCopy.secondary}
              <ArrowLeft className={`h-5 w-5 ${lang === "en" ? "rotate-180" : ""}`} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto max-w-lg">
            <img
              src="/images/hero.svg"
              alt={lang === "ar" ? "رسم توضيحي لعيادة Your Dent Clinic" : "Your Dent Clinic illustration"}
              className="w-full"
              width={800}
              height={640}
            />
            <div className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-xl border border-charcoal/10 bg-surface px-5 py-4 shadow-lg shadow-charcoal/5 sm:right-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint text-primary">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-charcoal">{heroCopy.hoursTitle}</span>
                <span className="text-xs text-muted">{heroCopy.hoursValue}</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
