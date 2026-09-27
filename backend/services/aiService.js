const { GoogleGenAI } = require("@google/genai");
const { studyMaterialSchema } = require("../schemas/studySchema");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


async function generateOnce(input) {
  const prompt = `
You are an educational assistant.

Create study material based on the user's input.

USER INPUT:
${input}

Return ONLY valid JSON.

The JSON must follow exactly this structure:

{
  "title": "string",
  "flashcards": [
    {
      "question": "string",
      "answer": "string"
    }
  ],
  "quiz": [
    {
      "question": "string",
      "options": [
        "string",
        "string",
        "string",
        "string"
      ],
      "correctAnswer": 0
    }
  ]
}

Rules:
- Generate 5 flashcards.
- Generate 5 quiz questions.
- Each quiz question must have exactly 4 options.
- correctAnswer must be a number from 0 to 3.
- Do not include markdown.
- Do not include explanations outside the JSON.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt
  });

  const rawText = response.text;

  console.log("Raw Gemini response:");
  console.log(rawText);

  let parsedData;

  try {
    parsedData = JSON.parse(rawText);
  } catch (error) {
    throw new Error("Gemini returned invalid JSON.");
  }

  const validationResult = studyMaterialSchema.safeParse(parsedData);

  if (!validationResult.success) {
    console.error("Zod validation failed:");
    console.error(validationResult.error.issues);

    throw new Error("Gemini returned data with an invalid structure.");
  }

  return validationResult.data;
}


async function generateStudyMaterial(input) {
  const maxAttempts = 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`AI generation attempt ${attempt}/${maxAttempts}`);

      const result = await generateOnce(input);

      console.log(`AI generation succeeded on attempt ${attempt}`);

      return result;

    } catch (error) {
      console.error(
        `AI generation attempt ${attempt} failed:`,
        error.message
      );

      if (attempt === maxAttempts) {
        throw error;
      }

      console.log("Retrying AI generation...");
    }
  }
}

module.exports = {
  generateStudyMaterial
};