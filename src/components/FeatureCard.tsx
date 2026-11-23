interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-2xl">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
