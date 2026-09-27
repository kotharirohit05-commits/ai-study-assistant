import { useNavigate } from "react-router-dom";
import { useStudy } from "../context/StudyContextProvider";
import Flashcard from "../components/Flashcard";
import Quiz from "../components/Quiz";
import MindMap from "../components/MindMap";
import StudyChecklist from "../components/StudyChecklist";

function StudyMaterial() {
  const navigate = useNavigate();

  const {
    studyMaterial,
    setStudyMaterial,
    darkMode,
    setDarkMode,
  } = useStudy();

  if (!studyMaterial) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg shadow-md transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <div className="text-center">
          <div className="mb-4 text-5xl">📚</div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            No Study Material
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Generate some study material first.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4 py-10 text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white sm:px-6 lg:px-8">

  {/* Dark Mode Toggle */}
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg shadow-md transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800"
    aria-label="Toggle dark mode"
  >
    {darkMode ? "☀️" : "🌙"}
  </button>

  <div className="mx-auto w-full max-w-5xl">

        {/* Header */}
        <div className="mb-12 text-center">

          <div className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
            ✨ Your Study Material
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            {studyMaterial.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300 sm:text-lg">
            Explore the key concepts with a mind map, review flashcards,
            and test your knowledge with an AI-generated quiz.
          </p>

          <button
            onClick={() => {
              setStudyMaterial(null);
              navigate("/");
            }}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg"
          >
            ← Generate New Material
          </button>
        </div>

        {/* Mind Map + Checklist */}
        <section className="mb-16">
          <MindMap mindMap={studyMaterial.mindMap} />

          <div className="mt-8">
            <StudyChecklist />
          </div>
        </section>

        {/* Divider */}
        <div className="mb-16 h-px bg-slate-200 dark:bg-slate-700" />

        {/* Flashcards */}
        <section className="mb-16">

          <div className="mb-8 text-center">
            <div className="mb-3 text-4xl">📚</div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Flashcards
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Click the button to reveal the answer.
            </p>
          </div>

          <div className="space-y-8">
            {studyMaterial.flashcards.map((card, index) => (
              <div key={index}>

                <p className="mb-3 text-center text-sm font-semibold text-indigo-500 dark:text-indigo-400">
                  Card {index + 1} of {studyMaterial.flashcards.length}
                </p>

                <Flashcard
                  question={card.question}
                  answer={card.answer}
                />

              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mb-16 h-px bg-slate-200 dark:bg-slate-700" />

        {/* Quiz */}
        <section>

          <div className="mb-8 text-center">
            <div className="mb-3 text-4xl">🧠</div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Test Your Knowledge
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Answer the questions and see how well you understand the topic.
            </p>
          </div>

          <Quiz questions={studyMaterial.quiz} />

        </section>

        {/* Footer */}
        <div className="mt-16 border-t border-slate-200 pt-8 text-center dark:border-slate-700">
          <p className="text-sm text-slate-400">
            Study smarter • Learn faster • Powered by AI
          </p>
        </div>

      </div>
    </main>
  );
}

export default StudyMaterial;