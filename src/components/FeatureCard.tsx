import type { ElementType } from "react";

interface FeatureCardProps {
  icon: ElementType;
  title: string;
  category: string;
  description: string;
  statusBadge: string;
  isPlanned?: boolean;
}

export default function FeatureCard({
  icon: Icon,
  title,
  category,
  description,
  statusBadge,
  isPlanned = false,
}: FeatureCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-200 hover:border-card-border-hover hover:bg-card-bg-elevated hover:shadow-lg hover:shadow-black/40">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/90 text-blue-400 transition-colors group-hover:border-blue-500/40 group-hover:text-blue-300">
            <Icon className="h-5 w-5" />
          </div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${
              isPlanned
                ? "border border-amber-900/40 bg-amber-950/30 text-amber-300"
                : "border border-emerald-900/40 bg-emerald-950/30 text-emerald-300"
            }`}
          >
            {statusBadge}
          </span>
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {category}
        </p>
        <h3 className="mt-1 text-base font-semibold tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          {description}
        </p>
      </div>

      <div className="mt-5 border-t border-slate-800/60 pt-3">
        <span className="text-[11px] font-mono text-slate-500">
          Architecture: {isPlanned ? "Planned Specification" : "Implemented (W1)"}
        </span>
      </div>
    </div>
  );
}
