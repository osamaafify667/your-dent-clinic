"use client";

import { usePathname } from "next/navigation";
import type { Lang } from "@/data/i18n";

export function useLang(): Lang {
  const pathname = usePathname();
  return pathname.startsWith("/en") ? "en" : "ar";
}
