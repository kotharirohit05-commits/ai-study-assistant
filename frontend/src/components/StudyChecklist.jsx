import { useState } from "react";

function StudyChecklist() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Review the Mind Map",
      completed: false,
    },
    {
      id: 2,
      title: "Complete the Flashcards",
      completed: false,
    },
    {
      id: 3,
      title: "Attempt the Quiz",
      completed: false,
    },
    {
      id: 4,
      title: "Review Incorrect Answers",
      completed: false,
    },
  ]);

  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  const progress = Math.round(
    (completedTasks / tasks.length) * 100
  );

  return (
    <section className="mb-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 sm:p-8">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            ✅ Study Checklist
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
            Keep track of your study progress.
          </p>
        </div>

        <div className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
          {completedTasks}/{tasks.length}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-300">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => toggleTask(task.id)}
            className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
              task.completed
                ? "border-indigo-100 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/50"
                : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-700 dark:hover:bg-slate-700"
            }`}
          >
            {/* Checkbox */}
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 text-sm font-bold transition-all ${
                task.completed
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-300 bg-white dark:border-slate-500 dark:bg-slate-700"
              }`}
            >
              {task.completed && "✓"}
            </div>

            {/* Task */}
            <span
              className={`text-sm font-medium sm:text-base ${
                task.completed
                  ? "text-slate-400 line-through dark:text-slate-500"
                  : "text-slate-700 dark:text-slate-200"
              }`}
            >
              {task.title}
            </span>
          </button>
        ))}
      </div>

      {/* Completion message */}
      {completedTasks === tasks.length && (
        <div className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          🎉 Great job! You completed your study checklist.
        </div>
      )}
    </section>
  );
}

export default StudyChecklist;