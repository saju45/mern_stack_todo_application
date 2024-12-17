import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routes/todoRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // enable cookies in requests
  })
);

app.use("/todo", todoRouter);
app.use("/user", userRouter);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(() => {
    console.log("mongo connection fial!");
  });

app.get("/", (req, res) => {
  res.send("Hello programmers");
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT} `);
});
