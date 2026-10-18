import { GraduationCap } from "lucide-react";
import type { Doctor } from "@/data/team";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const initials = doctor.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join(" ");

  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-charcoal/10 bg-surface p-7 text-center">
      {doctor.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={doctor.image}
          alt={`صورة ${doctor.name}`}
          className="mx-auto h-24 w-24 rounded-full object-cover"
          width={96}
          height={96}
        />
      ) : (
        <span
          aria-hidden="true"
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-mint text-2xl font-bold text-primary"
        >
          {initials}
        </span>
      )}
      <div>
        <h3 className="text-lg font-bold text-charcoal">{doctor.name}</h3>
        <p className="mt-1 text-sm font-medium text-primary">{doctor.specialty}</p>
      </div>
      <ul className="flex flex-col gap-2 text-start">
        {doctor.qualifications.map((q) => (
          <li key={q} className="flex items-start gap-2 text-sm text-muted">
            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {q}
          </li>
        ))}
      </ul>
      <p className="text-sm leading-relaxed text-muted">{doctor.bio}</p>
    </article>
  );
}
