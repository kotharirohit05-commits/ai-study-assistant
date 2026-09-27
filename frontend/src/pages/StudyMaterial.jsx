import { useStudy } from "../context/StudyContextProvider";
import Flashcard from "../components/Flashcard";
import Quiz from "../components/Quiz";
import { useNavigate } from "react-router-dom";

function StudyMaterial() {
  const navigate = useNavigate();
  const { studyMaterial, setStudyMaterial } = useStudy();

  if (!studyMaterial) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mb-4 text-5xl">📚</div>

          <h1 className="text-2xl font-bold text-slate-900">
            No Study Material
          </h1>

          <p className="mt-2 text-slate-500">
            Generate some study material first.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            ✨ Your Study Material
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {studyMaterial.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600 sm:text-lg">
            Review the flashcards and test your knowledge with the AI-generated
            quiz.
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

        {/* Flashcards */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <div className="mb-3 text-4xl">📚</div>

            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Flashcards
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Click the button to reveal the answer.
            </p>
          </div>

          <div className="space-y-8">
            {studyMaterial.flashcards.map((card, index) => (
              <div key={index}>
                <p className="mb-3 text-center text-sm font-semibold text-indigo-500">
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
        <div className="mb-16 h-px bg-slate-200" />

        {/* Quiz */}
        <section>
          <div className="mb-8 text-center">
            <div className="mb-3 text-4xl">🧠</div>

            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Test Your Knowledge
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Answer the questions and see how well you understand the topic.
            </p>
          </div>

          <Quiz questions={studyMaterial.quiz} />
        </section>

        {/* Footer */}
        <div className="mt-16 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-400">
            Study smarter • Learn faster • Powered by AI
          </p>
        </div>

      </div>
    </main>
  );
}

export default StudyMaterial;