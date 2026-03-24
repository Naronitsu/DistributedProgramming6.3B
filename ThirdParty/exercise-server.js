const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;
const UNIVERSITY_API = "http://universities.hipolabs.com/search?country=Malta";

function toIndexedObject(universities) {
  return universities.reduce((acc, uni, index) => {
    const id = index + 1;
    acc[id] = {
      Name: uni.name || "N/A",
      Country: uni.country || "Malta",
      Website: Array.isArray(uni.web_pages) && uni.web_pages.length > 0 ? uni.web_pages[0] : "N/A"
    };
    return acc;
  }, {});
}

app.get("/", (req, res) => {
  res.json({
    message: "Exercise server is running",
    endpoints: ["/malta", "/mcast"]
  });
});

app.get("/malta", async (req, res) => {
  try {
    const response = await axios.get(UNIVERSITY_API);
    const result = toIndexedObject(response.data);
    res.json(result);
  } catch (error) {
    res.status(502).json({
      error: "Failed to fetch Malta universities"
    });
  }
});

app.get("/mcast", async (req, res) => {
  try {
    const response = await axios.get(UNIVERSITY_API);
    const exactName = "Malta College of Arts, Science and Technology";
    const filtered = response.data.filter(
      (uni) => typeof uni.name === "string" && uni.name === exactName
    );
    const result = toIndexedObject(filtered);
    res.json(result);
  } catch (error) {
    res.status(502).json({
      error: "Failed to fetch MCAST university data"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Exercise server running on http://localhost:${PORT}`);
});
