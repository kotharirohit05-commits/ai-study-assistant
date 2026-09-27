const express = require("express");
const cors = require("cors");
require("dotenv").config();

const studyRoutes = require("./routes/studyRoutes");
const { generateStudyMaterial } = require("./services/aiService");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", studyRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Study Assistant backend is running"
  });
});

// TEMPORARY GEMINI TEST
app.get("/api/test-ai", async (req, res) => {
  try {
    const result = await generateStudyMaterial(
      "Explain DBMS transactions and ACID properties"
    );

    console.log("Gemini response:");
    console.log(result);

    res.json({
      success: true,
      result
    });
  } catch (error) {
    console.error("Gemini test failed:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});