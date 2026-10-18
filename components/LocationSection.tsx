"use client";

import { Clock, MapPin, Navigation, Star } from "lucide-react";
import { clinic } from "@/data/clinic";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { useLang } from "./useLang";
import { ui } from "@/data/i18n";
import { useHoursText } from "./WorkingHours";

export function LocationSection() {
  const lang = useLang();
  const t = ui[lang].location;
  const hours = useHoursText();

  return (
    <section aria-labelledby="location-title">
      <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:gap-14">
        <Reveal className="flex flex-col items-start gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold tracking-wide text-primary">{t.eyebrow}</span>
            <h2 id="location-title" className="text-3xl font-bold text-charcoal sm:text-4xl">
              {t.title}
            </h2>
          </div>
          <ul className="flex flex-col gap-5">
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint text-primary">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-charcoal">{t.address}</span>
                <span className="text-sm text-muted">{clinic.address}</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint text-primary">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-charcoal">{t.workHours}</span>
                {hours.map((line, i) => (
                  <span key={i} className="text-sm text-muted">
                    {line}
                  </span>
                ))}
              </span>
            </li>
          </ul>
          <a
            href={clinic.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 bg-surface px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-primary hover:text-primary"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            {t.openInMaps}
          </a>
        </Reveal>

        <Reveal delay={150}>
          <div className="h-full min-h-[320px] overflow-hidden rounded-2xl border border-charcoal/10">
            <iframe
              title={t.mapTitle}
              src={clinic.mapsEmbedUrl}
              className="h-full min-h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </Container>

      <Container className="mt-10">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-charcoal/10 bg-surface px-8 py-10 text-center">
            <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden="true">
              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
              <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
            </svg>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-charcoal">{t.rateOnGoogle}</h2>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                {t.rateText}
              </p>
            </div>
            <div className="flex items-center gap-1" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <a
              href={clinic.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <Star className="h-4 w-4" aria-hidden="true" />
              {t.rateButton}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
