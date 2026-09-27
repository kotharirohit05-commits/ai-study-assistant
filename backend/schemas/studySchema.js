const { z } = require("zod");

const flashcardSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1)
});

const quizQuestionSchema = z.object({
  question: z.string().min(1),

  options: z
    .array(z.string().min(1))
    .length(4),

  correctAnswer: z
    .number()
    .int()
    .min(0)
    .max(3)
});

const studyMaterialSchema = z.object({
  title: z.string().min(1),

  flashcards: z
    .array(flashcardSchema)
    .min(1),

  quiz: z
    .array(quizQuestionSchema)
    .min(1)
});

module.exports = {
  studyMaterialSchema
};