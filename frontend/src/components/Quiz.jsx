import { useState } from "react";

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (optionIndex) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(optionIndex);

    if (optionIndex === question.correctAnswer) {
      setScore((previousScore) => previousScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer(null);
  };

  if (finished) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl">🎉</div>

        <h3 className="text-2xl font-bold text-slate-900">
          Quiz Complete!
        </h3>

        <p className="mt-3 text-lg text-slate-600">
          You scored{" "}
          <span className="font-bold text-indigo-600">
            {score}/{questions.length}
          </span>
        </p>

        <button
          onClick={() => {
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setScore(0);
            setFinished(false);
          }}
          className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

      {/* Progress */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-purple-600">
          Question {currentQuestion + 1} of {questions.length}
        </span>

        <span className="text-sm text-slate-500">
          Score: {score}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-300"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <h3 className="text-xl font-bold leading-relaxed text-slate-900 sm:text-2xl">
        {question.question}
      </h3>

      {/* Options */}
      <div className="mt-6 grid gap-3">
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedAnswer === optionIndex;
          const isCorrect = optionIndex === question.correctAnswer;

          let optionStyle =
            "border-slate-200 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50";

          if (selectedAnswer !== null) {
            if (isCorrect) {
              optionStyle = "border-green-500 bg-green-50 text-green-700";
            } else if (isSelected) {
              optionStyle = "border-red-500 bg-red-50 text-red-700";
            } else {
              optionStyle = "border-slate-200 bg-slate-50 opacity-60";
            }
          }

          return (
            <button
              key={optionIndex}
              onClick={() => handleAnswer(optionIndex)}
              className={`rounded-xl border p-4 text-left transition ${optionStyle}`}
            >
              <span className="mr-3 font-bold">
                {String.fromCharCode(65 + optionIndex)}.
              </span>

              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {selectedAnswer !== null && (
        <p
          className={`mt-5 font-semibold ${
            selectedAnswer === question.correctAnswer
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {selectedAnswer === question.correctAnswer
            ? "✓ Correct!"
            : "✗ Incorrect!"}
        </p>
      )}

      {/* Next button */}
      {selectedAnswer !== null && (
        <button
          onClick={handleNext}
          className="mt-5 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          {currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next Question →"}
        </button>
      )}
    </div>
  );
}

export default Quiz;