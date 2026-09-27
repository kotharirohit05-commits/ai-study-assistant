const { GoogleGenAI } = require("@google/genai");
const { studyMaterialSchema } = require("../schemas/studySchema");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateOnce(input, depth) {
  const prompt = `
You are an educational assistant.

Create study material based on the user's input.

LEARNING DEPTH:
${depth}

Adapt the study material according to the requested depth:

- quick: Focus on essential concepts and concise explanations.
- standard: Explain important concepts with useful examples and moderate detail.
- deep: Provide detailed explanations, deeper concepts, examples, edge cases, and important nuances.

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
  ],

  "mindMap": {
    "topic": "string",
    "children": [
      {
        "title": "string",
        "children": [
          {
            "title": "string",
            "children": []
          }
        ]
      }
    ]
  }
}

Rules:

FLASHCARDS:
- Generate exactly 5 flashcards.
- Questions should test important concepts.
- Answers should match the requested learning depth.

QUIZ:
- Generate exactly 5 quiz questions.
- Each quiz question must have exactly 4 options.
- correctAnswer must be a number from 0 to 3.
- Only one option should be correct.

MIND MAP:
- Create a clear hierarchical representation of the topic.
- The "topic" should be the central concept.
- Create 3 to 6 major branches.
- Each major branch should contain relevant subtopics.
- Use additional levels when useful for the requested depth.
- Keep each node title short and clear.
- Do not write long explanations inside mind-map nodes.
- Do not create more than 6 children for any node.
- The mind map should represent the most important concepts and their relationships.

GENERAL:
- Do not include markdown.
- Do not include code fences.
- Do not include explanations outside the JSON.
- Return valid JSON only.
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

async function generateStudyMaterial(input, depth) {
  const maxAttempts = 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`AI generation attempt ${attempt}/${maxAttempts}`);

      const result = await generateOnce(input, depth);

      console.log(`AI generation succeeded on attempt ${attempt}`);

      return result;

    } catch (error) {
      console.error(
        `AI generation attempt ${attempt} failed:`,
        error.message
      );

      // Do not retry quota errors.
      if (attempt === maxAttempts || error.status === 429) {
        throw error;
      }

      console.log("Waiting before retry...");
      await sleep(2000);

      console.log("Retrying AI generation...");
    }
  }
}

module.exports = {
  generateStudyMaterial
};