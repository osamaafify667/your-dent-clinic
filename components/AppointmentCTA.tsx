"use client";

import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { useLang } from "./useLang";
import { ui } from "@/data/i18n";

export function AppointmentCTA() {
  const lang = useLang();
  const t = ui[lang];
  const copy = {
    ar: {
      title: "جاهز تخطو أول خطوة؟",
      text: "تواصل مع العيادة للاستفسار عن الخدمات المتاحة والمواعيد المناسبة لك.",
      button: "احجز موعدك",
    },
    en: {
      title: "Ready to take the first step?",
      text: "Contact the clinic to inquire about available services and suitable appointment times.",
      button: "Book Appointment",
    },
  }[lang];

  return (
    <section aria-labelledby="cta-title" className="bg-primary">
      <Container className="flex flex-col items-center gap-6 py-16 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <h2 id="cta-title" className="text-3xl font-bold text-white sm:text-4xl">
            {copy.title}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/85">
            {copy.text}
          </p>
        </Reveal>
        <Reveal delay={150}>
          <Link
            href={lang === "ar" ? "/appointment" : "/en/appointment"}
            className="inline-flex items-center gap-2 rounded-lg bg-surface px-8 py-3.5 text-base font-semibold text-primary transition-colors hover:bg-mint"
          >
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            {copy.button}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
