import type { Metadata } from "next";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { clinic, siteUrl, whatsappLink } from "@/data/clinic";
import { Container } from "@/components/Container";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "احجز موعدك",
  description:
    "أرسل طلب حجز موعد في Your Dent Clinic بالمعادي عبر نموذج بسيط، وسيتواصل معك فريق العيادة لتأكيد الموعد.",
  alternates: { canonical: "/appointment" },
  openGraph: {
    url: `${siteUrl}/appointment`,
    title: "احجز موعدك | Your Dent Clinic",
    description: "اطلب حجز موعد في Your Dent Clinic بالمعادي، القاهرة.",
  },
};

const contactChannels = [
  {
    icon: MessageCircle,
    title: "واتساب",
    text: "أرسل رسالة مباشرة على رقم العيادة.",
    link: { href: whatsappLink("مرحباً، أرغب في حجز موعد."), label: "فتح واتساب" },
  },
  {
    icon: Phone,
    title: "اتصال هاتفي",
    text: clinic.mobile,
    link: { href: `tel:${clinic.mobile}`, label: "اتصل الآن" },
  },
  {
    icon: Mail,
    title: "بريد إلكتروني",
    text: clinic.email,
    link: { href: `mailto:${clinic.email}`, label: "أرسل بريداً" },
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    text: "السبت – الخميس: 4 – 11 مساءً. الجمعة: مغلق.",
    link: { href: clinic.mapsUrl, label: "الموقع على الخريطة" },
  },
];

export default function AppointmentPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <span className="text-sm font-semibold tracking-wide text-primary">احجز موعدك</span>
          <h1 id="page-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            طلب حجز موعد
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            املأ النموذج وسيتم تحويلك إلى واتساب لإرسال طلبك. سيتواصل معك فريق العيادة لمناقشة
            التفاصيل وتأكيد الموعد المناسب.
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
              <h2 className="text-lg font-bold text-charcoal">طرق تواصل أخرى</h2>
              <p className="text-sm leading-relaxed text-muted">
                إذا كنت تفضل التواصل مباشرة، يمكنك استخدام أي من القنوات التالية خلال ساعات العمل.
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
