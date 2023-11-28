import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

//routes
import authRouter from "./routes/Auth.router.js"

const app = express();

// app.use(express.json())

app.use("/user", authRouter)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start()
