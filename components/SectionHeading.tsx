import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
}) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-start";
  return (
    <Reveal className={`flex flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <span className="text-sm font-semibold tracking-wide text-primary">{eyebrow}</span>
      )}
      <h2 className="max-w-2xl text-3xl font-bold leading-snug text-charcoal sm:text-4xl">
        {title}
      </h2>
      {description && <p className="max-w-2xl text-base leading-relaxed text-muted">{description}</p>}
    </Reveal>
  );
}
