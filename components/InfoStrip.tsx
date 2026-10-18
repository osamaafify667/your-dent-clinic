"use client";

import Link from "next/link";
import { CalendarCheck, MapPin, Phone } from "lucide-react";
import { clinic } from "@/data/clinic";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { useLang } from "./useLang";
import { ui } from "@/data/i18n";

export function InfoStrip() {
  const lang = useLang();
  const t = ui[lang];
  const copy = {
    ar: {
      callUs: "اتصل بنا",
      book: "احجز موعدك",
      bookText: "أرسل طلب حجز عبر واتساب",
      location: "موقعنا",
      area: "المعادي، القاهرة",
    },
    en: {
      callUs: "Call Us",
      book: "Book Appointment",
      bookText: "Send a booking request via WhatsApp",
      location: "Our Location",
      area: "Maadi, Cairo",
    },
  }[lang];

  const items = [
    {
      icon: Phone,
      title: copy.callUs,
      text: clinic.mobile,
      href: `tel:${clinic.mobile}`,
      ltr: true,
    },
    {
      icon: CalendarCheck,
      title: copy.book,
      text: copy.bookText,
      href: lang === "ar" ? "/appointment" : "/en/appointment",
      ltr: false,
    },
    {
      icon: MapPin,
      title: copy.location,
      text: copy.area,
      href: clinic.mapsUrl,
      ltr: false,
    },
  ];

  return (
    <section aria-label={lang === "ar" ? "معلومات سريعة" : "Quick info"} className="border-y border-charcoal/10 bg-surface">
      <Container className="grid gap-6 py-8 sm:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 100}>
            <Link
              href={item.href}
              {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-4 rounded-xl p-2 transition-colors"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mint text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-charcoal">{item.title}</span>
                <span
                  className="text-sm text-muted"
                  {...(item.ltr ? { dir: "ltr" as const } : {})}
                >
                  {item.text}
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
