"use client";

import Link from "next/link";
import { ArrowLeft, BadgeCheck, CalendarCheck, Clock, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/Hero";
import { InfoStrip } from "@/components/InfoStrip";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { AppointmentCTA } from "@/components/AppointmentCTA";
import { LocationSection } from "@/components/LocationSection";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { clinic } from "@/data/clinic";
import { useLang } from "@/components/useLang";
import { StatusBanner } from "@/components/StatusBanner";
import { useEffect, useState } from "react";
import type { ServiceRecord } from "@/lib/store";
import { teamSectionVisible } from "@/data/content";

const copy = {
  ar: {
    servicesEyebrow: "خدماتنا",
    servicesTitle: "رعاية أسنان تناسب احتياجاتك",
    servicesDesc: "نقدم مجموعة متنوعة من خدمات طب الأسنان. اختر الخدمة لمعرفة المزيد عن الإجراء وما يمكن توقعه.",
    viewAll: "عرض جميع الخدمات",
    aboutEyebrow: "عن العيادة",
    aboutTitle: "عيادة تهتم بابتسامتك من أول زيارة",
    aboutText: "Your Dent Clinic عيادة أسنان في قلب المعادي على كورنيش النيل. نؤمن أن رحلة العلاج تبدأ بفهم احتياجاتك، لذلك نخصص وقتاً للاستماع إليك وشرح الخيارات المتاحة قبل أي إجراء.",
    aboutPoints: [
      "فحص شامل ومناقشة الخيارات قبل العلاج",
      "خطة رعاية مخصصة لكل مريض",
      "متابعة بعد الإجراء لضمان راحتك",
    ],
    aboutLink: "اعرف المزيد عنا",
    teamEyebrow: "فريقنا",
    teamTitle: "فريق طبي متخصص",
    teamDesc: "تعرف على الأطباء والفريق الطبي في عيادتنا.",
    featuresEyebrow: "لماذا نحن",
    featuresTitle: "رعاية مصممة لراحتك",
    featuresDesc: "تفاصيل عملية تجعل تجربتك في العيادة أسهل.",
    features: [
      { icon: CalendarCheck, title: "حجز مسبق عبر واتساب", text: "أرسل طلبك واختر الموعد المناسب، ويتواصل معك فريق العيادة للتأكيد." },
      { icon: Clock, title: "مواعيد مسائية", text: "متاحون من السبت إلى الخميس من 4 مساءً حتى 11 مساءً لتناسب دوامك." },
      { icon: MapPin, title: "موقع مميز في المعادي", text: "برج عثمان على كورنيش النيل، مع سهولة الوصول والمواقف." },
      { icon: ShieldCheck, title: "بياناتك محمية", text: "لا نجمع سوى البيانات اللازمة للرد على طلبك، وفقاً لسياسة الخصوصية." },
    ],
    directCall: "تفضل الاتصال المباشر؟",
    directCallText: "فريق العيادة متاح للرد على استفساراتك خلال ساعات العمل.",
    callNow: "اتصل الآن",
    contactPage: "صفحة التواصل",
  },
  en: {
    servicesEyebrow: "Our Services",
    servicesTitle: "Dental Care for Your Needs",
    servicesDesc: "We offer a wide range of dental services. Choose a service to learn more about the procedure and what to expect.",
    viewAll: "View All Services",
    aboutEyebrow: "About Us",
    aboutTitle: "A clinic that cares about your smile from the first visit",
    aboutText: "Your Dent Clinic is a dental clinic in the heart of Maadi on the Nile Corniche. We believe that the treatment journey starts with understanding your needs, so we take the time to listen to you and explain the available options before any procedure.",
    aboutPoints: [
      "Comprehensive examination and discussion of options before treatment",
      "A customized care plan for each patient",
      "Follow-up after the procedure to ensure your comfort",
    ],
    aboutLink: "Learn More About Us",
    teamEyebrow: "Our Team",
    teamTitle: "A Specialized Medical Team",
    teamDesc: "Meet the doctors and medical team at our clinic.",
    featuresEyebrow: "Why Us",
    featuresTitle: "Care Designed for Your Comfort",
    featuresDesc: "Practical details that make your clinic experience easier.",
    features: [
      { icon: CalendarCheck, title: "Advance booking via WhatsApp", text: "Send your request and choose a suitable time, and the clinic team will contact you to confirm." },
      { icon: Clock, title: "Evening hours", text: "Available Saturday to Thursday from 4 PM to 11 PM to suit your schedule." },
      { icon: MapPin, title: "Prime location in Maadi", text: "Othman Towers on the Nile Corniche, with easy access and parking." },
      { icon: ShieldCheck, title: "Your data is protected", text: "We only collect the data necessary to respond to your request, in accordance with the privacy policy." },
    ],
    directCall: "Prefer a direct call?",
    directCallText: "The clinic team is available to answer your inquiries during working hours.",
    callNow: "Call Now",
    contactPage: "Contact Page",
  },
};

export default function HomePage() {
  const lang = useLang();
  const t = copy[lang];
  const isAr = lang === "ar";
  const [services, setServices] = useState<ServiceRecord[]>([]);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setServices(data.services || []))
      .catch(() => {});
  }, []);

  return (
    <>
      <StatusBanner />
      <Hero />
      <InfoStrip />

      <section aria-labelledby="services-title">
        <Container className="flex flex-col gap-12 py-16 sm:py-20">
          <SectionHeading
            eyebrow={t.servicesEyebrow}
            title={t.servicesTitle}
            description={t.servicesDesc}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 100}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
          <Reveal className="flex justify-center">
            <Link
              href={isAr ? "/services" : "/en/services"}
              className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 bg-surface px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-primary hover:text-primary"
            >
              {t.viewAll}
              <ArrowLeft className={`h-4 w-4 ${isAr ? "" : "rotate-180"}`} aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="about-title" className="border-y border-charcoal/10 bg-surface">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <img
              src="/images/about.svg"
              alt={isAr ? "رسم توضيحي عن عيادة Your Dent Clinic" : "About Your Dent Clinic illustration"}
              className="mx-auto w-full max-w-md"
              width={800}
              height={640}
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={150} className="order-1 flex flex-col items-start gap-6 lg:order-2">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold tracking-wide text-primary">{t.aboutEyebrow}</span>
              <h2 id="about-title" className="text-3xl font-bold leading-snug text-charcoal sm:text-4xl">
                {t.aboutTitle}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted">{t.aboutText}</p>
            <ul className="flex flex-col gap-3">
              {t.aboutPoints.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={isAr ? "/about" : "/en/about"}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {t.aboutLink}
              <ArrowLeft className={`h-4 w-4 ${isAr ? "" : "rotate-180"}`} aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </section>

      {teamSectionVisible && (
        <section aria-labelledby="team-title">
          <Container className="flex flex-col gap-12 py-16 sm:py-20">
            <SectionHeading eyebrow={t.teamEyebrow} title={t.teamTitle} description={t.teamDesc} />
          </Container>
        </section>
      )}

      <section aria-labelledby="features-title" className="bg-mint/40">
        <Container className="flex flex-col gap-12 py-16 sm:py-20">
          <SectionHeading
            eyebrow={t.featuresEyebrow}
            title={t.featuresTitle}
            description={t.featuresDesc}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 100}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-charcoal/10 bg-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-primary">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold text-charcoal">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{feature.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <AppointmentCTA />
      <LocationSection />

      <section aria-label={isAr ? "تواصل سريع" : "Quick contact"} className="border-t border-charcoal/10 bg-surface">
        <Container className="flex flex-col items-center gap-6 py-12 text-center">
          <h2 className="text-2xl font-bold text-charcoal">{t.directCall}</h2>
          <p className="max-w-lg text-sm leading-relaxed text-muted">{t.directCallText}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${clinic.mobile}`}
              className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-primary hover:text-primary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span dir="ltr">{clinic.mobile}</span>
            </a>
            <Link
              href={isAr ? "/contact" : "/en/contact"}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {t.contactPage}
              <ArrowLeft className={`h-4 w-4 ${isAr ? "" : "rotate-180"}`} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
