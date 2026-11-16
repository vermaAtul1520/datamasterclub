import { ArrowRight, Bot, Eye, ListChecks, Wrench } from "lucide-react";

// Small, hand-built topic illustrations for Instagram showcase tiles that
// don't have a real thumbnail yet. Pure markup — no images to load.

export type TopicVisualKind =
  | "sql"
  | "pipeline"
  | "snowflake"
  | "agent"
  | "timeseries"
  | "cluster";

function TimeSeries() {
  return (
    <pre className="w-full overflow-hidden rounded-lg border border-border/70 bg-background/80 p-3 font-mono text-[10px] leading-relaxed text-muted-foreground sm:text-[11px]">
      <span className="text-primary">SELECT</span> day, sales,{"\n"}
      {"  "}sales - <span className="text-sky-300">LAG</span>(sales){"\n"}
      {"  "}
      <span className="text-primary">OVER</span> (<span className="text-primary">ORDER BY</span> day){"\n"}
      {"  "}
      <span className="text-primary">AS</span> day_over_day{"\n"}
      <span className="text-primary">FROM</span> daily_sales;
    </pre>
  );
}

function Cluster() {
  return (
    <div className="flex w-full flex-col items-center gap-1.5">
      <div className="w-3/4 rounded-md border border-primary/60 bg-primary/15 px-2 py-1 text-center font-mono text-[10px] text-foreground sm:text-[11px]">
        Primary node
      </div>
      <span className="h-1.5 w-px bg-primary/60" aria-hidden />
      <div className="grid w-full grid-cols-3 gap-1">
        {["Core", "Core", "Task"].map((n, i) => (
          <div
            key={i}
            className="rounded-md border border-border/70 bg-background/80 px-1 py-1 text-center font-mono text-[9px] text-muted-foreground sm:text-[10px]"
          >
            {n}
          </div>
        ))}
      </div>
      <div className="w-full rounded-md border border-border/70 bg-background/80 px-2 py-1 text-center font-mono text-[9px] text-muted-foreground sm:text-[10px]">
        S3 · Spark · Hive
      </div>
    </div>
  );
}

function Sql() {
  return (
    <pre className="w-full overflow-hidden rounded-lg border border-border/70 bg-background/80 p-3 font-mono text-[10px] leading-relaxed text-muted-foreground sm:text-[11px]">
      <span className="text-primary">SELECT</span> name, salary,{"\n"}
      {"  "}
      <span className="text-sky-300">ROW_NUMBER</span>(){" "}
      <span className="text-primary">OVER</span> ({"\n"}
      {"    "}
      <span className="text-primary">PARTITION BY</span> dept{"\n"}
      {"    "}
      <span className="text-primary">ORDER BY</span> salary{" "}
      <span className="text-primary">DESC</span>{"\n"}
      {"  "}) <span className="text-primary">AS</span> rnk{"\n"}
      <span className="text-primary">FROM</span> employees;
    </pre>
  );
}

function Pipeline() {
  const steps = ["Source", "Kafka", "Spark", "Warehouse"];
  return (
    <div className="flex w-full flex-col items-stretch gap-1">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center gap-1">
          <div
            className={
              "w-full rounded-md border px-2 py-1 text-center font-mono text-[10px] sm:text-[11px] " +
              (i === steps.length - 1
                ? "border-primary/60 bg-primary/15 text-foreground"
                : "border-border/70 bg-background/80 text-muted-foreground")
            }
          >
            {step}
          </div>
          {i < steps.length - 1 && <span className="h-1.5 w-px bg-primary/60" aria-hidden />}
        </div>
      ))}
    </div>
  );
}

function Snowflake() {
  const layers = [
    { name: "Cloud services", note: "auth · metadata · optimizer" },
    { name: "Compute", note: "virtual warehouses" },
    { name: "Storage", note: "micro-partitions" },
  ];
  return (
    <div className="flex w-full flex-col gap-1.5">
      {layers.map((layer, i) => (
        <div
          key={layer.name}
          className="rounded-md border border-border/70 bg-background/80 px-2.5 py-1.5"
          style={{ opacity: 1 - i * 0.12 }}
        >
          <p className="font-mono text-[10px] text-foreground sm:text-[11px]">{layer.name}</p>
          <p className="text-[9px] text-muted-foreground sm:text-[10px]">{layer.note}</p>
        </div>
      ))}
    </div>
  );
}

function Agent() {
  const steps = [
    { icon: ListChecks, label: "Plan" },
    { icon: Wrench, label: "Act" },
    { icon: Eye, label: "Observe" },
  ];
  return (
    <div className="flex w-full flex-col items-center gap-2.5">
      <div className="flex size-10 items-center justify-center rounded-full border border-primary/60 bg-primary/15 text-primary">
        <Bot className="size-5" />
      </div>
      <div className="flex w-full items-center justify-center gap-1">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1">
            <div className="flex flex-col items-center gap-1 rounded-md border border-border/70 bg-background/80 px-1.5 py-1">
              <step.icon className="size-3.5 text-muted-foreground" />
              <span className="font-mono text-[9px] text-muted-foreground sm:text-[10px]">
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && <ArrowRight className="size-3 text-primary/70" aria-hidden />}
          </div>
        ))}
      </div>
      <span className="font-mono text-[9px] text-muted-foreground sm:text-[10px]">↻ loop until done</span>
    </div>
  );
}

export function TopicVisual({ kind }: { kind: TopicVisualKind }) {
  switch (kind) {
    case "sql":
      return <Sql />;
    case "pipeline":
      return <Pipeline />;
    case "snowflake":
      return <Snowflake />;
    case "agent":
      return <Agent />;
    case "timeseries":
      return <TimeSeries />;
    case "cluster":
      return <Cluster />;
  }
}
