const axios = require("axios");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "ThirdParty API running",
    endpoints: ["/posts", "/postTitles"]
  });
});

app.get("/posts", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    res.json(response.data);
  } catch (error) {
    res.status(502).json({
      error: "Failed to fetch posts from third-party API"
    });
  }
});

app.get("/postTitles", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const titles = response.data.map((p) => p.title);

    res.json(titles);
  } catch (error) {
    res.status(502).json({
      error: "Failed to fetch post titles from third-party API"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});