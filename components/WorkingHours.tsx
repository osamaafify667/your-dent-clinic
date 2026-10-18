"use client";

import { useEffect, useState } from "react";
import { useLang } from "./useLang";

const fallback = {
  ar: [
    "من السبت إلى الخميس: من 4:00 مساءً إلى 11:00 مساءً",
    "الجمعة: مغلق",
  ],
  en: [
    "Saturday – Thursday: 4:00 PM – 11:00 PM",
    "Friday: Closed",
  ],
};

type StatusData = {
  hoursText?: { ar?: string[]; en?: string[] };
};

export function useHoursText(): string[] {
  const lang = useLang();
  const [lines, setLines] = useState<string[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch("/api/status")
        .then((res) => res.json())
        .then((data: StatusData) => {
          if (cancelled) return;
          const next = data.hoursText?.[lang];
          setLines(Array.isArray(next) && next.length ? next : []);
        })
        .catch(() => {});
    };
    load();
    const interval = window.setInterval(load, 60000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [lang]);

  return lines && lines.length ? lines : fallback[lang];
}

export function HoursLines({ className }: { className?: string }) {
  const lines = useHoursText();
  return (
    <>
      {lines.map((line, i) => (
        <p key={i} className={className}>
          {line}
        </p>
      ))}
    </>
  );
}
