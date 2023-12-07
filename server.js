import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import "express-async-errors";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//routes
import authRouter from "./routes/Auth.router.js";
import errorHandler from "./middleWare/ErrorHandler.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/users", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

app.use(errorHandler);

start();
