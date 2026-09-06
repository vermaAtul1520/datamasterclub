import { GetPdfForm } from "@/components/get-pdf-form";
import { UpiSupportCard } from "@/components/upi-support-card";

export function GetPdfSection() {
  return (
    <section id="get-pdfs" className="scroll-mt-20 border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <span className="mx-auto w-fit rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Free Resources
          </span>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Get your free PDF
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            SQL, Python, PySpark, Airflow, and more — practical cheat sheets
            and guides. Completely free, no paywall, ever.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-border bg-background/60 p-6">
            <GetPdfForm />
          </div>
          <UpiSupportCard />
        </div>
      </div>
    </section>
  );
}
