interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 lg:mb-24 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p
          className="text-label text-terracotta mb-4"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-display ${light ? "text-cream" : "text-espresso"}`}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontWeight: 300,
          fontStyle: "italic",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lead mt-4 max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-latte" : "text-muted"
          }`}
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
