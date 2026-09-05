import { stats } from "@/lib/site-config";
import { SafeLogo } from "@/components/safe-logo";

export function StatsBand() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 text-center md:text-left">
            <span className="flex items-center justify-center gap-2 font-heading text-2xl font-semibold text-foreground sm:text-3xl md:justify-start">
              {"logo" in stat && stat.logo && (
                <SafeLogo src={stat.logo} alt={stat.value} size={22} />
              )}
              {stat.value}
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
