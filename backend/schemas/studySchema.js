const { z } = require("zod");

// -------------------------
// Mind Map
// -------------------------

const mindMapNodeSchema = z.object({
  title: z.string().min(1),
  children: z
    .array(z.lazy(() => mindMapNodeSchema))
    .max(6),
});

const mindMapSchema = z.object({
  topic: z.string().min(1),
  children: z
    .array(mindMapNodeSchema)
    .min(1)
    .max(6),
});

// -------------------------
// Flashcards
// -------------------------

const flashcardSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

// -------------------------
// Quiz
// -------------------------

const quizQuestionSchema = z.object({
  question: z.string().min(1),

  options: z
    .array(z.string().min(1))
    .length(4),

  correctAnswer: z
    .number()
    .int()
    .min(0)
    .max(3),
});

// -------------------------
// Complete Study Material
// -------------------------

const studyMaterialSchema = z
  .object({
    title: z.string().min(1),

    flashcards: z
      .array(flashcardSchema)
      .length(5),

    quiz: z
      .array(quizQuestionSchema)
      .length(5),

    mindMap: mindMapSchema,
  })
  .strict();

// -------------------------
// Export
// -------------------------

module.exports = {
  studyMaterialSchema,
};