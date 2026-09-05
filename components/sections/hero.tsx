import Image from "next/image";
import { SignupForm } from "@/components/signup-form";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#3B82F6] opacity-20 blur-[120px]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Data Master Club
          </span>
          <h1 className="font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Learn real{" "}
            <span className="text-glow-gradient">data & AI engineering</span>{" "}
            — taught by an engineer who does it daily.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Practical, no-hype lessons on SQL, Python, GCP, Kafka, Spark and
            Databricks from Krishna Verma — Data Engineer at Lowe&apos;s
            India. Join the community to learn alongside people at every
            stage.
          </p>
          <SignupForm id="join" className="max-w-lg" />
          <p className="text-xs text-muted-foreground">
            Free to join. No spam — just practical lessons and updates.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="glow-ring relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-card">
            <Image
              src="/krishna.jpg"
              alt="Krishna Verma"
              fill
              sizes="(min-width: 1024px) 32rem, 24rem"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
