import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import "express-async-errors"
import cookieParser from "cookie-parser"

//routes
import authRouter from "./routes/Auth.router.js"
import ErrorHandler from "./middleWare/ErrorHandler.js";

const app = express();

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/users", authRouter)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

app.use(ErrorHandler)

start()
