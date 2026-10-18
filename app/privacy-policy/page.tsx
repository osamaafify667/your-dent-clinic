import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { clinic, siteUrl } from "@/data/clinic";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description:
    "سياسة الخصوصية الخاصة بموقع Your Dent Clinic: البيانات التي نجمعها وكيفية استخدامها وحقوقك.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    url: `${siteUrl}/privacy-policy`,
    title: "سياسة الخصوصية | Your Dent Clinic",
    description: "سياسة الخصوصية الخاصة بموقع Your Dent Clinic.",
  },
};

const sections = [
  {
    title: "البيانات التي نجمعها",
    content: [
      "عند إرسال طلب حجز عبر نموذج الموقع، نجمع البيانات التي تدخلها طوعاً فقط: الاسم، رقم الهاتف، الخدمة المطلوبة، التاريخ والوقت المفضلين، وطريقة التواصل المفضلة.",
      "لا نجمع أي بيانات طبية أو صحية حساسة عبر هذا الموقع، ولا نطلب أي معلومات لا تتعلق مباشرة بالرد على طلب الحجز.",
    ],
  },
  {
    title: "كيف نستخدم بياناتك",
    content: [
      "تُستخدم البيانات المقدمة لغرض واحد فقط: التواصل معك للرد على طلب الحجز أو الاستفسار وتنسيق الموعد المناسب.",
      "عند إرسال الطلب، يتم تحويلك إلى تطبيق واتساب لإكمال الإرسال، وتخضع أي بيانات يتم تبادلها عبر واتساب لسياسة الخصوصية الخاصة بواتساب.",
    ],
  },
  {
    title: "مشاركة البيانات",
    content: [
      "لا نبيع بياناتك الشخصية ولا نشاركها مع أي طرف ثالث لأغراض تسويقية.",
      "قد نشارك البيانات فقط عند الالتزام القانوني بذلك أو عند الضرورة لتقديم الخدمة المطلوبة (مثل التواصل معك عبر مزود خدمة الرسائل).",
    ],
  },
  {
    title: "حقوقك",
    content: [
      "يحق لك في أي وقت طلب الاطلاع على بياناتك الشخصية التي نحتفظ بها، أو طلب تصحيحها أو حذفها، وذلك بالتواصل معنا عبر قنوات التواصل المنشورة في الموقع.",
      "يمكنك أيضاً التوقف عن التواصل معنا في أي وقت دون أي تأثير على حقك في تلقي الخدمة.",
    ],
  },
  {
    title: "التعديلات على هذه السياسة",
    content: [
      "قد نقوم بتحديث هذه السياسة من وقت لآخر، وسيتم نشر أي تعديلات على هذه الصفحة مع تاريخ آخر تحديث.",
    ],
  },
  {
    title: "تواصل معنا",
    content: [
      `لأي استفسار حول هذه السياسة، يمكنك التواصل معنا عبر البريد الإلكتروني ${clinic.email} أو عبر واتساب على الرقم ${clinic.mobile}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <span className="text-sm font-semibold tracking-wide text-primary">قانوني</span>
          <h1 id="page-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            سياسة الخصوصية
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            آخر تحديث: أكتوبر 2026. توضح هذه السياسة كيفية تعامل موقع {clinic.name} مع بياناتك
            الشخصية.
          </p>
        </Container>
      </section>

      <Container className="max-w-3xl py-16 sm:py-20">
        <div className="flex flex-col gap-10">
          {sections.map((section, i) => (
            <section key={section.title} aria-labelledby={`privacy-${i}`} className="flex flex-col gap-3">
              <h2 id={`privacy-${i}`} className="text-xl font-bold text-charcoal">
                {section.title}
              </h2>
              {section.content.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-base leading-loose text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
