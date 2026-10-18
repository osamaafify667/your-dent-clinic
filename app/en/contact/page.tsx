import type { Metadata } from "next";
import { Clock, Facebook, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { clinic, siteUrl, whatsappLink } from "@/data/clinic";
import { Container } from "@/components/Container";
import { LocationSection } from "@/components/LocationSection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Your Dent Clinic in Maadi, Cairo: phone, WhatsApp, email, address, and working hours.",
  alternates: { canonical: "/en/contact" },
  openGraph: {
    url: `${siteUrl}/en/contact`,
    title: "Contact Us | Your Dent Clinic",
    description: "Contact information for Your Dent Clinic in Maadi, Cairo.",
  },
};

const channels = [
  {
    icon: Phone,
    title: "Mobile",
    value: clinic.mobile,
    href: `tel:${clinic.mobile}`,
    ltr: true,
  },
  {
    icon: Phone,
    title: "Landline",
    value: clinic.landline,
    href: `tel:${clinic.landline}`,
    ltr: true,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: clinic.mobile,
    href: whatsappLink("Hello, I would like to inquire about the clinic's services."),
    ltr: true,
  },
  {
    icon: Mail,
    title: "Email",
    value: clinic.email,
    href: `mailto:${clinic.email}`,
    ltr: true,
  },
  {
    icon: Facebook,
    title: "Facebook",
    value: "Your Dent Clinic on Facebook",
    href: clinic.facebook,
    ltr: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <span className="text-sm font-semibold tracking-wide text-primary">Contact Us</span>
          <h1 id="page-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            We Hear From You
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            For any inquiry about services or appointments, contact us through the channel that
            suits you during working hours.
          </p>
        </Container>
      </section>

      <Container className="grid gap-6 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-3">
        {channels.map((channel, i) => (
          <Reveal key={channel.title} delay={i * 100}>
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-charcoal/10 bg-surface p-7 transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <channel.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-charcoal">{channel.title}</span>
                <span className="text-sm text-muted" dir={channel.ltr ? "ltr" : undefined}>
                  {channel.value}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </Container>

      <section aria-labelledby="hours-title" className="border-y border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-8 py-14">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-primary">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h2 id="hours-title" className="text-xl font-bold text-charcoal">
                Working Hours
              </h2>
              {clinic.hours.map((h) => (
                <p key={h.days} className="text-sm text-muted">
                  {h.days}: {h.hours}
                </p>
              ))}
              <p className="text-sm text-muted">Friday: Closed</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-primary">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-charcoal">Address</h2>
              <p className="text-sm text-muted">{clinic.address}</p>
            </div>
          </div>
        </Container>
      </section>

      <LocationSection />
    </>
  );
}
