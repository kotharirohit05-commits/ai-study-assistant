const express = require("express");
const { generateStudyMaterial } = require("../services/aiService");

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { input } = req.body;

  if (!input || !input.trim()) {
    return res.status(400).json({
      success: false,
      error: "Input is required"
    });
  }

  try {
    const studyMaterial = await generateStudyMaterial(input);

    return res.json({
      success: true,
      data: studyMaterial
    });
  } catch (error) {
    console.error("Study material generation failed:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to generate valid study material. Please try again."
    });
  }
});

module.exports = router;