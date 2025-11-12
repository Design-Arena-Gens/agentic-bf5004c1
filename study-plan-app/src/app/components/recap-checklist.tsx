"use client";

import { useMemo, useState } from "react";

type Props = {
  checklist: string[];
  completedTopics: Set<string>;
  totalTopics: number;
};

export function RecapChecklist({
  checklist,
  completedTopics,
  totalTopics
}: Props) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const coverage = useMemo(() => {
    const percent = Math.round((completedTopics.size / totalTopics) * 100);
    if (percent >= 80) return "🔥 Exam ready. Keep it light.";
    if (percent >= 50) return "🔁 Shift towards coding reps.";
    return "📚 Stay on fundamentals first.";
  }, [completedTopics.size, totalTopics]);

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  };

  return (
    <aside className="rounded-3xl border border-slate-200 bg-slate-900/90 p-6 text-slate-100 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary-200">
        Night Recap
      </p>
      <h3 className="mt-1 text-xl font-bold">Rapid readiness checklist</h3>
      <p className="mt-2 text-sm text-slate-300">
        Coverage signal: <strong>{coverage}</strong>
      </p>
      <ul className="mt-4 space-y-3 text-sm">
        {checklist.map((item) => (
          <li key={item}>
            <label className="flex cursor-pointer gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-500 text-primary-400 focus:ring-primary-300"
                checked={checkedItems.has(item)}
                onChange={() => toggleItem(item)}
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs text-slate-400">
        Tip: close with a 60-second verbal summary of each area. If it feels
        shaky, queue it for tomorrow morning&apos;s warm-up block.
      </p>
    </aside>
  );
}
