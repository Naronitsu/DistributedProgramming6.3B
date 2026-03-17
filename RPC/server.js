const express = require("express");
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("RPC SERVICE IS RUNNING ON http://localhost:3000 :}");
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

function validateComponent(component, allowedValues) {
  return allowedValues.includes(component);
}

app.post("/calculatePCPackage", (req, res) => {
  const { harddisk, ram, monitor } = req.body;

  if (!validateComponent(harddisk, Object.keys(harddiskPrices))) {
    return res.status(400).json({ error: "Invalid harddisk value" });
  }
  if (!validateComponent(ram, Object.keys(ramPrices))) {
    return res.status(400).json({ error: "Invalid RAM value" });
  }
  if (!validateComponent(monitor, Object.keys(monitorPrices))) {
    return res.status(400).json({ error: "Invalid monitor value" });
  }

  const total =
    harddiskPrices[harddisk] + ramPrices[ram] + monitorPrices[monitor];

  res.json({ totalCost: total });
});

app.post("/createPCPackage", (req, res) => {
  const { harddisk, ram, monitor } = req.body;

  if (!validateComponent(harddisk, Object.keys(harddiskPrices))) {
    return res.status(400).json({ error: "Invalid harddisk value" });
  }
  if (!validateComponent(ram, Object.keys(ramPrices))) {
    return res.status(400).json({ error: "Invalid RAM value" });
  }
  if (!validateComponent(monitor, Object.keys(monitorPrices))) {
    return res.status(400).json({ error: "Invalid monitor value" });
  }

  res.json({
    message: "Package created",
    availableOptions: {
      harddisk: Object.keys(harddiskPrices),
      ram: Object.keys(ramPrices),
      monitor: Object.keys(monitorPrices),
    },
  });
});
