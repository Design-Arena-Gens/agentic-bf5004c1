import { StudyTopic } from "@/app/data/topics";
import { CategoryBadge } from "@/app/components/category-badge";
import { ResourceLink } from "@/app/components/resource-link";

type Props = {
  topic: StudyTopic;
  completed: boolean;
  onToggle: (topicId: string) => void;
};

export function TopicCard({ topic, completed, onToggle }: Props) {
  return (
    <article
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm ring-1 ring-transparent transition hover:border-primary-300 hover:shadow-lg hover:ring-primary-200"
    >
      <header className="mb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <CategoryBadge category={topic.category} />
          <span className="text-xs font-semibold text-slate-500">
            {topic.slot}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {topic.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{topic.summary}</p>
        </div>
      </header>

      <section className="flex flex-col gap-3 text-sm text-slate-700">
        <div>
          <span className="font-semibold text-slate-500">Objectives</span>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {topic.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="font-semibold text-slate-500">Tactics</span>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {topic.tactics.map((tactic) => (
              <li key={tactic}>{tactic}</li>
            ))}
          </ul>
        </div>
      </section>

      {topic.resources.length > 0 && (
        <footer className="mt-4 border-t border-slate-200 pt-3">
          <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Focus resources
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {topic.resources.map((resource) => (
              <ResourceLink key={resource.url} resource={resource} />
            ))}
          </div>
        </footer>
      )}

      <button
        type="button"
        onClick={() => onToggle(topic.id)}
        className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      >
        {completed ? "Mark as revisit" : "Mark complete"}
      </button>
    </article>
  );
}
