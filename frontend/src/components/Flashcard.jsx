import { useState } from "react";

function Flashcard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        className={`min-h-64 rounded-3xl border p-6 shadow-md transition-all duration-300 sm:p-8 ${
          showAnswer
            ? "border-indigo-200 bg-indigo-50"
            : "border-slate-200 bg-white"
        }`}
      >
        {/* Card label */}
        <div className="mb-6 flex items-center justify-between">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
            {showAnswer ? "Answer" : "Question"}
          </span>

          <span className="text-sm text-slate-400">
            {showAnswer ? "💡" : "❓"}
          </span>
        </div>

        {/* Question / Answer */}
        <div className="flex min-h-32 items-center justify-center text-center">
          <p className="text-xl font-semibold leading-relaxed text-slate-800 sm:text-2xl">
            {showAnswer ? answer : question}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
        >
          {showAnswer ? "Show Question" : "Show Answer"}
        </button>
      </div>
    </div>
  );
}

export default Flashcard;