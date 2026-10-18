import type { Metadata } from "next";
import { Clock, Mail, MessageCircle, Phone, Facebook } from "lucide-react";
import { clinic, siteUrl, whatsappLink } from "@/data/clinic";
import { Container } from "@/components/Container";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Request an appointment at Your Dent Clinic in Maadi through a simple form, and the clinic team will contact you to confirm your appointment.",
  alternates: { canonical: "/en/appointment" },
  openGraph: {
    url: `${siteUrl}/en/appointment`,
    title: "Book Appointment | Your Dent Clinic",
    description: "Request an appointment at Your Dent Clinic in Maadi, Cairo.",
  },
};

const contactChannels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Send a direct message to the clinic number.",
    link: { href: whatsappLink("Hello, I would like to book an appointment."), label: "Open WhatsApp" },
  },
  {
    icon: Phone,
    title: "Phone Call",
    text: clinic.mobile,
    link: { href: `tel:${clinic.mobile}`, label: "Call Now" },
  },
  {
    icon: Mail,
    title: "Email",
    text: clinic.email,
    link: { href: `mailto:${clinic.email}`, label: "Send Email" },
  },
  {
    icon: Clock,
    title: "Working Hours",
    text: "Sat – Thu: 4 PM – 11 PM. Friday: Closed.",
    link: { href: clinic.mapsUrl, label: "Location on Map" },
  },
  {
    icon: Facebook,
    title: "Facebook",
    text: "Follow us on Facebook for the latest updates.",
    link: { href: clinic.facebook, label: "Visit Facebook Page" },
  },
];

export default function AppointmentPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <span className="text-sm font-semibold tracking-wide text-primary">Book Appointment</span>
          <h1 id="page-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            Appointment Request
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Fill out the form and you will be redirected to WhatsApp to send your request. The
            clinic team will contact you to discuss details and confirm the suitable appointment.
          </p>
        </Container>
      </section>

      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-5 lg:gap-14">
        <Reveal className="lg:col-span-3">
          <div className="rounded-2xl border border-charcoal/10 bg-surface p-7 sm:p-9">
            <AppointmentForm />
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-2">
          <aside className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 rounded-2xl bg-mint/60 p-7">
              <h2 className="text-lg font-bold text-charcoal">Other contact methods</h2>
              <p className="text-sm leading-relaxed text-muted">
                If you prefer direct contact, you can use any of the following channels during
                working hours.
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {contactChannels.map((channel) => (
                <li
                  key={channel.title}
                  className="flex items-start gap-4 rounded-2xl border border-charcoal/10 bg-surface p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint text-primary">
                    <channel.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-1 flex-col gap-1.5">
                    <span className="text-sm font-semibold text-charcoal">{channel.title}</span>
                    <span className="text-sm text-muted">{channel.text}</span>
                    <a
                      href={channel.link.href}
                      target={channel.link.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                    >
                      {channel.link.label}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </Container>
    </>
  );
}
