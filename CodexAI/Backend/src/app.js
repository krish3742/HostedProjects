const cors = require("cors");
const express = require("express");
const aiRoutes = require("./routes/ai.routes");

const app = express();
app.use(cors({ origin: `${process.env.CORS_ORIGIN_URL}`, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey, Good morning!");
});

app.use("/ai", aiRoutes);

module.exports = app;
