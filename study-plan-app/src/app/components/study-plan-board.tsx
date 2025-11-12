"use client";

import { type ReactNode, useMemo, useState } from "react";
import clsx from "clsx";
import {
  StudyTopic,
  studyTopics,
  warmupChecklist
} from "@/app/data/topics";
import {
  CategoryBadge,
  CATEGORY_ORDER
} from "@/app/components/category-badge";
import { TopicCard } from "@/app/components/topic-card";
import { RecapChecklist } from "@/app/components/recap-checklist";

const categoryLabels: Record<StudyTopic["category"], string> = {
  foundations: "Foundations",
  ipc: "IPC",
  threads: "Threads",
  scheduling: "Scheduling",
  synchronization: "Synchronization",
  xv6: "xv6",
  wrapUp: "Wrap-up"
};

type FilterValue = "all" | StudyTopic["category"];

export function StudyPlanBoard() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterValue>("all");

  const toggleCompletion = (topicId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const filteredTopics = useMemo(() => {
    if (filter === "all") {
      return studyTopics;
    }
    return studyTopics.filter((topic) => topic.category === filter);
  }, [filter]);

  const metrics = useMemo(() => {
    const totalMinutes = studyTopics.reduce(
      (acc, topic) => acc + topic.durationMinutes,
      0
    );
    const completeMinutes = studyTopics
      .filter((topic) => completed.has(topic.id))
      .reduce((acc, topic) => acc + topic.durationMinutes, 0);
    return {
      totalMinutes,
      completeMinutes,
      remainingMinutes: totalMinutes - completeMinutes,
      completionRatio: totalMinutes
        ? Math.round((completeMinutes / totalMinutes) * 100)
        : 0
    };
  }, [completed]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-primary-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
              One-Day Sprint
            </p>
            <h2 className="text-2xl font-bold text-slate-900">
              Guided Prep Flow
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Track progress, focus on the right order, and drill the critical
              implementations before your lab exam.
            </p>
          </div>
          <ProgressMeter completion={metrics.completionRatio} />
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <MetricTile
            title="Planned focus"
            value={`${metrics.totalMinutes} min`}
            description="Across 10 deep-work blocks with deliberate breaks."
          />
          <MetricTile
            title="Locked in"
            value={`${metrics.completeMinutes} min`}
            description="Time you have already rehearsed end-to-end."
          />
          <MetricTile
            title="Remaining"
            value={`${metrics.remainingMinutes} min`}
            description="Keep final sessions lighter to avoid fatigue."
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <FilterPill
            label="All topics"
            active={filter === "all"}
            onClick={() => setFilter("all")}
            count={studyTopics.length}
          />
          {CATEGORY_ORDER.map((category) => (
            <FilterPill
              key={category}
              label={categoryLabels[category]}
              active={filter === category}
              onClick={() => setFilter(category)}
              count={studyTopics.filter((t) => t.category === category).length}
              badge={<CategoryBadge category={category} className="bg-white" />}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {filteredTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            completed={completed.has(topic.id)}
            onToggle={toggleCompletion}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <DeepWorkStrategy completedCount={completed.size} />
        <RecapChecklist
          checklist={warmupChecklist}
          completedTopics={completed}
          totalTopics={studyTopics.length}
        />
      </section>
    </div>
  );
}

type MetricTileProps = {
  title: string;
  value: string;
  description: string;
};

function MetricTile({ title, value, description }: MetricTileProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

type FilterPillProps = {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
  badge?: ReactNode;
};

function FilterPill({
  label,
  active,
  count,
  onClick,
  badge
}: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition",
        active
          ? "border-primary-500 bg-primary-500 text-white shadow"
          : "border-slate-300 bg-white text-slate-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
      )}
    >
      {badge}
      {label}
      <span
        className={clsx(
          "inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-full text-[0.65rem]",
          active ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
        )}
      >
        {count}
      </span>
    </button>
  );
}

function ProgressMeter({ completion }: { completion: number }) {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-primary-200 bg-white/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
        Completion
      </p>
      <p className="mt-1 text-3xl font-bold text-primary-700">
        {completion}%
      </p>
      <div className="mt-3 h-2 w-full rounded-full bg-primary-100">
        <div
          className="h-full rounded-full bg-primary-500 transition-all"
          style={{ width: `${completion}%` }}
        />
      </div>
      <p className="mt-2 text-[0.7rem] text-slate-500">
        Aim for 80% tonight and leave quick recap for the morning.
      </p>
    </div>
  );
}

function DeepWorkStrategy({ completedCount }: { completedCount: number }) {
  const stage =
    completedCount >= 7
      ? "Wrap-up & articulation"
      : completedCount >= 4
        ? "Implementation drills"
        : "Concept priming";

  const actions =
    completedCount >= 7
      ? [
          "Switch to flashcard summaries and articulation practice.",
          "Answer viva-style questions for each topic in under 90 seconds.",
          "Sleep on it—only light review after this block."
        ]
      : completedCount >= 4
        ? [
            "Prioritise coding the trickiest patterns (dining philosophers, Banker’s algorithm).",
            "Enable logging or trace outputs to validate understanding quickly.",
            "Time-box each code run to 20 minutes to avoid rabbit holes."
          ]
        : [
            "Skim the objective lists aloud before diving into code.",
            "Draw lifecycle diagrams for processes vs threads.",
            "Note unclear syscall semantics to clarify via man pages."
          ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Momentum check
      </p>
      <h3 className="mt-1 text-xl font-bold text-slate-900">
        Focus mode: {stage}
      </h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {actions.map((action) => (
          <li key={action} className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary-400" />
            <span>{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
