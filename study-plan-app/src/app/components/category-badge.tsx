import clsx from "clsx";
import { StudyTopic } from "@/app/data/topics";

const CATEGORY_META: Record<
  StudyTopic["category"],
  { label: string; className: string }
> = {
  foundations: {
    label: "Foundations",
    className: "bg-primary-100 text-primary-800 border-primary-200"
  },
  ipc: {
    label: "Interprocess Communication",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200"
  },
  threads: {
    label: "Multithreading",
    className: "bg-sky-100 text-sky-900 border-sky-300"
  },
  scheduling: {
    label: "Scheduling",
    className: "bg-amber-100 text-amber-900 border-amber-200"
  },
  synchronization: {
    label: "Synchronization",
    className: "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200"
  },
  xv6: {
    label: "xv6 Kernel",
    className: "bg-indigo-100 text-indigo-900 border-indigo-200"
  },
  wrapUp: {
    label: "Wrap-up",
    className: "bg-slate-200 text-slate-900 border-slate-300"
  }
};

type Props = {
  category: StudyTopic["category"];
  className?: string;
};

export function CategoryBadge({ category, className }: Props) {
  const meta = CATEGORY_META[category];
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        meta.className,
        className
      )}
    >
      {meta.label}
    </span>
  );
}

export const CATEGORY_ORDER: StudyTopic["category"][] = [
  "foundations",
  "ipc",
  "threads",
  "scheduling",
  "synchronization",
  "xv6",
  "wrapUp"
];
