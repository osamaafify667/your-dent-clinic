"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useLang } from "./useLang";

type Status = {
  isOpen: boolean;
};

export function StatusBanner() {
  const lang = useLang();
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setStatus(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!status || status.isOpen) return null;

  const copy = {
    ar: "نورنا بكرة لأننا قفلنا — يمكنك حجز موعد عبر واتساب وسيتم التواصل معك غداً.",
    en: "See you tomorrow — we are closed. You can book an appointment via WhatsApp and we will contact you tomorrow.",
  }[lang];

  return (
    <div role="status" className="border-b border-amber-200 bg-amber-50">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-3 text-center sm:px-6 lg:px-8">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
        <p className="text-sm font-semibold text-amber-800">{copy}</p>
      </div>
    </div>
  );
}
