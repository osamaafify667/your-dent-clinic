"use client";

import Link from "next/link";
import { Clock, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { clinic } from "@/data/clinic";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { useLang } from "./useLang";
import { ui } from "@/data/i18n";
import { useHoursText } from "./WorkingHours";

export function Footer() {
  const lang = useLang();
  const t = ui[lang];
  const homeHref = lang === "ar" ? "/" : "/en";
  const hours = useHoursText();

  const quickLinks = [
    { href: lang === "ar" ? "/services" : "/en/services", label: t.nav.services },
    { href: lang === "ar" ? "/team" : "/en/team", label: t.nav.team },
    { href: lang === "ar" ? "/about" : "/en/about", label: t.nav.about },
    { href: lang === "ar" ? "/appointment" : "/en/appointment", label: t.bookCta },
    { href: lang === "ar" ? "/contact" : "/en/contact", label: t.nav.contact },
    { href: lang === "ar" ? "/privacy-policy" : "/en/privacy-policy", label: t.privacy },
  ];

  return (
    <footer className="bg-charcoal text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo dark />
          <p className="text-sm leading-relaxed text-white/70">{t.footer.description}</p>
        </div>

        <nav aria-label={t.quickLinks}>
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-white/90">{t.quickLinks}</h2>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-white/90">{t.contactUs}</h2>
          <ul className="flex flex-col gap-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{clinic.address}</span>
            </li>
            <li>
              <a href={`tel:${clinic.mobile}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span dir="ltr">{clinic.mobile}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${clinic.email}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {clinic.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-white/90">{t.followUs}</h2>
            <a
              href={clinic.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white"
              aria-label={`${clinic.name} — ${t.facebook}`}
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
              {t.facebook}
            </a>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-white/90">{t.hours}</h2>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              {hours.map((line, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            {clinic.hoursVerified === false && (
              <p className="mt-3 text-xs text-white/50">{clinic.hoursNote}</p>
            )}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {clinic.name}. {t.rights}</p>
          <Link href={lang === "ar" ? "/privacy-policy" : "/en/privacy-policy"} className="transition-colors hover:text-white">
            {t.privacy}
          </Link>
        </Container>
      </div>
    </footer>
  );
}
