"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { clinic, whatsappLink } from "@/data/clinic";
import { services } from "@/data/services";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormValues = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  contactMethod: "whatsapp" | "phone" | "email";
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const timeOptions = [
  "4:00 – 6:00 مساءً",
  "6:00 – 8:00 مساءً",
  "8:00 – 11:00 مساءً",
  "غير محدد",
];

const initialValues: FormValues = {
  name: "",
  phone: "",
  service: "",
  date: "",
  time: "غير محدد",
  contactMethod: "whatsapp",
  consent: false,
};

const contactMethodLabels: Record<FormValues["contactMethod"], string> = {
  whatsapp: "واتساب",
  phone: "اتصال هاتفي",
  email: "بريد إلكتروني",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "يرجى إدخال الاسم الكامل.";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (!/^(01[0125][0-9]{8}|02[0-9]{8})$/.test(digits)) {
    errors.phone = "يرجى إدخال رقم هاتف مصري صحيح (موبايل أو خط أرضي بالقاهرة).";
  }

  if (!values.service) {
    errors.service = "يرجى اختيار الخدمة المطلوبة.";
  }

  if (values.date) {
    const selected = new Date(`${values.date}T23:59:59`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      errors.date = "يرجى اختيار تاريخ اليوم أو بعده.";
    }
  }

  if (!values.consent) {
    errors.consent = "يرجى الموافقة على سياسة الخصوصية لإرسال الطلب.";
  }

  return errors;
}

const inputClass =
  "w-full rounded-lg border border-charcoal/20 bg-surface px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function AppointmentForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      summaryRef.current?.focus();
      return;
    }

    setStatus("submitting");

    const serviceTitle =
      services.find((s) => s.slug === values.service)?.title ?? values.service;
    const message = [
      "طلب حجز موعد من موقع Your Dent Clinic",
      `الاسم: ${values.name.trim()}`,
      `الخدمة المطلوبة: ${serviceTitle}`,
      `الهاتف: ${values.phone.trim()}`,
      `التاريخ المفضل: ${values.date || "غير محدد"}`,
      `الوقت المفضل: ${values.time}`,
      `طريقة التواصل المفضلة: ${contactMethodLabels[values.contactMethod]}`,
    ].join("\n");

    window.setTimeout(() => {
      const url = whatsappLink(message);
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      if (opened) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 700);
  };

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-start gap-4 rounded-2xl border border-primary/30 bg-mint/50 p-8"
        role="status"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold text-charcoal">تم تجهيز طلبك عبر واتساب</h3>
        <p className="text-sm leading-relaxed text-muted">
          فتحنا لك تطبيق واتساب برسالة جاهزة بتفاصيل طلبك. أرسل الرسالة ليصلك رد من العيادة.
          يرجى ملاحظة أن هذا الطلب ليس تأكيداً للحجز، وسيتم تأكيد الموعد بعد تواصل فريق العيادة
          معك.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={whatsappLink("مرحباً، أرسلت طلب حجز من الموقع وأرغب في المتابعة.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            إعادة فتح واتساب
          </a>
          <button
            type="button"
            onClick={() => {
              setValues(initialValues);
              setStatus("idle");
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 px-5 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:border-primary hover:text-primary"
          >
            تعبئة طلب جديد
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {status === "error" && Object.keys(errors).length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>يرجى تصحيح الأخطاء الموضحة في الحقول أدناه قبل إرسال الطلب.</span>
        </div>
      )}

      {status === "error" && Object.keys(errors).length === 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>
            لم نتمكن من فتح واتساب تلقائياً. يمكنك التواصل مباشرة على الرقم{" "}
            <a href={`tel:${clinic.mobile}`} className="font-semibold underline" dir="ltr">
              {clinic.mobile}
            </a>
            .
          </span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-charcoal">
            اسم المريض <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="الاسم الكامل"
            className={inputClass}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-semibold text-charcoal">
            رقم الهاتف <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="01xxxxxxxxx"
            className={`${inputClass} text-left`}
          />
          {errors.phone && (
            <p id="phone-error" className="text-xs text-red-700">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="service" className="text-sm font-semibold text-charcoal">
            الخدمة المطلوبة <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(e) => set("service", e.target.value)}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={inputClass}
          >
            <option value="">اختر الخدمة…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="general-consultation">استشارة عامة</option>
          </select>
          {errors.service && (
            <p id="service-error" className="text-xs text-red-700">
              {errors.service}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-sm font-semibold text-charcoal">
            التاريخ المفضل <span className="font-normal text-muted">(اختياري)</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={values.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => set("date", e.target.value)}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "date-error" : undefined}
            className={inputClass}
          />
          {errors.date && (
            <p id="date-error" className="text-xs text-red-700">
              {errors.date}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="time" className="text-sm font-semibold text-charcoal">
            الوقت المفضل
          </label>
          <select
            id="time"
            name="time"
            value={values.time}
            onChange={(e) => set("time", e.target.value)}
            className={inputClass}
          >
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-semibold text-charcoal">طريقة التواصل المفضلة</legend>
          <div className="flex flex-wrap gap-4 pt-1">
            {(Object.keys(contactMethodLabels) as FormValues["contactMethod"][]).map((method) => (
              <label key={method} className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={values.contactMethod === method}
                  onChange={() => set("contactMethod", method)}
                  className="h-4 w-4 accent-primary"
                />
                {contactMethodLabels[method]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-charcoal">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-primary"
          />
          <span>
            أوافق على معالجة بياناتي الشخصية الموضحة أعلاه لغرض الرد على طلب الحجز، وفقاً لـ{" "}
            <a href="/privacy-policy" className="font-semibold text-primary underline">
              سياسة الخصوصية
            </a>
            . <span aria-hidden="true" className="text-red-600">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="text-xs text-red-700">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            جارٍ تجهيز الطلب…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" />
            أرسل طلب الحجز عبر واتساب
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-muted">
        لا يوجد نظام حجز مباشر حالياً. عند إرسال الطلب سيتم تحويلك إلى واتساب لإتمام الإرسال،
        ولن يعتبر الموعد محجوزاً إلا بعد تأكيد العيادة.
      </p>
    </form>
  );
}
