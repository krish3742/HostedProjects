const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const dotenv = require("dotenv");
dotenv.config();

const branchRouter = require("./routes/branch.js");
const userRouter = require("./routes/user.js");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("You are in server");
});

app.use("/api", branchRouter);
app.use("/auth", userRouter);

app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((error, req, res, next) => {
  error.status = error.status || 500;
  const resp = {
    status: "Error",
    message: error.message,
  };
  res.status(error.status).send(resp);
});

const PORT = process.env.PORT;
const connectionString = process.env.CONNECTION_STRING;

(async () => {
  try {
    await mongoose.connect(connectionString);
    app.listen(PORT, () => {
      console.log("Server Connected");
    });
  } catch (error) {
    console.log(error);
  }
})();
