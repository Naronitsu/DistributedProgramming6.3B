const express = require("express");
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("RPC PC Package service is running on http:localhost:3000");
});

const harddiskPrices = {
  "256GB": 80,
  "512GB": 120,
  "1TB": 200,
};

const ramPrices = {
  "8GB": 40,
  "16GB": 80,
  "32GB": 150,
};

const monitorPrices = {
  "22inch": 120,
  "27inch": 200,
  "32inch": 350,
};

app.post("/calculatePCPackage", (req, res) => {
  const { harddisk, ram, monitor } = req.body;
  const total =
    harddiskPrices[harddisk] + ramPrices[ram] + monitorPrices[monitor];
  res.json({ totalCost: total });
});
