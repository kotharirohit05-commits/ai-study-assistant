import { useState } from "react";

function Flashcard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        className={`min-h-64 rounded-3xl border p-6 shadow-md transition-all duration-500 sm:p-8 ${
          showAnswer
            ? "border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950"
            : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
        }`}
      >
        {/* Card label */}
        <div className="mb-6 flex items-center justify-between">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
            {showAnswer ? "Answer" : "Question"}
          </span>

          <span
            className={`text-sm transition-all duration-500 ${
              showAnswer ? "rotate-12 scale-110" : ""
            }`}
          >
            {showAnswer ? "💡" : "❓"}
          </span>
        </div>

        {/* Question / Answer */}
        <div className="relative flex min-h-32 items-center justify-center overflow-hidden text-center">

          {/* Question */}
          <p
            className={`absolute w-full leading-relaxed transition-all duration-500 ease-out ${
              showAnswer
                ? "-translate-y-8 scale-95 opacity-0"
                : "translate-y-0 scale-100 opacity-100"
            } text-xl font-semibold text-slate-800 dark:text-white sm:text-2xl`}
          >
            {question}
          </p>

          {/* Answer */}
          <p
            className={`w-full leading-relaxed transition-all duration-500 ease-out ${
              showAnswer
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-8 scale-95 opacity-0"
            } text-base font-medium text-slate-600 dark:text-slate-300 sm:text-lg`}
          >
            {answer}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => setShowAnswer((previous) => !previous)}
          className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
        >
          {showAnswer ? "Show Question ↑" : "Get Answer →"}
        </button>
      </div>
    </div>
  );
}

export default Flashcard;