import { StudyPlanBoard } from "@/app/components/study-plan-board";
import { studyTopics } from "@/app/data/topics";

const sprintPhases = [
  {
    title: "Prime the fundamentals",
    description:
      "Start the morning with process creation and IPC so the later multithreading labs feel like extensions of the same lifecycle story."
  },
  {
    title: "Drill concurrent patterns",
    description:
      "Build muscle memory with pthread scaffolding, then attack the algorithmic exercises and synchronization puzzles."
  },
  {
    title: "Lock in schedulers & xv6",
    description:
      "Close with scheduling APIs, deadlocks, and xv6 syscall wiring while everything else is still fresh."
  }
];

const quickWins = [
  {
    title: "Repeatable structure",
    body: "Each block gives objectives, tactics, and resource links so you can jump directly into hands-on work."
  },
  {
    title: "Progress awareness",
    body: "Mark sessions complete and instantly refocus on either implementation drills or conceptual refreshers."
  },
  {
    title: "Exam-day alignment",
    body: "Every task maps to the exact deliverables your lab exam expects: command simulators, IPC pipelines, pthread solutions, and xv6 syscall additions."
  }
];

export default function Page() {
  const totalMinutes = studyTopics.reduce(
    (acc, topic) => acc + topic.durationMinutes,
    0
  );
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-primary-200 bg-white/80 p-8 shadow-lg backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">
          Lab Exam | Linux Systems & xv6
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">
          One-Day Study Blueprint
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Follow this sequence to master process system calls, IPC, pthread
          concurrency, synchronization patterns, scheduling APIs, deadlock
          strategies, and xv6 syscall implementation before tomorrow&apos;s
          lab. You have {totalHours}h {remainingMinutes}m of focused work
          plotted for today—stick to the order, mark progress, and stay outcomes
          driven.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {sprintPhases.map((phase) => (
            <div
              key={phase.title}
              className="rounded-2xl border border-slate-200 bg-white/70 p-4"
            >
              <h3 className="text-sm font-semibold text-primary-700">
                {phase.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{phase.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {quickWins.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm"
          >
            <h3 className="text-base font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <StudyPlanBoard />
      </section>

      <footer className="mt-12 rounded-3xl border border-slate-200 bg-slate-900/95 p-8 text-slate-200">
        <h2 className="text-2xl font-bold">
          Morning-of reinforcement (30 minute touch-up)
        </h2>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-200">
              Warm-up drill
            </h3>
            <p className="mt-2 text-sm">
              Re-implement the mini shell or producer-consumer skeleton in a
              single uninterrupted block. Focus on signature recall and cleanup
              order.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-200">
              Concept flashcards
            </h3>
            <p className="mt-2 text-sm">
              Explain scheduling policies, reader-writer strategies, and Banker’s
              algorithm aloud without notes. Keep responses under one minute.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-200">
              xv6 readiness
            </h3>
            <p className="mt-2 text-sm">
              Verify you can list the six touch-points for adding a syscall in
              order. If anything feels fuzzy, skim the walkthrough again and run
              a diff on your practice implementation.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
