"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { useLang } from "./useLang";
import { ui } from "@/data/i18n";

export function Header() {
  const pathname = usePathname();
  const lang = useLang();
  const t = ui[lang];
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: lang === "ar" ? "/" : "/en", label: t.nav.home },
    { href: lang === "ar" ? "/services" : "/en/services", label: t.nav.services },
    { href: lang === "ar" ? "/team" : "/en/team", label: t.nav.team },
    { href: lang === "ar" ? "/about" : "/en/about", label: t.nav.about },
    { href: lang === "ar" ? "/contact" : "/en/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) =>
    href === (lang === "ar" ? "/" : "/en")
      ? pathname === href
      : pathname.startsWith(href);

  const homeHref = lang === "ar" ? "/" : "/en";
  const appointmentHref = lang === "ar" ? "/appointment" : "/en/appointment";

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-surface/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Logo />

        <nav aria-label={t.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-charcoal"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={appointmentHref}
            className="hidden items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            {t.bookCta}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.menuClose : t.menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-charcoal/15 text-charcoal transition-colors hover:bg-mint lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-charcoal/10 bg-surface lg:hidden">
          <nav aria-label={t.mobileMenu}>
            <ul className="flex flex-col px-4 py-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-mint text-primary"
                        : "text-charcoal hover:bg-mint/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 px-3 pb-3">
                <Link
                  href={appointmentHref}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  {t.bookCta}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
