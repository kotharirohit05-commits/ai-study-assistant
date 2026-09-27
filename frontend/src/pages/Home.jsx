import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudy } from "../context/StudyContextProvider";


function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [depth, setDepth] = useState("standard");

  const loadingMessages = [
  "✨ Understanding your topic...",
  "📚 Creating flashcards...",
  "🧠 Preparing your quiz...",
];

const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

useEffect(() => {
  if (!loading) {
    setLoadingMessage(loadingMessages[0]);
    return;
  }

  let index = 0;

  const interval = setInterval(() => {
    index = (index + 1) % loadingMessages.length;
    setLoadingMessage(loadingMessages[index]);
  }, 1800);

  return () => clearInterval(interval);
}, [loading]);

  const navigate = useNavigate();
  const { setStudyMaterial } = useStudy();

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError("Please enter a topic or paste your notes.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: input,
          depth: depth
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to generate study material."
        );
      }

      console.log("Study material received:", result.data);

      setStudyMaterial(result.data);
      navigate("/study");
    } catch (error) {
      console.error(error);
      setError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">

        {/* Badge */}
        <div className="mb-4 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
          ✨ AI-Powered Learning
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          AI Study Assistant
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-center text-base text-slate-600 sm:text-lg">
          Turn any topic or your own notes into interactive
          flashcards and quizzes in seconds.
        </p>

        {/* Main Card */}
        <div className="mt-10 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">

          <h2 className="mb-3 text-lg font-bold text-slate-800 sm:text-xl">
            What do you want to study?
          </h2>

          <textarea
          
  value={input}
  disabled={loading}
  onChange={(event) => {
    setInput(event.target.value);
    setError("");
  }}
  placeholder="Enter a topic or paste your notes..."
  rows={8}
  className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
/>



<div className="mt-4">
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Learning Depth
  </label>

  <div className="flex flex-wrap gap-2">
    <button
      type="button"
      disabled={loading}
      onClick={() => setDepth("quick")}
      className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
        depth === "quick"
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-300"
      }`}
    >
      ⚡ Quick
    </button>

    <button
      type="button"
      disabled={loading}
      onClick={() => setDepth("standard")}
      className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
        depth === "standard"
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-300"
      }`}
    >
      📚 Standard
    </button>

    <button
      type="button"
      disabled={loading}
      onClick={() => setDepth("deep")}
      className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
        depth === "deep"
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-300"
      }`}
    >
      🧠 Deep
    </button>
  </div>
</div>
          {error && (
  <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
    <div className="text-lg">
      ⚠️
    </div>

    <div>
      <p className="font-semibold text-red-700">
        Something went wrong
      </p>

      <p className="mt-1 text-sm text-red-600">
        {error}
      </p>

      <button
        onClick={() => setError("")}
        className="mt-2 text-sm font-semibold text-red-700 underline underline-offset-2 hover:text-red-800"
      >
        Dismiss
      </button>
    </div>
  </div>
)}

          {/* Generate Button */}
          <button
  onClick={handleGenerate}
  disabled={loading}
  className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg"
>
{loading ? (
  <>
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
    {loadingMessage}
  </>
) : (
  "Generate Study Material →"
)}
</button>
        </div>

        {/* Features */}
        <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-3 text-3xl">📚</div>
            <h3 className="text-lg font-bold text-slate-800">
              Flashcards
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Learn key concepts quickly
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-3 text-3xl">🧠</div>
            <h3 className="text-lg font-bold text-slate-800">
              AI Quizzes
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Test your understanding
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-3 text-3xl">⚡</div>
            <h3 className="text-lg font-bold text-slate-800">
              Instant
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Generate material in seconds
            </p>
          </div>

        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Study smarter • Learn faster • Powered by AI
        </p>

      </div>
    </main>
  );
}

export default Home;