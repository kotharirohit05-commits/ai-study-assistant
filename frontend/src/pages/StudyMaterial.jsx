import { useStudy } from "../context/StudyContextProvider";
import Flashcard from "../components/Flashcard";
import Quiz from "../components/Quiz";

function StudyMaterial() {
  const { studyMaterial } = useStudy();

  if (!studyMaterial) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <p className="text-center text-slate-500">
          No study material available.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold text-indigo-600">
            ✨ AI Generated Study Material
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            {studyMaterial.title}
          </h1>

          <p className="mt-3 text-slate-500">
            Review the flashcards and test your knowledge with the quiz.
          </p>
        </div>

        {/* Flashcards */}
        <section className="mb-12">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              📚 Flashcards
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Click "Show Answer" to reveal the answer.
            </p>
          </div>

          <div className="space-y-6">
            {studyMaterial.flashcards.map((card, index) => (
              <div key={index}>
                <p className="mb-2 text-center text-sm font-medium text-slate-400">
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

        {/* Quiz */}
        <section>
  <div className="mb-6 text-center">
    <h2 className="text-2xl font-bold text-slate-900">
      🧠 Quiz
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Test your understanding.
    </p>
  </div>

  <Quiz questions={studyMaterial.quiz} />
</section>

        <div className="py-10 text-center text-sm text-slate-400">
          Study smarter • Learn faster • Powered by AI
        </div>

      </div>
    </div>
  );
}

export default StudyMaterial;