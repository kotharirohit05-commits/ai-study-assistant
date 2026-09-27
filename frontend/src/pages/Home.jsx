import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudy } from "../context/StudyContextProvider";

function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
            onChange={(event) => {
              setInput(event.target.value);
              setError("");
            }}
            placeholder="Enter a topic or paste your notes..."
            rows={8}
            className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-base"
          />

          {/* Error */}
          {error && (
            <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
          >
            {loading ? "Generating..." : "Generate Study Material →"}
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