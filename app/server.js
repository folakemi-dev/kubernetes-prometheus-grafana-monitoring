const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3001;

const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequestsTotal = new client.Counter({
  name: "nodeapp_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"]
});

register.registerMetric(httpRequestsTotal);

app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode
    });
  });
  next();
});

app.get("/", (req, res) => {
  res.send("Node.js app monitored by Prometheus");
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});