import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Timer

const [questionTimes, setQuestionTimes] = useState([]);
  

  // Timer
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  // Start timer for each question
  useEffect(() => {
    if (finished || selectedAnswer !== null) return;

    const startTime = Date.now();
    setQuestionStartTime(startTime);
    setElapsedTime(0);

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setElapsedTime(elapsed);
    }, 100);

    return () => clearInterval(interval);
  }, [currentQuestion, finished]);

  // Perfect score celebration
  useEffect(() => {
    if (finished && score === questions.length) {
      confetti({
        particleCount: 200,
        spread: 100,
        startVelocity: 45,
        origin: { x: 0.1, y: 0.7 },
      });

      confetti({
        particleCount: 200,
        spread: 100,
        startVelocity: 45,
        origin: { x: 0.9, y: 0.7 },
      });
    }
  }, [finished, score, questions.length]);

  const question = questions[currentQuestion];

  const handleAnswer = (optionIndex) => {
  if (selectedAnswer !== null) return;

  const timeTaken = (Date.now() - questionStartTime) / 1000;

  setQuestionTimes((previous) => [
    ...previous,
    {
      question: currentQuestion + 1,
      time: timeTaken,
      correct: optionIndex === question.correctAnswer,
    },
  ]);

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
  setQuestionStartTime(Date.now());
};

  // -------------------------
  // Quiz Finished
  // -------------------------

  if (finished) {
    const perfectScore = score === questions.length;

    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 sm:p-10">
        <div className="mb-5 text-5xl">
          {perfectScore ? "🏆" : "🎉"}
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {perfectScore ? "Perfect Score!" : "Quiz Complete!"}
        </h3>

        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          You scored{" "}
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            {score}/{questions.length}
          </span>
        </p>

        {perfectScore && (
          <p className="mt-2 font-medium text-green-600 dark:text-green-400">
            Amazing! You got every question correct! 🎉
          </p>
        )}

        {/* Question Analysis */}
<div className="mt-8 text-left">
  <h4 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
    📊 Question Analysis
  </h4>

  <div className="space-y-2">
    {questionTimes.map((result) => (
      <div
        key={result.question}
        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-700"
      >
        <span className="font-medium text-slate-700 dark:text-slate-200">
          Q{result.question}
        </span>

        <div className="flex items-center gap-4">
          <span
            className={
              result.correct
                ? "font-semibold text-green-600 dark:text-green-400"
                : "font-semibold text-red-600 dark:text-red-400"
            }
          >
            {result.correct ? "✓" : "✗"}
          </span>

          <span className="text-sm font-medium text-slate-500 dark:text-slate-300">
            {result.time.toFixed(1)}s
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

        <button
          onClick={() => {
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setScore(0);
            setFinished(false);
            setElapsedTime(0);
            setQuestionStartTime(Date.now());
          }}
          className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // -------------------------
  // Quiz
  // -------------------------

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 sm:p-8">

      {/* Progress Header */}
      <div className="mb-6 flex items-center justify-between">

        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
          Question {currentQuestion + 1} of {questions.length}
        </span>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            ⏱️ {elapsedTime.toFixed(1)}s
          </span>

          {/* Score */}
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Score: {score}
          </span>
        </div>

      </div>

      {/* Progress Bar */}
      <div className="mb-8 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-300"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <h3 className="text-xl font-bold leading-relaxed text-slate-900 dark:text-white sm:text-2xl">
        {question.question}
      </h3>

      {/* Options */}
      <div className="mt-6 grid gap-3">
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedAnswer === optionIndex;
          const isCorrect = optionIndex === question.correctAnswer;

          let optionStyle =
            "border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:border-indigo-500 dark:hover:bg-slate-600";

          if (selectedAnswer !== null) {
            if (isCorrect) {
              optionStyle =
                "border-green-500 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-950 dark:text-green-300";
            } else if (isSelected) {
              optionStyle =
                "border-red-500 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950 dark:text-red-300";
            } else {
              optionStyle =
                "border-slate-200 bg-slate-50 text-slate-400 opacity-60 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-400";
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
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {selectedAnswer === question.correctAnswer
            ? "✓ Correct!"
            : "✗ Incorrect!"}
        </p>
      )}

      {/* Next Button */}
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