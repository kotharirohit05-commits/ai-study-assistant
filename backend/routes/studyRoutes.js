const express = require("express");
const { generateStudyMaterial } = require("../services/aiService");

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { input, depth } = req.body;

  if (!input || !input.trim()) {
    return res.status(400).json({
      success: false,
      error: "Input is required"
    });
  }

  const validDepths = ["quick", "standard", "deep"];

  if (!validDepths.includes(depth)) {
    return res.status(400).json({
      success: false,
      error: "Invalid learning depth"
    });
  }

  try {
    const studyMaterial = await generateStudyMaterial(input, depth);

    return res.json({
      success: true,
      data: studyMaterial
    });
  } catch (error) {
    console.error("Study material generation failed:", error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        error:
          "AI generation limit reached. Please try again after your Gemini quota resets."
      });
    }

    if (error.status === 503) {
      return res.status(503).json({
        success: false,
        error:
          "The AI service is temporarily busy. Please try again in a little while."
      });
    }

    return res.status(500).json({
      success: false,
      error: "Failed to generate study material. Please try again."
    });
  }
});

module.exports = router;