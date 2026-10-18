import Link from "next/link";
import { clinic } from "@/data/clinic";

export function Logo({ dark = false }: { dark?: boolean }) {
  const src = dark ? "/logo/logo-light.png" : "/logo/logo.png";
  return (
    <Link href="/" className="flex items-center" aria-label={`${clinic.name} — الرئيسية`}>
      <img
        src={src}
        alt={clinic.name}
        width={1200}
        height={485}
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  );
}
