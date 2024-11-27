import cors from "cors";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import createHttpError from "http-errors";

import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN_URL,
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res, next) => {
  res.send("Welcome");
});

app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.send(error.message);
});

const PORT = process.env.PORT || 3002;
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
