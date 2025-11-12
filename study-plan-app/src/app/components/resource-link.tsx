import { Resource } from "@/app/data/topics";

const LABEL_STYLES: Record<Resource["type"], string> = {
  doc: "bg-primary-50 text-primary-700 border-primary-200",
  video: "bg-rose-50 text-rose-700 border-rose-200",
  code: "bg-emerald-50 text-emerald-700 border-emerald-200"
};

const TYPE_LABEL: Record<Resource["type"], string> = {
  doc: "Guide",
  video: "Video",
  code: "Code"
};

type Props = {
  resource: Resource;
};

export function ResourceLink({ resource }: Props) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition hover:scale-105 hover:shadow-sm"
    >
      <span
        className={`rounded-full px-2 py-0.5 text-[0.65rem] uppercase tracking-wide ${LABEL_STYLES[resource.type]}`}
      >
        {TYPE_LABEL[resource.type]}
      </span>
      <span className="text-slate-700">{resource.label}</span>
    </a>
  );
}
