"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  id: string;
  selected: string[];
  onChange: (next: string[]) => void;
};

// Multi-select with type-ahead suggestions. Topics come from /api/topics
// (the sheet's Config tab). If none load, users can still type a custom topic
// and press Enter/comma to add it.
export function TopicPicker({ id, selected, onChange }: Props) {
  const [topics, setTopics] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/topics")
      .then((r) => r.json())
      .then((d) => !cancelled && Array.isArray(d.topics) && setTopics(d.topics))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const q = query.trim().toLowerCase();
  const suggestions = useMemo(
    () =>
      topics.filter(
        (t) => !selected.includes(t) && (!q || t.toLowerCase().includes(q))
      ),
    [topics, selected, q]
  );

  function add(value: string) {
    const v = value.trim();
    if (!v || selected.some((s) => s.toLowerCase() === v.toLowerCase())) return;
    onChange([...selected, v]);
    setQuery("");
    setActive(0);
  }

  function remove(value: string) {
    onChange(selected.filter((s) => s !== value));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === ",") {
      if (query.trim()) {
        e.preventDefault();
        add(open && suggestions[active] ? suggestions[active] : query);
      } else if (e.key === "Enter") {
        e.preventDefault(); // don't submit the form while picking
      }
    } else if (e.key === "Backspace" && !query && selected.length) {
      remove(selected[selected.length - 1]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const listId = `${id}-list`;

  return (
    <div ref={wrapRef} className="relative">
      <div
        className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-xl border border-border bg-background/60 px-3 py-1.5 focus-within:ring-2 focus-within:ring-ring/50"
        onClick={() => document.getElementById(id)?.focus()}
      >
        {selected.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 rounded-lg bg-primary/15 px-2 py-1 text-sm"
          >
            {s}
            <button
              type="button"
              aria-label={`Remove ${s}`}
              onClick={(e) => {
                e.stopPropagation();
                remove(s);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          placeholder={selected.length ? "Add more…" : "Search SQL, Python, Window Functions…"}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="min-w-[8rem] flex-1 bg-transparent py-1 text-base outline-none placeholder:text-muted-foreground"
        />
      </div>

      {open && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-border bg-popover p-1 shadow-lg"
        >
          {suggestions.map((t, i) => (
            <li
              key={t}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault(); // keep input focus
                add(t);
              }}
              onMouseEnter={() => setActive(i)}
              className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${
                i === active ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
