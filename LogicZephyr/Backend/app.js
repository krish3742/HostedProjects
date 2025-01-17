const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const createHttpError = require("http-errors");

const taskRouter = require("./routes/task.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("You are in server");
});

app.use("/tasks", taskRouter);

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
